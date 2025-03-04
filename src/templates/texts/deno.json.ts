import { Config } from "../../core/classes/index.ts";
import { TemplateFile } from "../template.ts";

new TemplateFile({
    type: "text",
    out: ["deno.json"],
    conditions: [() => Config.Options.scripting === "deno"],
    contents: () => `{"exclude": ["dist"]}`,
});