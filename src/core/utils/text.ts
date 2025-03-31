import type { ProjectOptions } from "../classes/index.ts";

export function formatText(text: string, replacers: RegExp[]): string {
    text = text.toLowerCase().trim();

    for (const replacer of replacers) {
        text = text.replace(replacer, " ");
    }

    const vals = text.split(" ").map(capitalize);

    return vals.join(" ");
}

export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function keywordReplacer(content: string, options: ProjectOptions): string {
    const modifiedContent = content
    .replace(/FORMATVERSION/g, options.format_version)
    .replace(/NAMESPACE/g, options.namespace)
    .replace(/VERSION/g, options.version)
    .replace(/AUTHOR/g, options.author)
    .replace(/NAME/g, options.name)

    return modifiedContent;
}