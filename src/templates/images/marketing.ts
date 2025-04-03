import { TemplateFile } from "../template.ts";
import encoded from "../encoded.ts";

new TemplateFile({
    type: "buffer",
    out: ["public/marketing/PartnerArt.png"],
    contents: () => encoded["PartnerArt.png"],
});

new TemplateFile({
    type: "buffer",
    out: ["public/marketing/MarketingKeyArt.png"],
    contents: () => encoded["MarketingKeyArt.png"],
});

for (let index = 0; index <= 9; index++) {
    new TemplateFile({
        type: "buffer",
        out: [`public/marketing/MarketingScreenshot_${index}.png`],
        contents: () => encoded[`MarketingScreenshot_${index}.png` as keyof typeof encoded],
    });
}