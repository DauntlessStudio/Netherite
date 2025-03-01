import { TemplateFile } from "../template.ts";

new TemplateFile({
    type: "buffer",
    out: ["public/store/Thumbnail_0.jpg"],
    contents: () => "images/store/Thumbnail_0.jpg",
});

new TemplateFile({
    type: "buffer",
    out: ["public/store/packicon_0.jpg"],
    contents: () => "images/store/packicon_0.jpg",
});

new TemplateFile({
    type: "buffer",
    out: ["public/store/Panorama_0.jpg"],
    contents: () => "images/store/Panorama_0.jpg",
});

for (let index = 0; index <= 9; index++) {
    new TemplateFile({
        type: "buffer",
        out: [`public/store/screenshot_${index}.jpg`],
        contents: () => `images/store/screenshot_${index}.jpg`,
    });
}