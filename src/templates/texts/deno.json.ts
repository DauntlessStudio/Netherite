import { TemplateFile } from "../template.ts";
import { Config } from "../../core/classes/index.ts";

const contents = () => {
    const deno = {
        exclude: ["dist"],
    };

    if (Config.Options.scripting === "node") {
        deno.exclude.push("node_modules", "src/behavior_pack/scripts");
    }

    return JSON.stringify(deno, null, "\t")
};

new TemplateFile({
    type: "text",
    out: ["deno.json"],
    contents,
});