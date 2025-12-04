import * as path from "@std/path";
import { TemplateFile } from "../../templates/index.ts";
import { emptyDirectorySync } from "../utils/index.ts";
import { Config, Script, Manifest, Language, Static, Module, World, WorkerManager, CompositeJSON } from "./index.ts";
import { Logger } from "../utils/logger.ts";

// TODO: Possibly remove skin-pack as an option and instead build a skin pack with the world or add-on
// TODO: Generate level.dat and world_icon.jpeg for world projects
export type ProjectType = "world"|"add-on"|"skin-pack";

interface ProjectOptionsBase {
    type: ProjectType;
    name: string;
    author: string;
    namespace: string;
    format_version: string;
    uuid: string;
    version: `${number}.${number}.${number}`;
};

interface ProjectOptionsWorld extends ProjectOptionsBase {
    type: "world";
    include_skin_pack?: boolean;
    random_seed?: boolean;
}

interface ProjectOptionsAddOn extends ProjectOptionsBase {
    type: "add-on";
    include_skin_pack?: boolean;
    random_seed?: boolean;
}

interface ProjectOptionsSkinPack extends ProjectOptionsBase {
    type: "skin-pack";
}

export type ProjectOptions = ProjectOptionsWorld | ProjectOptionsAddOn | ProjectOptionsSkinPack;

export class Project {
    private static readonly processDir: string = Deno.cwd();

    public static async init(options: ProjectOptions): Promise<void> {
        Config.setOptions(options);

        const projectDir = path.join(this.processDir, options.name);

        Deno.mkdirSync(projectDir, {recursive: true});
        Deno.chdir(projectDir);

        Logger.Spinner.start("Creating Directories...");
        this.createDirectories();
        
        Logger.Spinner.update("Creating Files...");
        await this.createFiles();

        Logger.Spinner.update("Installing Dependencies...");
        await this.installDependencies();

        Logger.Spinner.update("Building Project...");
        await new Deno.Command("netherite", {args: ["build", "-s"]}).output();

        Logger.Spinner.succeed("Project created successfully!");
    }

    public static async build(options?: {watch?: boolean, ignoreSymlinks?: boolean, silent?: boolean}): Promise<void> {
        const cachedTime = Date.now();

        if (options?.silent !== true) Logger.Spinner.start("Building Project...");

        try {
            await Config.ingestConfig();
        } catch (error) {
            if (options?.silent !== true) Logger.Spinner.fail("Build Failed");
            Logger.error(String(error));
            Deno.exit(1);
        }

        emptyDirectorySync(path.join(Deno.cwd(), "dist"));
        
        if (Config.Options.type !== "skin-pack") {
            if (options?.ignoreSymlinks !== true) this.createSymlinks();
            emptyDirectorySync(Config.Paths.bp.root);
            emptyDirectorySync(Config.Paths.rp.root);
        }

        await Module.build(options?.watch);
        await Static.build(options?.watch);
        await Script.build(options?.watch);
        await World.build();
        Language.build();
        CompositeJSON.build();
        await Manifest.build();

        if (!options?.watch) WorkerManager.stopServer();
        if (options?.silent !== true) Logger.Spinner.succeed(`Project built in ${Date.now() - cachedTime}ms`);
        if (options?.watch) Logger.log("Watching for changes...");
    }

    private static createDirectories(): void {
        Deno.mkdirSync(path.join(Deno.cwd(), "src/modules"), {recursive: true});
        this.createSymlinks();
    }

    private static createSymlinks(): void {
        if (Config.Options.type === "skin-pack") return;

        const projectNamespace = Config.PackName;

        const mojangBP = path.join(Config.MojangDirectory, "development_behavior_packs", projectNamespace + "_bp");
        const mojangRP = path.join(Config.MojangDirectory, "development_resource_packs", projectNamespace + "_rp");

        try {
            Deno.mkdirSync(mojangBP, {recursive: true});
            Deno.mkdirSync(mojangRP, {recursive: true});
        } catch (_error) {
            // Directory already exists
        }

        try {
            if (Config.Options.type === "world") {
                Deno.mkdirSync(path.join(Deno.cwd(), "dist/Content/world_template/behavior_packs"), {recursive: true});
                Deno.mkdirSync(path.join(Deno.cwd(), "dist/Content/world_template/resource_packs"), {recursive: true});
            } else if (Config.Options.type === "add-on") {
                Deno.mkdirSync(path.join(Deno.cwd(), "dist/Content/behavior_packs"), {recursive: true});
                Deno.mkdirSync(path.join(Deno.cwd(), "dist/Content/resource_packs"), {recursive: true});
            }
        } catch (_error) {
            // Dist already exists
        }

        try {
            if (Config.Options.type === "world") {
                Deno.symlinkSync(mojangBP, path.join(Deno.cwd(), "dist/Content/world_template/behavior_packs", projectNamespace + "_bp"), {type: "junction"});
                Deno.symlinkSync(mojangRP, path.join(Deno.cwd(), "dist/Content/world_template/resource_packs", projectNamespace + "_rp"), {type: "junction"});
            } else if (Config.Options.type === "add-on") {
                Deno.symlinkSync(mojangBP, path.join(Deno.cwd(), "dist/Content/behavior_packs", projectNamespace + "_bp"), {type: "junction"});
                Deno.symlinkSync(mojangRP, path.join(Deno.cwd(), "dist/Content/resource_packs", projectNamespace + "_rp"), {type: "junction"});
            }
        } catch (_error) {
            // Symlink already exists
        }
    }

    private static async createFiles(): Promise<void> {
        await TemplateFile.write();
    }

    private static async installDependencies(): Promise<void> {
        const deps = [
            "npm:@minecraft/server",
            "npm:@minecraft/server-ui",
            "jsr:@coldiron/netherite",
        ];

        await new Deno.Command("deno", {args: ["add", ...deps]}).output();
    }
}