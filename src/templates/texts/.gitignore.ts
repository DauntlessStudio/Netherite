import { Config } from "../../core/classes/index.ts";
import { TemplateFile } from "../template.ts";

const contents = () => {
    let value = `dist/`;
    if (Config.Options.scripting === "node") value += `\nnode_modules/`;

    return value;
};

new TemplateFile({
    type: "text",
    out: [".gitignore"],
    contents,
});