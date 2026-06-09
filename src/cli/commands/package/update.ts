import { Command, type CommandData } from "../../command.ts";
import { Package } from "../../../core/classes/index.ts";
import { Logger } from "../../../core/utils/index.ts";

interface UpdateCommandData extends CommandData {
    options: {
        package?: string|number;
        version?: string;
    }
}

export default new Command<UpdateCommandData>({
    name: "update",
    usage: {
        description: "Updates a local package to another version.",
        usage: "[--package <name|index> --version <tag>]",
        flags: {
            package: {
                type: "string|number",
                description: "The name or index of the package to update",
                optional: true,
            },
            version: {
                type: "string",
                description: "The version number of the package to install, i.e. `1.0.0`",
                optional: false,
            },
        },
    },
    parse: {
        string: ["package", "version"],
        alias: {
            package: "p",
            version: "v",
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
        const manifest = await Package.install(nPackage.package.url, getVersionData(_args));
        await Package.load(manifest.manifest.name);
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

function getVersionData(args: UpdateCommandData): string {
    if (args.options.version) {
        return args.options.version;
    } else {
        const val = prompt("Please enter the version of the package to switch to (i.e. 1.0.0):", "latest");
        if (val === null || val === "") Deno.exit(1);

        return val;
    }
}