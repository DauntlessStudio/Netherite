import { TemplateFile } from "../template.ts";

new TemplateFile({
    type: "text",
    out: ["deno.json"],
    contents: () => `{"exclude": ["dist"]}`,
});