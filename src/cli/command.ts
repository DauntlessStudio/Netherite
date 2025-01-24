import type { ParseOptions } from "@std/cli/parse-args";
import { parseArgs } from "@std/cli/parse-args";

export interface CommandData {
    arguments: (number|string|boolean)[];
    options: Record<string, number|boolean|string>;
}

export interface CommandUsage {
    usage: string;
    description: string;
    argument?: string;
    flags?: {[key: string]: {
        type: string;
        description: string;
        optional: boolean;
    }};
}

export interface CommandOptions<T extends CommandData> {
    name: string;
    usage: CommandUsage;
    parse?: ParseOptions;
    subcommands?: Command<CommandData>[];
    validateArgs: (args: T) => boolean;
    action?: (args: T) => void;
}

export class Command<T extends CommandData> {
    private static registry: Command<CommandData>[] = [];

    public static parseCommands(args: string[]): boolean {
        return this.registry.some((command) => command.parse(args));
    }

    constructor(private readonly options: CommandOptions<T>) {
        Command.registry.push(this as unknown as Command<CommandData>);
    }

    public parse(args: string[]): boolean {
        if (args[0] === this.options.name) {
            args = args.slice(1);

            if (this.options.subcommands) {
                for (const subcommand of this.options.subcommands) {
                    if (subcommand.parse(args)) {
                        return true;
                    }
                }
            }

            this.options.parse = this.options.parse ?? {};
            this.options.parse.alias = this.options.parse.alias ?? {};
            this.options.parse.alias.h = ["help"];

            const parsedArgs = parseArgs(args, this.options.parse);
            const filteredArgs = Object.keys(parsedArgs).reduce((acc, key) => {
                if (key === '_') {
                    acc.arguments = parsedArgs[key];
                } else {
                    acc.options[key] = parsedArgs[key];
                }
                return acc;
            }, {arguments: [], options: {}} as CommandData as T);

            if (!this.options.validateArgs(filteredArgs)) {
                this.printUsage();
                return false;
            }

            if (filteredArgs.options.help) {
                this.printUsage();
                return true;
            }

            if (this.options.action) {
                this.options.action(filteredArgs as T);
            }

            return true;
        }

        return false;
    }

    protected printUsage(): void {
        console.log(`Usage: netherite ${this.options.name} ${this.options.usage.usage}`);
        console.log(this.options.usage.description);
        if (this.options.usage.argument) console.log(`Arguments: ${this.options.usage.argument}`);
        if (this.options.usage.flags) {
            console.log("Flags:");
            for (const [key, value] of Object.entries(this.options.usage.flags)) {
                console.log(`  --${key} (${value.type})${value.optional ? ' [optional]' : ''}: ${value.description}`);
            }
        }
    }
}