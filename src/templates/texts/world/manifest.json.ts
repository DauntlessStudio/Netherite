import type { Manifest } from "../../../api/api.ts";
import { Config } from "../../../core/classes/index.ts";
import { TemplateFile } from "../../template.ts";

const contents = async () => JSON.stringify({
    format_version: 2,
    header: {
        name: "pack.name",
        description: "pack.description",
        uuid: await Config.getUUID("world"),
        version: [1, 0, 0]
    },
    modules: [
        {
            type: "world_template",
            version: [1, 0, 0],
            uuid: await Config.getUUID("world_template"),
        }
    ],
    metadata: {
        authors: [Config.Options.author]
    }
} as Manifest, null, "\t");

new TemplateFile({
    type: "text",
    out: ["src/world/manifest.json"],
    conditions: [
        () => Config.Options.type === "world"
    ],
    contents,
});