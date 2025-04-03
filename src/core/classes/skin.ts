import * as path from "@std/path";
import { deepMerge, writeTextToDist } from "../utils/index.ts";
import { Config } from "./index.ts";
import type { Skins } from "../../api/api.ts";

export class Skin {
    private static skins: Partial<Skins> = {};
    
    public static ingestSkinFiles(dirPath: string): void {
        try {
            Deno.statSync(dirPath);
        } catch (_error) {
            return;
        }

        for (const entry of Deno.readDirSync(dirPath)) {
            if (entry.name === "skins.json") {
                const fileContent: Skins = JSON.parse(Deno.readTextFileSync(path.join(dirPath, entry.name)));
                this.skins = deepMerge(this.skins, fileContent);
            }
        }
    }
    
    public static build(): void {
        writeTextToDist(path.join(Config.Paths.skins.root, "skins.json"), JSON.stringify(this.skins, null, "\t"));
    }

    public static watch(filePath: string): void {
        if (filePath.endsWith("skins.json")) {
            const fileContent: Skins = JSON.parse(Deno.readTextFileSync(filePath));
            this.skins = deepMerge(this.skins, fileContent);
        }

        this.build();
    }
}