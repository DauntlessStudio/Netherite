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