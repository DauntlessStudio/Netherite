import {Config} from "../core/classes/config.ts";

export const templateFileMap: Record<string, {out: string[], useBuffer?: boolean, transforms: ((contents: string) => Promise<string>|string)[]}> = {
    "deno.json": {
        out: ["deno.json"],
        transforms: [],
    },
    "README.md": {
        out: ["README.md"],
        transforms: [],
    },
    ".gitignore": {
        out: [".gitignore"],
        transforms: [],
    },
    "netherite.config.txt": {
        out: ["netherite.config.ts"],
        transforms: [],
    },
    "main.ts": {
        out: ["src/behavior_pack/scripts/main.ts"],
        transforms: [],
    },
    "image_x256.png": {
        useBuffer: true,
        out: ["src/behavior_pack/pack_icon.png", "src/resource_pack/pack_icon.png"],
        transforms: [],
    },
    "en_US.lang": {
        out: ["src/behavior_pack/texts/en_US.lang", "src/resource_pack/texts/en_US.lang"],
        transforms: [],
    },
    "launch.json": {
        out: [".vscode/launch.json"],
        transforms: [
            async (contents) => contents.replace(/SCRIPTSUUID/g, await Config.getUUID("scripts")),
            (contents) => contents.replace(/SCRIPTSPATH/g, Config.Paths.bp.scripts.replace("./", "")),
        ],
    },
};