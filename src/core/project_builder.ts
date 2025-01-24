import * as path from "jsr:@std/path";

export interface ProjectBuilderOptions {
    projectName: string;
    projectAuthor: string;
    projectNamespace: string;
    projectFormatVersion: string;
    projectType: "world"|"add-on"|"skin-pack";
};

export async function buildProject(options: ProjectBuilderOptions): Promise<void> {
    console.log(`Building project ${options.projectName}...`);
    
    const processDir = Deno.cwd();
    const projectDir = path.join(processDir, options.projectName);

    Deno.mkdirSync(projectDir, {recursive: true});
    Deno.chdir(projectDir);

    console.log(`Creating project directories...`);
    getProjectDirectories(options).forEach(dir => Deno.mkdirSync(path.join(Deno.cwd(), dir), {recursive: true}));

    console.log(`Adding project files...`);
    addProjectFiles(options);

    console.log(`Installing dependencies...`);
    await new Deno.Command("deno", {args: ["install", "npm:@minecraft/server"]}).output();
    await new Deno.Command("deno", {args: ["install", "npm:@minecraft/server-ui"]}).output();

    console.log(`Project ${options.projectName} created successfully!`);
}

function getProjectDirectories(options: Pick<ProjectBuilderOptions, "projectNamespace"|"projectType">): string[] {
    switch (options.projectType) {
        case "add-on":
            return [
                `src/modules`,
                `src/behavior_pack`,
                `src/resource_pack`,
                `dist/Content/behavior_packs/${options.projectNamespace}_bp`,
                `dist/Content/resource_packs/${options.projectNamespace}_rp`,
            ];
        case "world":
            return [
                `src/modules`,
                `src/behavior_pack`,
                `src/resource_pack`,
                `dist/Content/world_template/behavior_packs/${options.projectNamespace}_bp`,
                `dist/Content/world_template/resource_packs/${options.projectNamespace}_rp`,
            ];
        case "skin-pack":
            return [
                `dist/Content/skin_packs/${options.projectNamespace}`,
            ];
    }
}

function addProjectFiles(options: Pick<ProjectBuilderOptions, "projectName"|"projectType">): void {
    const templateFiles = [
        "deno.json",
        "README.md",
        ".gitignore",
        "netherite.config.ts",
    ];

    templateFiles.forEach(file => {
        const filePath = path.join(path.fromFileUrl(Deno.mainModule), "../..", "templates", file);
        Deno.writeTextFileSync(path.join(Deno.cwd(), file), Deno.readTextFileSync(filePath).replace(/PROJECTNAME/g, options.projectName));
    });
}