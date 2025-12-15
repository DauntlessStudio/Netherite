import type { ParseOptions } from "@std/cli/parse-args";
import { parseArgs } from "@std/cli/parse-args";
import { Config } from "../core/classes/index.ts";
import { Logger } from "../core/utils/logger.ts";

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
    action?: (args: T) => Promise<void>|void;
}

export class Command<T extends CommandData> {
    private static registry: Command<CommandData>[] = [];

    public static async parseCommands(args: string[]): Promise<boolean> {
        for (const command of this.registry.values()) {
            if (await command.parse(args)) {
                this.checkVersion(false);
                return true;
            }
        }
        
        if (this.versionCommand(args)) {
            this.checkVersion(true);
            return true;
        }

        this.registry.forEach((command) => {
            if (!command.isSubcommand) command.printHelp();
        });

        this.checkVersion(false);
        return false;
    }

    private static versionCommand(args: string[]): boolean {
        const parseOptions: ParseOptions = {
            boolean: ["version"],
            alias: {
                v: "version",
            },
        }

        const parsedArgs = parseArgs(args, parseOptions);
        if (parsedArgs.version) {
            const version = Config.InstalledNetheriteVersion;
            Logger.log(`Netherite version: ${Logger.Colors.green(version)}`);
            return true;
        }

        return false;
    }

    private static async checkVersion(verbose: boolean): Promise<void> {
        const version = Config.InstalledNetheriteVersion;

        try {
            if (Deno.args.includes("--local")) {
                const compareVersion = await Config.LatestNetheriteVersion;
                if (compareVersion !== version) {
                    Logger.log(Logger.Colors.yellow(`Your project is using ${version}, but version ${Logger.Colors.green(compareVersion)} is available. Upgrade to latest with ${Logger.Colors.cyan(`deno add jsr:@coldiron/netherite`)}`));
                    return;
                }
            } else if (version.includes("beta")) {
                const compareVersion = await Config.BetaNetheriteVersion;
                if (compareVersion !== version) {
                    Logger.log(Logger.Colors.yellow(`You are using version ${version}, but version ${Logger.Colors.green(compareVersion)} is available. Upgrade to latest beta with ${Logger.Colors.cyan(`deno run -A jsr:@coldiron/netherite/install beta`)}`));
                    return;
                }
            } else {
                const compareVersion = await Config.LatestNetheriteVersion;
                if (compareVersion !== version) {
                    Logger.log(Logger.Colors.yellow(`You are using version ${version}, but version ${Logger.Colors.green(compareVersion)} is available. Upgrade to latest with ${Logger.Colors.cyan(`deno run -A jsr:@coldiron/netherite/install`)}`));
                    return;
                }
            }
        } catch (_error) {
            if (verbose) Logger.log("Could not fetch latest version, please check your internet connection.");
        }

        if (verbose) Logger.log(Logger.Colors.green("You are using the latest version of Netherite."));
    }

    private readonly subcommands: Command<CommandData>[] = [];
    
    public get isSubcommand() : boolean {
        return this.options.parent !== undefined;
    }
    
    constructor(private readonly options: CommandOptions<T>) {
        if (this.options.parent) {
            this.options.parent.addSubCommand(this as unknown as Command<CommandData>);
        } else {
            Command.registry.push(this as unknown as Command<CommandData>);
        }
    }

    public addSubCommand(command: Command<CommandData>): Command<T> {
        command.options.parent = this as unknown as Command<CommandData>;
        this.subcommands.push(command);
        return this;
    }

    public async parse(args: string[]): Promise<boolean> {
        if (args[0] === this.options.name) {
            args = args.slice(1);

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

            try {
                if (!this.options.validateArgs(filteredArgs)) {
                    this.printUsage();
                    return false;
                }
            } catch (error) {
                if (error instanceof Error) {
                    Logger.error(error.message);
                }
                
                this.printUsage();
                return false;
            }

            if (filteredArgs.options.help) {
                this.printUsage();
                return true;
            }

            if (this.options.action) {
                await this.options.action(filteredArgs as T);
            }

            if (this.subcommands.length) {
                for (const subcommand of this.subcommands) {
                    if (await subcommand.parse(args)) {
                        return true;
                    }
                }
                
                this.printUsage();
                return false;
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