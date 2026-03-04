import type { ProjectConfig, WriteableResponse, WriteableModule } from "../core/classes/index.ts";
import { ModuleWriter } from "../core/classes/worker.ts";

class OptionsGenerator implements WriteableModule<void, ProjectConfig> {
    private options: ProjectConfig;

    constructor(options: ProjectConfig) {
        this.options = options;
        ModuleWriter.register(this);
    }

    public generate(): WriteableResponse<ProjectConfig> {
        return {
            endpoint: "options",
            response: this.options,
        }
    }
}

export function config(options: ProjectConfig): void {
    new OptionsGenerator(options);
}