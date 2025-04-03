import { Config } from "../../core/classes/config.ts";
import { TemplateFile } from "../template.ts";
import encoded from "../encoded.ts";

new TemplateFile({
    type: "buffer",
    out: ["src/behavior_pack/pack_icon.png", "src/resource_pack/pack_icon.png"],
    conditions: [() => Config.Options.type !== "skin-pack"],
    contents: () => encoded["image_x256.png"],
});