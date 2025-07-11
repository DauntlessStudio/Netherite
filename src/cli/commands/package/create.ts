import { Command, type CommandData } from "../../command.ts";
import { Package } from "../../../core/classes/index.ts";
import { Logger } from "../../../core/utils/index.ts";

interface CreateCommandData extends CommandData {
    options: {
        name?: string;
        description?: string;
        publish?: boolean;
        owner?: string;
    }
}

interface CreateData {
    name: string;
    description: string;
    owner?: string;
}

interface GitHubAPIResponse {
    login: string;
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

async function getData(args: CreateCommandData): Promise<CreateData> {
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
            const owners: string[] = [];

            const userResult = await new Deno.Command("gh", {args: ["api", "user"], stdout: "piped"}).output();

            if (userResult.success) {
                const response = JSON.parse(new TextDecoder().decode(userResult.stdout)) as GitHubAPIResponse;
                owners.push(response.login);
            }

            const orgsResult = await new Deno.Command("gh", {args: ["api", "user/orgs"], stdout: "piped"}).output();

            if (orgsResult.success) {
                const response = JSON.parse(new TextDecoder().decode(orgsResult.stdout)) as GitHubAPIResponse[];
                response.forEach(r => owners.push(r.login));
            }

            let index: number = NaN;

            while (Number.isNaN(index)) {
                for (let i = 0; i < owners.length; i++) {
                    Logger.log(`[${Logger.Colors.green(i.toString())}]: ${Logger.Colors.green(owners[i])}`);
                }

                index = Number(prompt("Enter the index of the code owner:"));

                if (index < 0 || index >= owners.length) {
                    Logger.warn(`Invalid response, must be a number between 0 and ${owners.length - 1}`);
                    index = NaN;
                }
            }

            options.owner = owners[index];
        }
    }

    return options as CreateData;
}