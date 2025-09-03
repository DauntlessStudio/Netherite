import { Command, type CommandData } from "../../command.ts";
import armor from "./armor.ts";
import attachable from "./attachable.ts";
import item from "./item.ts";

export default new Command<CommandData>({
    name: "new",
    usage: {
        description: "Create new files in src from templates",
        usage: "<subcommand> [options]",
    },
    validateArgs(_args) {
        return true;
    },
})
.addSubCommand(item)
.addSubCommand(armor)
.addSubCommand(attachable)