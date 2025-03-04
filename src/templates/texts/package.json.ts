import { Config } from "../../core/classes/index.ts";
import { TemplateFile } from "../template.ts";

const contents = () => JSON.stringify({
    name: Config.Options.namespace,
    version: Config.Options.version,
    description: "A Minecraft project built with Netherite",
    private: true,
    type: "module",
}, null, "\t")

new TemplateFile({
    type: "text",
    out: ["package.json"],
    conditions: [() => Config.Options.scripting === "node"],
    contents,
});