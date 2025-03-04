import { Command, type CommandData } from "../../command.ts";
import { Package } from "../../../core/classes/index.ts";

interface CreateCommandData extends CommandData {
    options: {
        name?: string;
        description?: string;
        publish?: boolean;
    }
}

interface CreateData {
    name: string;
    description: string;
    publish: boolean;
}

export default new Command<CreateCommandData>({
    name: "create",
    usage: {
        description: "Creates a new package in the current project",
        usage: "[--name <name> --description <description> --publish]",
        flags: {
            "publish": {
                type: "boolean",
                description: "Uses the GitHub command line tool to publish the package",
                optional: true,
            },
            "name": {
                type: "string",
                description: "The name of the package",
                optional: true,
            },
            "description": {
                type: "string",
                description: "The description of the package",
                optional: true,
            },
        },
    },
    parse: {
        boolean: ["publish"],
        string: ["name", "description"],
        alias: {
            publish: "p",
            name: "n",
            description: "d",
        }
    },
    validateArgs(_args) {
        const publish = _args.options.publish === undefined || typeof _args.options.publish === "boolean";
        const name = _args.options.name === undefined || typeof _args.options.name === "string";
        const description = _args.options.description === undefined || typeof _args.options.description === "string";
        return publish && name && description;
    },
    async action(_args) {
        const data = getData(_args);
        await Package.create(data.name, data.description, data.publish);
    },
});

function getData(args: CreateCommandData): CreateData {
    const options: Partial<CreateData> = {};

    if (args.options.name) {
        options.name = args.options.name;
    } else {
        const val = prompt("Please enter the name of the package:");
        if (val === null || val === "") Deno.exit(1);

        options.name = val;
    }

    if (args.options.description) {
        options.description = args.options.description;
    } else {
        const val = prompt("Please enter the description of the package:");
        if (val === null || val === "") Deno.exit(1);

        options.description = val;
    }

    if (args.options.publish) {
        options.publish = args.options.publish;
    } else {
        const val = confirm("Do you want to publish the package using the GitHub Command Line Tool?:");

        options.publish = val;
    }

    return options as CreateData;
}