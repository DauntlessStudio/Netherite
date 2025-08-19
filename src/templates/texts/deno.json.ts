import { TemplateFile } from "../template.ts";

const contents = () => {
    const deno = {
        exclude: ["dist"],
    };

    return JSON.stringify(deno, null, "\t")
};

new TemplateFile({
    type: "text",
    out: ["deno.json"],
    contents,
});