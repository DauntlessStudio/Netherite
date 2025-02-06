import * as uuid from "jsr:@std/uuid";
import * as path from "jsr:@std/path";
import type { ProjectBuilderOptions } from "./project_initializer.ts";

export interface ConfigOptions extends ProjectBuilderOptions {
    uuid: string;
}

export class Config {
    private static options: ConfigOptions;
    
    public static get Options() : ConfigOptions {
        if (!this.options) {
            console.log("No config options set, is your netherite.config.ts file missing?");
            Deno.exit(1);
        }

        return Object.freeze(this.options);
    }
    
    public static setOptions(options: ConfigOptions): void {
        this.options = options;
    }

    public static ingestConfig(): void {
        try {
            import(path.join(Deno.cwd(), "netherite.config.ts"));
        } catch (_error) {
            console.error("No config file found in the root of your project, please create a netherite.config.ts file.");
        }
    }

    public static async getUUID(category: string): Promise<string> {
        return await uuid.v5.generate(this.Options.uuid, new TextEncoder().encode(category));
    }
}