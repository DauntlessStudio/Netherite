import { Config } from "../../../core/core.ts";
import { Command, type CommandData } from "../../command.ts";
import armor from "./armor.ts";
import attachable from "./attachable.ts";
import entity from "./entity.ts";
import item from "./item.ts";

export default new Command<CommandData>({
    name: "new",
    usage: {
        description: "Create new files in src from templates",
        usage: "<subcommand> [options]",
    },
    validateArgs() {
        return true;
    },
    async action() {
        await Config.ingestConfig();
    },
})
.addSubCommand(item)
.addSubCommand(armor)
.addSubCommand(attachable)
.addSubCommand(entity)