import { Project, type ProjectBuilderOptions } from "../../core/classes/project.ts";
import { Command } from "../command.ts";
import type { CommandData } from "../command.ts";

interface InitCommandData extends CommandData {
    options: {
        name?: string;
        author?: string;
        namespace?: string;
        formatVersion?: string;
        type?: "world"|"add-on"|"skin-pack";
    }
}

new Command<InitCommandData>({
	name: "init",
	parse: {
		string: ["name", "author", "namespace", "formatVersion", "type"],
        alias: {
            n: "name",
            a: "author",
            ns: "namespace",
            f: "formatVersion",
            t: "type",
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
			formatVersion: {
				type: "string",
				description: "The format version of the project, will prompt if missing",
				optional: true,
			},
			type: {
				type: "string",
				description: "The type of the project, will prompt if missing",
				optional: true,
			},
		},
	},
	action(_args) {
		Project.init(getProjectBuildData(_args));
	},
	validateArgs(_args) {
        const validName = _args.options.name === undefined || (typeof _args.options.name === "string" && _args.options.name.length > 0);
        const validAuthor = _args.options.author === undefined || (typeof _args.options.author === "string" && _args.options.author.length > 0);
        // TODO: Add regex for namespace and format version validation
        const validNamespace = _args.options.namespace === undefined || (typeof _args.options.namespace === "string" && _args.options.namespace.length > 0);
        const validFormatVersion = _args.options.formatVersion === undefined || (typeof _args.options.formatVersion === "string" && _args.options.formatVersion.length > 0);
        const validType = _args.options.type === undefined || (typeof _args.options.type === "string" && ["world", "add-on", "skin-pack"].includes(_args.options.type));

		return validName && validAuthor && validNamespace && validFormatVersion && validType;
	},
});

function getProjectBuildData(args: InitCommandData): ProjectBuilderOptions {
    const buildOptions: Partial<ProjectBuilderOptions> = {};

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

    if (args.options.formatVersion) {
        buildOptions.formatVersion = args.options.formatVersion;
    } else {
        let val = prompt("Please enter the format version of the project [default: 1.21.51]:");
        if (val === null || val === "") val = "1.21.51";

        buildOptions.formatVersion = val;
    }

    if (args.options.type) {
        buildOptions.type = args.options.type;
    } else {
        let val = prompt("Please enter the type of the project (world, add-on, skin-pack) [default: world]:");
        if (val === null || !["world", "add-on", "skin-pack"].includes(val)) val = "world";

        buildOptions.type = val as "world"|"add-on"|"skin-pack";
    }

    return buildOptions as ProjectBuilderOptions;
}