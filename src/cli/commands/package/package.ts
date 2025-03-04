import { Command, type CommandData } from "../../command.ts";
import Create from "./create.ts";
import Publish from "./publish.ts";
import Install from "./install.ts";
import Uninstall from "./uninstall.ts";

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
.addSubCommand(Create)
.addSubCommand(Publish)
.addSubCommand(Install)
.addSubCommand(Uninstall);