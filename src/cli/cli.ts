import { Command } from "./command.ts";
import "./commands/index.ts";

Command.parseCommands(Deno.args);