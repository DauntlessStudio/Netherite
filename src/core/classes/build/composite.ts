import * as path from "@std/path";
import { deepMerge, JSONCParse, writeTextToDist } from "../../utils/index.ts";
import { Config } from "../index.ts";
import { attemptRepeater } from "../../utils/error.ts";
import type { ClientItemTexture, ClientTerrainTexture, ClientSounds, ClientSoundDefinitions, ClientBlocks, Skins } from "../../../api/api.ts";

export class CompositeJSON<T extends object> {
    // deno-lint-ignore no-explicit-any
    private static readonly registry: Set<CompositeJSON<any>> = new Set();

    public static build(): void {
        this.registry.forEach(v => v.build());
    }

    public static watchMap(): Map<string, (filepath: string, event: Deno.FsEvent["kind"]) => void> {
        const map = new Map<string, (filepath: string, event: Deno.FsEvent["kind"]) => void>();

        this.registry.forEach(entry => {
            map.set(entry.fileGlob, entry.watch.bind(entry));
        });

        return map;
    }

    public readonly fileGlob: string;
    private readonly outPath: string;
    private readonly fileMap: Map<string, T> = new Map();

    constructor(fileGlob: string, outPath: string) {
        this.fileGlob = fileGlob;
        this.outPath = outPath;

        CompositeJSON.registry.add(this);
    }

    public ingestDir(dirPath: string): void {
        try {
            Deno.statSync(dirPath);
        } catch (_error) {
            return;
        }

        for (const entry of Deno.readDirSync(dirPath)) {
            const filepath = path.join(dirPath, entry.name);
            this.ingestFile(filepath);
        }
    }

    protected ingestFile(filepath: string): void {
        if (path.globToRegExp(this.fileGlob).test(filepath)) {
            const fileContent: T = JSONCParse(Deno.readTextFileSync(filepath));
            this.fileMap.set(filepath, fileContent);
        }
    }

    public ingestData(data: T): void {
        let obj = this.fileMap.get("virtual");
        obj = obj !== undefined ? deepMerge(obj, data) : data;
        this.fileMap.set("virtual", obj);
    }

    public build(): void {
        if (this.fileMap.size > 0) {
            const obj = this.fileMap.values().reduce((acc, v) => deepMerge(acc, v));
            const out = this.outPath.replace("RP", Config.Paths.rp.root).replace("BP", Config.Paths.bp.root).replace("SKINS", Config.Paths.skins.root);
            writeTextToDist(out, JSON.stringify(obj, null, "\t"));
        }
    }

    public buildSource(): void {
        if (this.fileMap.size > 0) {
            const obj = this.fileMap.values().reduce((acc, v) => deepMerge(acc, v));
            const out = this.outPath.replace("RP", "./src/resource_pack").replace("BP", "./src/behavior_pack");
            writeTextToDist(out, JSON.stringify(obj, null, "\t"));
        }
    }

    public watch(filepath: string, event: Deno.FsEvent["kind"]): void {
        attemptRepeater(() => {
            switch (event) {
                case "create": {
                    this.ingestFile(filepath);
                    break;
                }
                case "modify": {
                    this.ingestFile(filepath);
                    break;
                }
                case "rename": {
                    this.ingestFile(filepath);
                    break;
                }
                case "remove": {
                    this.fileMap.delete(filepath);
                    break;
                }
                default:
                    return;
            }

            this.build();
        });
    }
}

export const composites = {
    terrain_texture: new CompositeJSON<ClientTerrainTexture>("**/textures/terrain_texture.json", "RP/textures/terrain_texture.json"),
    item_texture: new CompositeJSON<ClientItemTexture>("**/textures/item_texture.json", "RP/textures/item_texture.json"),
    sounds: new CompositeJSON<ClientSounds>("**/sounds.json", "RP/sounds.json"),
    sound_definitions: new CompositeJSON<ClientSoundDefinitions>("**/sounds/sound_definitions.json", "RP/sounds/sound_definitions.json"),
    blocks: new CompositeJSON<ClientBlocks>("**/blocks.json", "RP/blocks.json"),
    skins: new CompositeJSON<Skins>("**/skins.json", "SKINS/skins.json"),
}