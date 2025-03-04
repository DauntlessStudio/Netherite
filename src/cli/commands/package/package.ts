import { Command, type CommandData } from "../../command.ts";
import Create from "./create.ts";

export default new Command<CommandData>({
    name: "package",
    usage: {
        description: "Work with Netherite packages",
        usage: "<subcommand> [options]",
    },
    validateArgs(_args) {
        return true;
    },
})
.addSubCommand(Create);