import { Config } from "../../core/classes/index.ts";
import { TemplateFile } from "../template.ts";

const contents = () =>
`import * as mc from "npm:@minecraft/server";

function main() {
    console.log("Loaded [${Config.Options.name}]!");
}

mc.system.run(main);`;

new TemplateFile({
    type: "text",
    out: ["src/behavior_pack/scripts/main.ts"],
    contents,
});