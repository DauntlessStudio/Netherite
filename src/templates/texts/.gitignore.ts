import { TemplateFile } from "../template.ts";

const contents = () => {
    return `dist/`;
};

new TemplateFile({
    type: "text",
    out: [".gitignore"],
    contents,
});