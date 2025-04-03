import { TemplateFile } from "../template.ts";
import { Config } from "../../core/classes/index.ts";

const contents = () =>
`import * as netherite from "@coldiron/netherite/api";

netherite.config({
    name: "${Config.Options.name}",
    author: "${Config.Options.author}",
    namespace: "${Config.Options.namespace}",
    type: "${Config.Options.type}",
    scripting: "${Config.Options.scripting}",
    version: "${Config.Options.version}",
    format_version: "${Config.Options.format_version}",
    uuid: "${Config.Options.uuid}",
    include_skin_pack: ${Config.Options.type !== "skin-pack" ? Config.Options.include_skin_pack : undefined},
});`;

new TemplateFile({
    type: "text",
    out: ["netherite.config.ts"],
    contents,
});
