import type { ParseOptions } from "jsr:@std/cli/parse-args";
import { parseArgs } from "jsr:@std/cli/parse-args";

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
    parent?: Command<CommandData>;
    validateArgs: (args: T) => boolean;
    action?: (args: T) => void;
}

export class Command<T extends CommandData> {
    private static registry: Command<CommandData>[] = [];

    public static parseCommands(args: string[]): boolean {
        if (this.registry.some((command) => command.parse(args))) {
            return true;
        } else {
            this.registry.forEach((command) => command.printHelp());
            return false;
        }
    }

    private readonly subcommands: Command<CommandData>[] = [];

    constructor(private readonly options: CommandOptions<T>) {
        if (this.options.parent) {
            this.options.parent.addSubCommand(this as unknown as Command<CommandData>);
        } else {
            Command.registry.push(this as unknown as Command<CommandData>);
        }
    }

    public addSubCommand(command: Command<CommandData>): Command<T> {
        this.subcommands.push(command);
        return this;
    }

    public parse(args: string[]): boolean {
        if (args[0] === this.options.name) {
            args = args.slice(1);

            if (this.subcommands.length) {
                for (const subcommand of this.subcommands) {
                    if (subcommand.parse(args)) {
                        return true;
                    }
                }

                args.push("--help");
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
        console.log(this.options.usage.description);
        console.log(`Usage: netherite ${this.options.name} ${this.options.usage.usage}`);
        if (this.options.usage.argument) console.log(`Arguments: ${this.options.usage.argument}`);
        if (this.options.usage.flags) {
            console.log("Flags:");
            for (const [key, value] of Object.entries(this.options.usage.flags)) {
                console.log(`  --${key} (${value.type})${value.optional ? ' [optional]' : ''}: ${value.description}`);
            }
        }
        if (this.subcommands.length) {
            console.log("Subcommands:");
            for (const subcommand of this.subcommands) {
                subcommand.printHelp("\t");
            }
        }
    }

    protected printHelp(prefix: string = ""): void {
        console.log(prefix + `netherite ${this.options.name} ${this.options.usage.usage}`);
    }
}