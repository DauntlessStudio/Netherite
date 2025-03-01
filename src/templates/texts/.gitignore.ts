import { TemplateFile } from "../template.ts";

new TemplateFile({
    type: "text",
    out: [".gitignore"],
    contents: () => `dist/`,
});