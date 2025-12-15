import { Logger } from "../core/core.ts";
import { Command } from "./command.ts";
import "./commands/index.ts";

Command.parseCommands(Deno.args).then(result => {
    if (result) {
        Deno.exit(0);
    } else {
        Deno.exit(1);
    }
}).catch(error => {
    Logger.error(error);
    Deno.exit(1);
});