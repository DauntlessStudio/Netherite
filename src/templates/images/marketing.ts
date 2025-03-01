import { TemplateFile } from "../template.ts";

new TemplateFile({
    type: "buffer",
    out: ["public/marketing/PartnerArt.png"],
    contents: () => "images/marketing/PartnerArt.png",
});

new TemplateFile({
    type: "buffer",
    out: ["public/marketing/MarketingKeyArt.png"],
    contents: () => "images/marketing/MarketingKeyArt.png",
});

for (let index = 0; index <= 9; index++) {
    new TemplateFile({
        type: "buffer",
        out: [`public/marketing/MarketingScreenshot_${index}.png`],
        contents: () => `images/marketing/MarketingScreenshot_${index}.png`,
    });
}