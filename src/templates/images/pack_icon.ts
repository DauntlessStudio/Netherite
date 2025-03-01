import { TemplateFile } from "../template.ts";

new TemplateFile({
    type: "buffer",
    out: ["src/behavior_pack/pack_icon.png", "src/resource_pack/pack_icon.png"],
    contents: () => "images/image_x256.png",
});