import { TemplateFile } from "../template.ts";
import { Config } from "../../core/classes/index.ts";

const contents = () => JSON.stringify({
    exclude: ["dist"],
}, null, "\t");

new TemplateFile({
    type: "text",
    out: ["deno.json"],
    conditions: [() => Config.Options.scripting === "deno"],
    contents,
});