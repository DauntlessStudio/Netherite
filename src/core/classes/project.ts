import * as path from "jsr:@std/path";
import { TemplateFile } from "../../templates/index.ts";
import { emptyDirectorySync } from "../utils/index.ts";
import { Config, Sound, Texture, Script, Manifest, Language, Static, Module, World } from "./index.ts";
import { Logger } from "../utils/logger.ts";

// TODO: Possibly remove skin-pack as an option and instead build a skin pack with the world or add-on
// TODO: Generate level.dat and world_icon.jpeg for world projects
export type ProjectType = "world"|"add-on"|"skin-pack";
export type ScriptType = "deno" | "node";

export interface ProjectBuilderOptions {
    name: string;
    author: string;
    namespace: string;
    formatVersion: string;
    type: ProjectType;
    scripting: ScriptType;
};

export class Project {
    private static readonly processDir: string = Deno.cwd();

    private static readonly dependencies: string[] = [
        "npm:@minecraft/server",
        "npm:@minecraft/server-ui",
    ];

    public static async init(options: ProjectBuilderOptions): Promise<void> {
        Config.setOptions({...options, uuid: crypto.randomUUID(), version: "1.0.0"});

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
        await new Deno.Command("netherite", {args: ["build"]}).output();

        Logger.Spinner.succeed("Project created successfully!");
    }

    public static async build(options?: {watch?: boolean, ignoreSymlinks?: boolean, silent?: boolean}): Promise<void> {
        const cachedTime = Date.now();

        if (options?.silent !== true) Logger.Spinner.start("Building Project...");

        await Config.ingestConfig();

        emptyDirectorySync(path.join(Deno.cwd(), "dist"));
        
        if (options?.ignoreSymlinks !== true) this.createSymlinks();
        emptyDirectorySync(Config.Paths.bp.root);
        emptyDirectorySync(Config.Paths.rp.root);

        await Module.build(options?.watch);
        Static.build(options?.watch);
        await Script.build(options?.watch);
        await World.build();
        Language.build();
        Sound.build();
        Texture.build();
        await Manifest.build();

        if (options?.silent !== true) Logger.Spinner.succeed(`Project built in ${Date.now() - cachedTime}ms`);
    }

    private static createDirectories(): void {
        if (Config.Options.type === "skin-pack") return;

        Deno.mkdirSync(path.join(Deno.cwd(), "src/modules"), {recursive: true});
        this.createSymlinks();
    }

    private static createSymlinks(): void {
        const projectNamespace = Config.Options.namespace;

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
                Deno.symlinkSync(mojangBP, path.join(Deno.cwd(), "dist/Content/world_template/behavior_packs", projectNamespace + "_bp"), {type: "dir"});
                Deno.symlinkSync(mojangRP, path.join(Deno.cwd(), "dist/Content/world_template/resource_packs", projectNamespace + "_rp"), {type: "dir"});
            } else if (Config.Options.type === "add-on") {
                Deno.symlinkSync(mojangBP, path.join(Deno.cwd(), "dist/Content/behavior_packs", projectNamespace + "_bp"), {type: "dir"});
                Deno.symlinkSync(mojangRP, path.join(Deno.cwd(), "dist/Content/resource_packs", projectNamespace + "_rp"), {type: "dir"});
            }
        } catch (_error) {
            // Symlink already exists
        }
    }

    private static async createFiles(): Promise<void> {
        if (Config.Options.type === "skin-pack") {
            // TODO: Add skin pack files
            return;
        }

        await TemplateFile.write();
    }

    private static async installDependencies(): Promise<void> {
        if (Config.Options.scripting === "deno") {
            await new Deno.Command("deno", {args: ["install", ...this.dependencies]}).output();
        } else {
            await new Deno.Command("npm", {args: ["install", ...this.dependencies]}).output();
        }
    }
}