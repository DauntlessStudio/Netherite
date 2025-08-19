import * as path from "@std/path";
import { deepMerge, JSONCParse, writeTextToDist } from "../utils/index.ts";
import { Config } from "./index.ts";
import type { ClientSoundDefinitions, ClientSounds } from "../../api/api.ts";
import { attemptRepeater } from "../utils/error.ts";

export class Sound {
    private static soundDefinitions: ClientSoundDefinitions = {
        format_version: "1.0.0",
        sound_definitions: {}
    };

    private static sounds: ClientSounds = {};
    
    public static ingestSoundFiles(dirPath: string): void {
        try {
            Deno.statSync(dirPath);
        } catch (_error) {
            return;
        }

        for (const entry of Deno.readDirSync(dirPath)) {
            if (entry.name === "sound_definitions.json") {
                const fileContent: ClientSoundDefinitions = JSONCParse(Deno.readTextFileSync(path.join(dirPath, entry.name)));
                this.soundDefinitions = deepMerge(this.soundDefinitions, fileContent);
            } else if (entry.name === "sounds.json") {
                const fileContent: ClientSounds = JSONCParse(Deno.readTextFileSync(path.join(dirPath, entry.name)));
                this.sounds = deepMerge(this.sounds, fileContent);
            }
        }
    }
    
    public static build(): void {
        if (Object.keys(this.soundDefinitions.sound_definitions).length)
            writeTextToDist(path.join(Config.Paths.rp.root, "sounds.json"), JSON.stringify(this.soundDefinitions, null, "\t"));

        if (Object.keys(this.sounds).length)
            writeTextToDist(path.join(Config.Paths.rp.root, "sounds", "sound_definitions.json"), JSON.stringify(this.soundDefinitions, null, "\t"));
    }

    public static watch(filePath: string): void {
        attemptRepeater(() => {
            if (filePath.endsWith("sound_definitions.json")) {
                const fileContent: ClientSoundDefinitions = JSONCParse(Deno.readTextFileSync(filePath));
                this.soundDefinitions = deepMerge(this.soundDefinitions, fileContent);
            } else if (filePath.endsWith("sounds.json")) {
                const fileContent: ClientSounds = JSONCParse(Deno.readTextFileSync(filePath));
                this.sounds = deepMerge(this.sounds, fileContent);
            }

            this.build();
        });
    }
}