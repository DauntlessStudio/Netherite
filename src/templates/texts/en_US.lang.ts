import { TemplateFile } from "../template.ts";

const contents = () =>
`## PACK MANIFEST ============================================================================================
pack.name=NAME
pack.description=vVERSION by AUTHOR`;

new TemplateFile({
    type: "text",
    out: ["src/behavior_pack/texts/en_US.lang", "src/resource_pack/texts/en_US.lang"],
    contents,
});
