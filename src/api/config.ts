import type { ProjectConfig, WorkerResponse, WorkerWriteable } from "../core/classes/index.ts";
import { WorkerWriter } from "../core/classes/worker.ts";

class OptionsGenerator implements WorkerWriteable<void, ProjectConfig> {
    private options: ProjectConfig;

    constructor(options: ProjectConfig) {
        this.options = options;
        WorkerWriter.register(this);
    }

    public generate(): WorkerResponse<ProjectConfig> {
        return {
            endpoint: "options",
            response: this.options,
        }
    }
}

export function config(options: ProjectConfig): void {
    new OptionsGenerator(options);
}