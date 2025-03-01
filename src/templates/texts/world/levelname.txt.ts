import { Config } from "../../../core/classes/index.ts";
import { TemplateFile } from "../../template.ts";

const contents = () => `${Config.Options.name}`;

new TemplateFile({
    type: "text",
    out: ["src/world/levelname.txt"],
    conditions: [
        () => Config.Options.type === "world"
    ],
    contents,
});