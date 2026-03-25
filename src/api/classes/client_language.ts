import type { WriteableResponse, ModuleResponse } from "../../core/core.ts";
import type { ClientLanguage, LangType } from "../types/index.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftClientLanguage extends MinecraftWriteable<ClientLanguage, ClientLanguage> {
    /**
     * Adds a new entry to the lang file.
     * @param key The lang key to add.
     * @param value The localized value to add.
     */
    public addEntry(key: string, value: string): void {
        this.Language[key] = value;
    }

    public get Language() : ClientLanguage {
        return this.minecraftObj;
    }
    
    public get Identifier() : string {
        return JSON.stringify(this.name);
    }

    constructor(obj: ClientLanguage, protected readonly name?: LangType[]|"all") {
        super(obj);
        this.name ||= "all";
    }
    
    protected validate(): ClientLanguage {
        return this.minecraftObj;
    }

    protected generate(): WriteableResponse<ModuleResponse> {
        return {
            endpoint: "language",
            response: {
                name: this.Identifier,
                data: this.encode(),
            }
        }
    }
}