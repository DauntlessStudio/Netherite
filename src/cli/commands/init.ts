import { Package } from "../../core/classes/index.ts";
import { Project, type ProjectType, type ProjectOptions } from "../../core/classes/project.ts";
import { Logger } from "../../core/utils/logger.ts";
import { Command } from "../command.ts";
import type { CommandData } from "../command.ts";
import { addLabelsToRepo, getNewRepoOwner, publishToGitHub, type GitHubPublishData } from "../utils/github.ts";

interface InitCommandData extends CommandData {
    options: {
        name?: string;
        author?: string;
        namespace?: string;
        format_version?: string;
        type?: ProjectType;
        skinpack?: boolean;
        vibrant_visuals?: boolean;
        publish?: boolean;
    }
}

new Command<InitCommandData>({
	name: "init",
	parse: {
		string: ["name", "author", "namespace", "format_version", "type", "vibrant_visuals"],
        boolean: ["skinpack"],
        negatable: ["publish"],
        alias: {
            n: "name",
            a: "author",
            ns: "namespace",
            f: "format_version",
            t: "type",
            sp: "skinpack",
            vv: "vibrant_visuals",
        },
	},
	usage: {
		description: "Initializes a new project",
		usage: "[options]",
		flags: {
			name: {
				type: "string",
				description: "The name of the project, will prompt if missing",
				optional: true,
			},
			author: {
				type: "string",
				description: "The author of the project, will prompt if missing",
				optional: true,
			},
			namespace: {
				type: "string",
				description: "The namespace of the project, will prompt if missing",
				optional: true,
			},
			format_version: {
				type: "string",
				description: "The format version of the project, will prompt if missing. Use 'latest' to get the latest version",
				optional: true,
			},
			type: {
				type: "string",
				description: "The type of the project, will prompt if missing",
				optional: true,
			},
			skinpack: {
				type: "boolean",
				description: "When the type is a world or add-on, should a skin pack be included? will prompt if missing",
				optional: true,
			},
			vibrant_visuals: {
				type: "boolean",
				description: "Should the project have PBR enabled for the Resource Pack?",
				optional: true,
			},
            publish: {
                type: "boolean",
                description: "Use --no-publish if you don't want a prompt to publish to GitHub",
                optional: true,
            }
		},
	},
	async action(_args) {
        const projectOptions = await getProjectBuildData(_args);

		await Project.init(projectOptions);

        // If user didn't explicitly use --no-publish
        if (_args.options.publish || _args.options.publish === undefined) {
            try {
                const url = await publishToGitHub(await getProjectPublishData(projectOptions));
                Logger.log(`Successfully published ${projectOptions.name} to ${url}`);
            } catch (error) {
                Logger.error(String(error));
                Deno.exit(1);
            }

            await addLabelsToRepo(true);
        }
	},
	validateArgs(_args) {
        const validName = _args.options.name === undefined || (typeof _args.options.name === "string" && _args.options.name.length > 0);
        const validAuthor = _args.options.author === undefined || (typeof _args.options.author === "string" && _args.options.author.length > 0);
        // TODO: Add regex for namespace and format version validation
        const validNamespace = _args.options.namespace === undefined || (typeof _args.options.namespace === "string" && _args.options.namespace.length > 0);
        const validFormatVersion = _args.options.format_version === undefined || (typeof _args.options.format_version === "string" && _args.options.format_version.length > 0);
        const validType = _args.options.type === undefined || (typeof _args.options.type === "string" && ["world", "add-on", "skin-pack"].includes(_args.options.type));
        const validSkinpack = _args.options.skinpack === undefined || (typeof _args.options.skinpack === "boolean");
        const validVibrantVisuals = _args.options.vibrant_visuals === undefined || (typeof _args.options.vibrant_visuals === "boolean");
        const validPublish = _args.options.publish === undefined || (typeof _args.options.publish === "boolean");

		return validName && validAuthor && validNamespace && validFormatVersion && validType && validSkinpack && validPublish && validVibrantVisuals;
	},
});

async function getProjectBuildData(args: InitCommandData): Promise<ProjectOptions> {
    const buildOptions: Partial<ProjectOptions> = {
        uuid: crypto.randomUUID(),
        version: "1.0.0",
    };

    await Package.vanillaUpdate();

    if (args.options.name) {
        buildOptions.name = args.options.name;
    } else {
        const val = prompt("Please enter the name of the project:");
        if (val === null || val === "") Deno.exit(1);

        buildOptions.name = val;
    }

    if (args.options.author) {
        buildOptions.author = args.options.author;
    } else {
        const val = prompt("Please enter the author of the project:");
        if (val === null || val === "") Deno.exit(1);

        buildOptions.author = val;
    }

    if (args.options.namespace) {
        buildOptions.namespace = args.options.namespace;
    } else {
        const val = prompt("Please enter the namespace of the project:");
        if (val === null || val === "") Deno.exit(1);

        buildOptions.namespace = val;
    }

    if (args.options.format_version) {
        if (args.options.format_version === "latest") {
            args.options.format_version = Package.LatestVanillaVersion;
        }

        buildOptions.format_version = args.options.format_version;
    } else {
        let val = prompt(`Please enter the format version of the project [default: ${Package.LatestVanillaVersion}]:`);
        if (val === null || val === "") val = Package.LatestVanillaVersion;

        buildOptions.format_version = val;
    }

    if (args.options.vibrant_visuals !== undefined) {
        buildOptions.vibrant_visuals = args.options.vibrant_visuals;
    } else {
        const val = prompt(`Please enter the whether you want Vibrant Visuals enabled [default: true]:`);
        buildOptions.vibrant_visuals = Boolean(val);
    }

    if (args.options.type) {
        buildOptions.type = args.options.type;
    } else {
        let val = prompt("Please enter the type of the project (world, add-on, skin-pack) [default: world]:");
        if (val === null || !["world", "add-on", "skin-pack"].includes(val)) val = "world";

        buildOptions.type = val as ProjectType;
    }

    if (buildOptions.type === "world" || buildOptions.type === "add-on") {
        if (args.options.skinpack) {
            buildOptions.include_skin_pack = args.options.skinpack;
        } else {
            const val = confirm("Do you want to include a skin pack?:");
            buildOptions.include_skin_pack = val;
        }
    }

    return buildOptions as ProjectOptions;
}

async function getProjectPublishData(project: ProjectOptions): Promise<GitHubPublishData> {
    if (!confirm("Do you want to publish this project to GitHub?:")) {
        Deno.exit(0);
    }

    const owner = await getNewRepoOwner();

    const defaultName = project.name.replace(/\s/g, "-")
    let name = prompt(`Please enter the name of the GitHub repo [default: ${defaultName}]:`);
    if (name === null || name === "") name = defaultName;

    return {
        owner,
        name,
        description: "A Minecraft Bedrock project created with Netherite!",
    };
}