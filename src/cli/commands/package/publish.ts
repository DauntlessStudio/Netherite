import { Command, type CommandData } from "../../command.ts";
import { Package } from "../../../core/classes/index.ts";
import { Logger } from "../../../core/utils/index.ts";

interface PublishCommandData extends CommandData {
    options: {
        package?: string|number;
        version: string;
    }
}

export default new Command<PublishCommandData>({
    name: "publish",
    usage: {
        description: "Publishes a local package update. Requires the package to have been created correctly with a valid GitHub repository.",
        usage: "[--package <name|index> --force]",
        flags: {
            package: {
                type: "string|number",
                description: "The name or index of the package to publish",
                optional: true,
            },
            version: {
                type: "string",
                description: "The new version number of the package, i.e. `1.0.0`",
                optional: false,
            },
        },
    },
    parse: {
        string: ["package", "version"],
        alias: {
            force: "f",
            v: "v",
        }
    },
    validateArgs(_args) {
        const pack = _args.options["package"] === undefined || typeof _args.options["package"] === "string" || typeof _args.options["package"] === "number";
        const version = _args.options["version"] === undefined || typeof _args.options["version"] === "string";
        return pack && version;
    },
    async action(_args) {
        if (!_args.options.package) {
            _args.options.package = await getPackageData();
        } else if (typeof _args.options.package === "string") {
            const asNum = parseInt(_args.options.package);
            if (!isNaN(asNum)) {
                _args.options.package = asNum;
            }
        }

        const nPackage = await Package.getLoadedPackage(_args.options.package);
        await Package.publish(nPackage, getVersionData(_args));
    },
});

async function getPackageData(): Promise<string|number> {
    const packages = await Package.listLocal();

    for (let i = 0; i < packages.length; i++) {
        Logger.log(`[${Logger.Colors.green(i.toString())}]: ${Logger.Colors.green(packages[i].package.name)}`);
    }
    
    const val = prompt("Enter the name or index of the package to publish:");

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

function getVersionData(args: PublishCommandData): string {
    if (args.options.version) {
        return args.options.version;
    } else {
        const val = prompt("Please enter the new version of the package in SemVer (i.e. 1.0.0):");
        if (val === null || val === "") Deno.exit(1);

        return val;
    }
}