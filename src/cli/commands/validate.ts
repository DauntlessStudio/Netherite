import { Command, type CommandData } from "../command.ts";
import { Validator } from "../../core/classes/index.ts";

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
            console.log("Project is valid.");
        } else {
            console.error("Project is invalid.");
            for (const message of result.messages) {
                console.error(message);
            }
        }

        Deno.exit(result.success ? 0 : 1);
    },
});