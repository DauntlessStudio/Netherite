import * as path from "@std/path";

interface Template {
    type: "text"|"buffer";
    contents: () => string|Promise<string>;
    conditions?: (() => boolean)[];
    out: (string|(() => string))[];
}

export class TemplateFile {
    private static templates: TemplateFile[] = [];

    public static async write(): Promise<void> {
        await Promise.all(this.templates.map(template => template.write()));
    }

    constructor(private readonly template: Template) {
        TemplateFile.templates.push(this);
    }

    private async write(): Promise<void> {
        if (this.template.conditions && !this.template.conditions.every(condition => condition())) return;
        
        if (this.template.type === "text") {
            await this.writeText();
        } else {
            this.writeBuffer();
        }
    }

    private async writeText(): Promise<void> {
        const contents = await this.template.contents();

        this.template.out.forEach(file => {
            const out = typeof file === "function" ? file() : file;
            Deno.mkdirSync(path.join(Deno.cwd(), path.dirname(out)), {recursive: true});
            Deno.writeTextFileSync(path.join(Deno.cwd(), out), contents);
        });
    }

    private async writeBuffer(): Promise<void> {
        const contents = Uint8Array.from(atob(await this.template.contents()), c => c.charCodeAt(0));

        this.template.out.forEach(file => {
            const out = typeof file === "function" ? file() : file;
            Deno.mkdirSync(path.join(Deno.cwd(), path.dirname(out)), {recursive: true});
            Deno.writeFileSync(path.join(Deno.cwd(), out), contents);
        });
    }
}