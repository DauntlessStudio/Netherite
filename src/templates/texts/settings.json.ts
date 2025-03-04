import { Config } from "../../core/classes/index.ts";
import { TemplateFile } from "../template.ts";

const contents = () => JSON.stringify({
    "files.associations": {
        "*.json": "jsonc",
    },
    "git.autofetch": true,
    "deno.enable": Config.Options.scripting === "deno" ? true : undefined,
}, null, "\t")

new TemplateFile({
    type: "text",
    out: [".vscode/settings.json"],
    contents,
});