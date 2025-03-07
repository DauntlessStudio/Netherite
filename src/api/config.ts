import type { ProjectOptions, WorkerResponse } from "../core/classes/index.ts";

class OptionsGenerator {
    private options: ProjectOptions;

    constructor(options: ProjectOptions) {
        this.options = options;
    }

    public generate(): WorkerResponse<ProjectOptions> {
        return {
            endpoint: "options",
            data: this.options,
        }
    }
}

export function config(options: ProjectOptions): OptionsGenerator {
    return new OptionsGenerator(options);
}