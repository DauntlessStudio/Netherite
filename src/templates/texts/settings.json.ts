import { TemplateFile } from "../template.ts";

const contents = () => JSON.stringify({
    "files.associations": {
        "*.json": "jsonc",
    },
    "git.autofetch": true,
    "deno.enable": true,
}, null, "\t")

new TemplateFile({
    type: "text",
    out: [".vscode/settings.json"],
    contents,
});