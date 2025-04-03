import { TemplateFile } from "../template.ts";
import encoded from "../encoded.ts";

new TemplateFile({
    type: "buffer",
    out: ["public/store/Thumbnail_0.jpg"],
    contents: () => encoded["Thumbnail_0.jpg"],
});

new TemplateFile({
    type: "buffer",
    out: ["public/store/packicon_0.jpg"],
    contents: () => encoded["packicon_0.jpg"],
});

new TemplateFile({
    type: "buffer",
    out: ["public/store/Panorama_0.jpg"],
    contents: () => encoded["Panorama_0.jpg"],
});

for (let index = 0; index <= 9; index++) {
    new TemplateFile({
        type: "buffer",
        out: [`public/store/screenshot_${index}.jpg`],
        contents: () => encoded[`screenshot_${index}.jpg` as keyof typeof encoded],
    });
}