import "jsr:@std/dotenv/load";
import * as path from "jsr:@std/path";
import { Config } from "./config.ts";

export interface ProjectBuilderOptions {
    projectName: string;
    projectAuthor: string;
    projectNamespace: string;
    projectFormatVersion: string;
    projectType: "world"|"add-on"|"skin-pack";
};

// TODO: Update this to generate an `en_US.lang` file for the project in both the BP and the RP that uses the dynamic string replacements for the output
export async function initProject(options: ProjectBuilderOptions): Promise<void> {
    console.log(`Building project ${options.projectName}...`);
    
    const processDir = Deno.cwd();
    const projectDir = path.join(processDir, options.projectName);

    Deno.mkdirSync(projectDir, {recursive: true});
    Deno.chdir(projectDir);

    console.log(`Creating project directories...`);
    getProjectDirectories(options).forEach(dir => Deno.mkdirSync(path.join(Deno.cwd(), dir), {recursive: true}));

    // Create development packs and symlink to dist
    const mojangBP = path.join(Config.MojangDirectory, "development_behavior_packs", options.projectNamespace + "_bp");
    const mojangRP = path.join(Config.MojangDirectory, "development_resource_packs", options.projectNamespace + "_rp");

    Deno.mkdirSync(mojangBP, {recursive: true});
    Deno.mkdirSync(mojangRP, {recursive: true});

    if (options.projectType === "world") {
        Deno.symlinkSync(mojangBP, path.join(Deno.cwd(), "dist/Content/world_template/behavior_packs", options.projectNamespace + "_bp"), {type: "dir"});
        Deno.symlinkSync(mojangRP, path.join(Deno.cwd(), "dist/Content/world_template/resource_packs", options.projectNamespace + "_rp"), {type: "dir"});
    } else {
        Deno.symlinkSync(mojangBP, path.join(Deno.cwd(), "dist/Content/behavior_packs", options.projectNamespace + "_bp"), {type: "dir"});
        Deno.symlinkSync(mojangRP, path.join(Deno.cwd(), "dist/Content/resource_packs", options.projectNamespace + "_rp"), {type: "dir"});
    }

    console.log(`Adding project files...`);
    addProjectFiles(options);

    console.log(`Installing dependencies...`);
    await new Deno.Command("deno", {args: ["install", "npm:@minecraft/server"]}).output();
    await new Deno.Command("deno", {args: ["install", "npm:@minecraft/server-ui"]}).output();
    if (Deno.env.get("LOCALAPI")) {
        let denoFile = Deno.readTextFileSync(path.join(Deno.cwd(), "netherite.config.ts"));
        denoFile = denoFile.replace("@coldiron/netherite", Deno.env.get("LOCALAPI") as string);
        Deno.writeTextFileSync(path.join(Deno.cwd(), "netherite.config.ts"), denoFile);
    } else {
        // TODO: install the package from the registry
    }

    console.log(`Building initial output...`);
    await new Deno.Command("netherite", {args: ["build"]}).output();

    console.log(`Project ${options.projectName} created successfully!`);
}

function getProjectDirectories(options: Pick<ProjectBuilderOptions, "projectNamespace"|"projectType">): string[] {
    switch (options.projectType) {
        case "add-on":
            return [
                `src/modules`,
                `src/behavior_pack`,
                `src/resource_pack`,
                `src/behavior_pack/scripts`,
                `dist/Content/behavior_packs`,
                `dist/Content/resource_packs`,
            ];
        case "world":
            return [
                `src/modules`,
                `src/behavior_pack`,
                `src/resource_pack`,
                `src/behavior_pack/scripts`,
                `dist/Content/world_template/behavior_packs`,
                `dist/Content/world_template/resource_packs`,
            ];
        case "skin-pack":
            return [
                `dist/Content/skin_packs/${options.projectNamespace}`,
            ];
    }
}

function addProjectFiles(options: ProjectBuilderOptions): void {
    const templateFiles: Record<string, string[]> = {
        "deno.json": ["deno.json"],
        "README.md": ["README.md"],
        ".gitignore": [".gitignore"],
        "netherite.config.txt": ["netherite.config.ts"],
        "main.ts": ["src/behavior_pack/scripts/main.ts"],
        "image_x256.png": ["src/behavior_pack/pack_icon.png", "src/resource_pack/pack_icon.png"],
    };

    Object.entries(templateFiles).forEach(([src, dest]) => {
        const filePath = Config.getTemplateFile(src);
        dest.forEach(d => {
            Deno.writeTextFileSync(
                path.join(Deno.cwd(), d), Deno.readTextFileSync(filePath)
                .replace(/\$PROJECTNAME\$/g, options.projectName)
                .replace(/\$PROJECTAUTHOR\$/g, options.projectAuthor)
                .replace(/\$PROJECTNAMESPACE\$/g, options.projectNamespace)
                .replace(/\$PROJECTTYPE\$/g, options.projectType)
                .replace(/\$FORMATVERSION\$/g, options.projectFormatVersion)
                .replace(/\$UUID\$/g, crypto.randomUUID())
            );
        });
    });
}