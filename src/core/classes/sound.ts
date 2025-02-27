import * as path from "jsr:@std/path";
import { deepMerge, writeTextToDist } from "../utils/index.ts";
import { Config } from "./index.ts";
import type { ClientSoundDefinitions } from "../../api/api.ts";

export class Sound {
    private static soundDefinitions: ClientSoundDefinitions = {
        format_version: "1.0.0",
        sound_definitions: {}
    };
    
    public static ingestSoundFiles(dirPath: string): void {
        try {
            Deno.statSync(dirPath);
        } catch (_error) {
            return;
        }

        for (const entry of Deno.readDirSync(dirPath)) {
            if (entry.name !== "sound_definitions.json") continue;

            const fileContent: ClientSoundDefinitions = JSON.parse(Deno.readTextFileSync(path.join(dirPath, entry.name)));
    
            this.soundDefinitions = deepMerge(this.soundDefinitions, fileContent);
        }
    }
    
    public static build(): void {
        writeTextToDist(path.join(path.join(Config.Paths.rp.root, "sounds"), "sound_definitions.json"), JSON.stringify(this.soundDefinitions, null, "\t"));
    }
}