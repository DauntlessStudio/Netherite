import { Config } from "../../core/classes/index.ts";
import { TemplateFile } from "../template.ts";

const contents = () =>
`import * as mc from "@minecraft/server";

function main() {
    console.log("Loaded [${Config.Options.name}]!");
}

mc.system.run(main);`;

new TemplateFile({
    type: "text",
    out: ["src/behavior_pack/scripts/main.ts"],
    conditions: [() => Config.Options.type !== "skin-pack"],
    contents,
});