import { Config } from "../../../core/classes/index.ts";
import { TemplateFile } from "../../template.ts";

const contents = async () => JSON.stringify([
    {
        pack_id: await Config.getUUID("behavior"),
        version : [1, 0, 0],
    }
], null, "\t");

new TemplateFile({
    type: "text",
    out: ["src/world/world_behavior_packs.json"],
    conditions: [
        () => Config.Options.type === "world"
    ],
    contents,
});