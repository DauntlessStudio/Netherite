/**
 * This module contains the command parser and handler for all of the CLI options.
 * @module
 */
import { Logger, ModuleManager } from "../core/core.ts";
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
}).finally(() => {
    ModuleManager.shutdown();
    Deno.exit(1);
}); 