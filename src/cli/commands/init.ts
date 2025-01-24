import { buildProject } from "../../core/project_builder.ts";
import { Command } from "../command.ts";
import type { CommandData } from "../command.ts";

interface InitCommandData extends CommandData {}

new Command<InitCommandData>({
    name: "init",
    usage: {
        description: "Initialize a new project",
        usage: "init",
    },
    action(_args) {
        buildProject({
            projectName: "My Project",
            projectAuthor: "Your Name",
            projectNamespace: "test",
            projectFormatVersion: "1.0.0",
            projectType: "world"
        })
    },
    validateArgs(_args) {
        return true;
    }
});