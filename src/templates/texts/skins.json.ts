import type { Skins } from "../../api/api.ts";
import { Config } from "../../core/classes/index.ts";
import { TemplateFile } from "../template.ts";

const contents = () => JSON.stringify({
    localization_name: Config.StudioName,
    serialize_name: Config.StudioName,
    skins: [],
} as Skins, null, "\t");

new TemplateFile({
    type: "text",
    out: ["src/skin_pack/skins.json"],
    conditions: [() => Config.Options.type === "skin-pack" || Config.Options.include_skin_pack === true],
    contents,
});