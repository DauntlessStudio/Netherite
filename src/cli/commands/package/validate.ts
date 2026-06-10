import { Command, type CommandData } from "../../command.ts";
import { Package } from "../../../core/classes/index.ts";
import { Logger } from "../../../core/utils/index.ts";

interface ValidateCommandData extends CommandData {
    options: {
        package?: string|number;
    }
}

export default new Command<ValidateCommandData>({
    name: "validate",
    usage: {
        description: "Validates a package from the Netherite cache",
        usage: "[--package <name|index>]",
        flags: {
            package: {
                type: "string|number",
                description: "The name or index of the package to validate",
                optional: true,
            },
        },
    },
    parse: {
        boolean: ["no-unload"],
        string: ["package"],
        alias: {
            package: "p",
        }
    },
    validateArgs(_args) {
        const pack = _args.options["package"] === undefined || typeof _args.options["package"] === "string" || typeof _args.options["package"] === "number";
        return pack;
    },
    async action(_args) {
        if (!_args.options.package) {
            _args.options.package = await getPromptData();
        } else if (typeof _args.options.package === "string") {
            const asNum = parseInt(_args.options.package);
            if (!isNaN(asNum)) {
                _args.options.package = asNum;
            }
        }

        await Package.convert(await Package.getGlobalPackage(_args.options.package!));
    },
});

async function getPromptData(): Promise<string|number> {
    const packages = await Package.listGlobal();

    for (let i = 0; i < packages.length; i++) {
        Logger.log(`[${Logger.Colors.green(i.toString())}]: ${Logger.Colors.green(packages[i].manifest.name)}`);
    }
    
    const val = prompt("Enter the name or index of the package to validate:");

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