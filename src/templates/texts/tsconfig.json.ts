import { Config } from "../../core/classes/index.ts";
import { TemplateFile } from "../template.ts";

const contents = () => JSON.stringify({
    include: [
        "src/behavior_pack/scripts/**/*.ts",
    ],
    exclude: [
        "node_modules",
    ]
}, null, "\t")

new TemplateFile({
    type: "text",
    out: ["tsconfig.json"],
    conditions: [() => Config.Options.scripting === "node"],
    contents,
});