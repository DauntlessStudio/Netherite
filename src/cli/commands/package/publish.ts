import { Command, type CommandData } from "../../command.ts";
import { Package } from "../../../core/classes/index.ts";

interface PublishCommandData extends CommandData {
    options: {
        package?: string|number;
    }
}

export default new Command<PublishCommandData>({
    name: "publish",
    usage: {
        description: "Attempts to publish a local package update. Requires the package to have been created correctly with a valid GitHub repository.",
        usage: "[--package <name|index>]",
        flags: {
            package: {
                type: "string|number",
                description: "The name or index of the package to uninstall",
                optional: true,
            },
        },
    },
    parse: {
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

        const nPackage = await Package.getLoadedPackage(_args.options.package);
        await Package.publish(nPackage);
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