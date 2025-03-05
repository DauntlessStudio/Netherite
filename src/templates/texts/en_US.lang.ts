import { Config } from "../../core/classes/config.ts";
import { TemplateFile } from "../template.ts";

const contents = () =>
`## PACK MANIFEST ============================================================================================
pack.name=NAME
pack.description=vVERSION by AUTHOR`;

new TemplateFile({
    type: "text",
    out: ["src/behavior_pack/texts/en_US.lang", "src/resource_pack/texts/en_US.lang"],
    conditions: [() => Config.Options.type !== "skin-pack"],
    contents,
});

const skinContents = () =>
`skinpack.${Config.StudioName}=NAME`;

new TemplateFile({
    type: "text",
    out: ["src/skin_pack/texts/en_US.lang"],
    conditions: [() => Config.Options.type === "skin-pack" || Config.Options.include_skin_pack === true],
    contents: skinContents,
});