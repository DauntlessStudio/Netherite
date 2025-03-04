import { Command, type CommandData } from "../command.ts";
import { Validator } from "../../core/classes/index.ts";
import { Logger } from "../../core/utils/index.ts";

// TODO: Create a GitHub action to run this command on PRs during project init
export default new Command<CommandData>({
    name: "validate",
    usage: {
        description: "Validates the project",
        usage: "",
    },
    validateArgs(_args) {
        return true;
    },
    async action(_args) {
        const result = await Validator.validate();

        if (result.success) {
            Logger.log(Logger.Colors.green("Project is valid."));
        } else {
            Logger.error("Project is invalid.");
            for (const message of result.messages) {
                Logger.log(message);
            }
        }

        Deno.exit(result.success ? 0 : 1);
    },
});