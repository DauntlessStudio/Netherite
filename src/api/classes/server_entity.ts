import { Config } from "../../core/config.ts";
import { ModuleWriter, type ModuleWriteable } from "../../core/module_writer.ts";
import type { ServerEntity } from "../types/index.d.ts";

export class MinecraftServerEntity implements ModuleWriteable {
    private readonly entity: ServerEntity;

    public get Identifier() : string {
        return this.entity["minecraft:entity"].description.identifier;
    }
    
    public get Shortname() : string {
        return this.Identifier.split(":")[1];
    }
    
    constructor(entity: ServerEntity) {
        if (!entity["minecraft:entity"].description.identifier.includes(":")) {
            entity["minecraft:entity"].description.identifier = `${Config.Options.projectNamespace}:${entity["minecraft:entity"].description.identifier}`;
        }
        
        this.entity = entity;
        ModuleWriter.register(this);
    }

    generate(): { outputPath: string; content: Uint8Array; } {
        return {
            outputPath: `${Config.Paths.bp.root}entities/${this.Shortname}.json`,
            content: new TextEncoder().encode(JSON.stringify(this.entity, null, "\t"))
        };
    }
}