import * as path from "jsr:@std/path";
import { deepMerge, writeTextToDist } from "../utils/index.ts";
import { Config } from "./index.ts";
import type { ClientSoundDefinitions, ClientSounds } from "../../api/api.ts";

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
                const fileContent: ClientSoundDefinitions = JSON.parse(Deno.readTextFileSync(path.join(dirPath, entry.name)));
                this.soundDefinitions = deepMerge(this.soundDefinitions, fileContent);
            } else if (entry.name === "sounds.json") {
                const fileContent: ClientSounds = JSON.parse(Deno.readTextFileSync(path.join(dirPath, entry.name)));
                this.sounds = deepMerge(this.sounds, fileContent);
            }
        }
    }
    
    public static build(): void {
        writeTextToDist(path.join(Config.Paths.rp.root, "sounds.json"), JSON.stringify(this.soundDefinitions, null, "\t"));
        writeTextToDist(path.join(Config.Paths.rp.root, "sounds", "sound_definitions.json"), JSON.stringify(this.soundDefinitions, null, "\t"));
    }

    public static watch(filePath: string): void {
        if (filePath.endsWith("sound_definitions.json")) {
            const fileContent: ClientSoundDefinitions = JSON.parse(Deno.readTextFileSync(filePath));
            this.soundDefinitions = deepMerge(this.soundDefinitions, fileContent);
        } else if (filePath.endsWith("sounds.json")) {
            const fileContent: ClientSounds = JSON.parse(Deno.readTextFileSync(filePath));
            this.sounds = deepMerge(this.sounds, fileContent);
        }

        this.build();
    }
}