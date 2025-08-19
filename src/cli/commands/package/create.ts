import { Command, type CommandData } from "../../command.ts";
import { Package } from "../../../core/classes/index.ts";
import { getNewRepoOwner, type GitHubPublishData } from "../../utils/github.ts";

interface CreateCommandData extends CommandData {
    options: {
        name?: string;
        description?: string;
        publish?: boolean;
        owner?: string;
    }
}

export default new Command<CreateCommandData>({
    name: "create",
    usage: {
        description: "Creates a new package in the current project",
        usage: "[--name <name> --description <description> --owner <org name> --publish]",
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
            "owner": {
                type: "string",
                description: "If publishing, who should the code owner be",
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
        const data = await getData(_args);
        await Package.create(data.name, data.description, data.owner ? {owner: data.owner} : undefined);
    },
});

async function getData(args: CreateCommandData): Promise<GitHubPublishData> {
    const options: Partial<GitHubPublishData> = {};

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

    let publishing: boolean = false;
    if (args.options.publish) {
        publishing = args.options.publish;
    } else {
        const val = confirm("Do you want to publish the package using the GitHub Command Line Tool?:");

        publishing = val;
    }

    if (publishing) {
        if (args.options.owner) {
            options.owner = args.options.owner;
        } else {
            options.owner = await getNewRepoOwner();
        }
    }

    return options as GitHubPublishData;
}