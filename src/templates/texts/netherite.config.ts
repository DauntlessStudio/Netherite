import "jsr:@std/dotenv/load";
import { TemplateFile } from "../template.ts";
import { Config } from "../../core/classes/index.ts";

const importPackage: string = Deno.env.get("LOCALAPI") !== undefined ? Deno.env.get("LOCALAPI")! : "@coldiron/netherite";

const contents = () =>
`import * as netherite from "${importPackage}";

netherite.config({
    name: "${Config.Options.name}",
    author: "${Config.Options.author}",
    namespace: "${Config.Options.namespace}",
    type: "${Config.Options.type}",
    scripting: "${Config.Options.scripting}",
    version: "${Config.Options.version}",
    formatVersion: "${Config.Options.formatVersion}",
    uuid: "${Config.Options.uuid}",
    include_skin_pack: ${Config.Options.type !== "skin-pack" ? Config.Options.include_skin_pack : undefined},
});`;

new TemplateFile({
    type: "text",
    out: ["netherite.config.ts"],
    contents,
});
