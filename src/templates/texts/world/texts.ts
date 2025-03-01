import { Config } from "../../../core/classes/index.ts";
import { TemplateFile } from "../../template.ts";

const contents = () => 
`pack.name=NAME
pack.description=vVERSION by AUTHOR
`;

new TemplateFile({
    type: "text",
    out: ["src/world/texts/en_US.lang"],
    conditions: [
        () => Config.Options.type === "world"
    ],
    contents,
});

new TemplateFile({
    type: "text",
    out: ["src/world/texts/languages.json"],
    conditions: [
        () => Config.Options.type === "world"
    ],
    contents: () => JSON.stringify(["en_US"], null, "\t"),
});