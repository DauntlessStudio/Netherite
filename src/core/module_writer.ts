export interface ModuleWriteable {
    generate(): {outputPath: string, content: Uint8Array};
}

export class ModuleWriter {
    private static queue: ModuleWriteable[] = [];

    public static register(module: ModuleWriteable): void {
        this.queue.push(module);
    }

    public static process(): void {
        for (const module of this.queue) {
            const { outputPath, content } = module.generate();
            Deno.mkdirSync(outputPath.split("/").slice(0, -1).join("/"), {recursive: true});
            Deno.writeFileSync(outputPath, content, {create: true});
            console.log(`  ${outputPath}`);
        }
    }

    public static flush(): void {
        this.queue = [];
    }
}