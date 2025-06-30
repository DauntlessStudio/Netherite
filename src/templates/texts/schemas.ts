import { TemplateFile } from "../template.ts";

const contents = () => JSON.stringify({
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "NetheritePackage",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "The name of the Netherite package."
        },
        "uuid": {
            "type": "string",
            "description": "The UUID of the Netherite package."
        },
        "version": {
            "type": "string",
            "description": "The version of the Netherite package."
        },
        "description": {
            "type": "string",
            "description": "A description of the Netherite package."
        },
        "import": {
            "type": "object",
            "description": "An optional deno import map for the package's scripts.",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "The name of the import map."
                },
                "path": {
                    "type": "string",
                    "description": "The path to the import map. Relative to the package root."
                }
            },
            "required": ["name", "path"],
            "additionalProperties": false
        }
    },
    "required": ["name", "uuid", "version", "description"],
    "additionalProperties": false
}, null, "\t")

new TemplateFile({
    type: "text",
    out: [".vscode/netherite_package.schema.json"],
    contents,
});