import { Config } from "../../core/classes/config.ts";
import { TemplateFile } from "../template.ts";
import encoded from "../encoded.ts";

new TemplateFile({
    type: "buffer",
    out: ["dist/world/level.dat"],
    conditions: [() => Config.Options.type === "world"],
    contents: () => encoded["level.dat"],
});