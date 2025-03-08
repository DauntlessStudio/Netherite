import type { ProjectOptions, WorkerResponse, WorkerWriteable } from "../core/classes/index.ts";
import { WorkerWriter } from "../core/classes/worker.ts";

class OptionsGenerator implements WorkerWriteable<void, ProjectOptions> {
    private options: ProjectOptions;

    constructor(options: ProjectOptions) {
        WorkerWriter.register(this);
        this.options = options;
    }

    public generate(): WorkerResponse<ProjectOptions> {
        return {
            endpoint: "options",
            response: this.options,
        }
    }
}

export function config(options: ProjectOptions): void {
    new OptionsGenerator(options);
}