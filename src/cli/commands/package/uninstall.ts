import { Command, type CommandData } from "../../command.ts";
import { Package } from "../../../core/classes/index.ts";

interface UninstallCommandData extends CommandData {
    options: {
        package?: string|number;
        "no-unload"?: boolean;
    }
}

export default new Command<UninstallCommandData>({
    name: "uninstall",
    usage: {
        description: "Uninstalls a package from the Netherite cache, and unloads it from the project",
        usage: "[--package <name|index> --no-unload]",
        flags: {
            package: {
                type: "string|number",
                description: "The name or index of the package to uninstall",
                optional: true,
            },
            "no-unload": {
                type: "boolean",
                description: "Does not load the package into the project",
                optional: true,
            },
        },
    },
    parse: {
        boolean: ["no-unload"],
        string: ["package"],
        alias: {
            pacakge: "p",
        }
    },
    validateArgs(_args) {
        const pack = _args.options["package"] === undefined || typeof _args.options["package"] === "string" || typeof _args.options["package"] === "number";
        const noLoad = _args.options["no-unload"] === undefined || typeof _args.options["no-unload"] === "boolean";
        return pack && noLoad;
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

        const manifest = await Package.uninstall(_args.options.package);

        if (!_args.options["no-unload"]) {
            await Package.unload(manifest.manifest.name);
        }
    },
});

async function getPromptData(): Promise<string|number> {
    const packages = await Package.list();

    for (let i = 0; i < packages.length; i++) {
        console.log(`${i}: ${packages[i].manifest.name}`);
    }
    
    const val = prompt("Enter the name or index of the package to uninstall: ");

    if (val === null) {
        console.log("No package specified.");
        Deno.exit(1);
    }

    const asNum = parseInt(val);
    if (isNaN(asNum)) {
        return val;
    } else {
        return asNum;
    }
}