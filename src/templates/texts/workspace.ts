import { Config } from "../../core/classes/index.ts";
import { TemplateFile } from "../template.ts";

const contents = () => JSON.stringify({
    "folders": [
        {
            "name": "Root",
            "path": "."
        },
        {
            "name": "Source",
            "path": "src"
        },
        {
            "name": "Scripts",
            "path": "src\\behavior_pack\\scripts"
        }
    ],
    "tasks": {
        "version": "2.0.0",
        "tasks": [
            {
                "label": "Build",
                "command": "netherite build -w",
                "type": "shell",
                "runOptions": {
                    "runOn": "folderOpen"
                },
                "presentation": {
                    "reveal": "silent",
                    "close": true
                },
                "isBackground": true,
                "icon": {
                    "id": "eye-watch"
                }
            }
        ]
    }
}, null, "\t")

new TemplateFile({
    type: "text",
    out: [() => Config.Options.name.toLocaleLowerCase().replace(/\s/g, "_") + ".code-workspace"],
    conditions: [() => Config.Options.type !== "skin-pack"],
    contents,
});