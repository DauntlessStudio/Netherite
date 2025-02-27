import * as path from "jsr:@std/path";
import { Config } from "../core/classes/index.ts";

interface Template {
    type: "text"|"buffer";
    contents: () => string|Promise<string>;
    out: string[];
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
        if (this.template.type === "text") {
            await this.writeText();
        } else {
            this.writeBuffer();
        }
    }

    private async writeText(): Promise<void> {
        const contents = await this.template.contents();

        this.template.out.forEach(file => {
            Deno.mkdirSync(path.join(Deno.cwd(), path.dirname(file)), {recursive: true});
            Deno.writeTextFileSync(path.join(Deno.cwd(), file), contents);
        });
    }

    private writeBuffer(): void {
        const contents = Deno.readFileSync(Config.getTemplateFile(this.template.contents() as string));

        this.template.out.forEach(file => {
            Deno.mkdirSync(path.join(Deno.cwd(), path.dirname(file)), {recursive: true});
            Deno.writeFileSync(path.join(Deno.cwd(), file), contents);
        });
    }
}