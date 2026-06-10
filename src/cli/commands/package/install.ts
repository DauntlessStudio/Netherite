import { Command, type CommandData } from "../../command.ts";
import { Package } from "../../../core/classes/index.ts";
import { Logger } from "../../../core/utils/index.ts";

interface InstallCommandData extends CommandData {
    options: {
        "no-load"?: boolean;
    }
}

export default new Command<InstallCommandData>({
    name: "install",
    usage: {
        description: "Installs a package into the Netherite cache, and loads it into the project",
        usage: "[--no-load]",
        argument: "<package git repo>",
        flags: {
            "no-load": {
                type: "boolean",
                description: "Does not load the package into the project",
                optional: true,
            },
        },
    },
    parse: {
        boolean: ["no-load"],
    },
    validateArgs(_args) {
        const args = _args.arguments.every(arg => typeof arg === "string");
        const noLoad = _args.options["no-load"] === undefined || typeof _args.options["no-load"] === "boolean";
        return args && noLoad;
    },
    async action(_args) {
        if (!_args.arguments.length) {
            await Package.load(await getPromptData());
            return;
        }

        for (const arg of _args.arguments) {
            const manifest = await Package.install(arg as string);
            
            if (!_args.options["no-load"]) {
                await Package.load(manifest.manifest.name);
            }
        }
    },
});

async function getPromptData(): Promise<string|number> {
    const packages = await Package.listGlobal();

    for (let i = 0; i < packages.length; i++) {
        Logger.log(`[${Logger.Colors.green(i.toString())}]: ${Logger.Colors.green(packages[i].manifest.name)}`);
    }
    
    const val = prompt("Enter the name or index of the package to uninstall:");

    if (val === null) {
        Logger.error("No package specified.");
        Deno.exit(1);
    }

    const asNum = parseInt(val);
    if (isNaN(asNum)) {
        return val;
    } else {
        return asNum;
    }
}