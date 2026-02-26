import { type WorkerResponse, type ModuleWriteable, type ModuleResponse, WorkerWriter, deepMerge } from "../../core/core.ts";

export abstract class MinecraftWriteable<Loose extends object, Strict extends Loose> implements ModuleWriteable {
    protected minecraftObj: Loose;

    public abstract get Identifier() : string;
    
    public get Shortname() : string {
        return this.Identifier.split(":").at(-1) ?? this.Identifier;
    }
    
    constructor(obj: Loose) {
        this.minecraftObj = obj;
        WorkerWriter.register(this);
    }

    public modify(target: Loose): this {
        this.minecraftObj = deepMerge(this.minecraftObj, target);
        return this;
    }

    public encode(): number[] {
        let content = JSON.stringify(this.validate(), null, "\t");
        content = content.replace(/IDENTIFIER/g, this.Identifier);
        content = content.replace(/SHORTNAME/g, this.Shortname);
        content = content.replace(/"__FLOAT__(-?\d+\.0)"/g, "$1");

        return Array.from(new TextEncoder().encode(content));
    }

    /**
     * Generates a Strict valid writeable from the loose {@link minecraftObj}.
     */
    protected abstract validate(): Strict

    /**
     * Generates a WorkerResponse, can also add Language or other such entries.
     */
    public abstract generate(): WorkerResponse<ModuleResponse>;
}