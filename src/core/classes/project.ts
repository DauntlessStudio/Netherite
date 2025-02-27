import * as path from "jsr:@std/path";
import { TemplateFile } from "../../templates/index.ts";
import { emptyDirectorySync } from "../utils/index.ts";
import { Config, Sound, Texture, Script, Manifest, Language, Static, Module } from "./index.ts";

export type ProjectType = "world"|"add-on"|"skin-pack";

export interface ProjectBuilderOptions {
    name: string;
    author: string;
    namespace: string;
    formatVersion: string;
    type: ProjectType;
};

export class Project {
    private static readonly processDir: string = Deno.cwd();

    private static readonly dependencies: string[] = [
        "npm:@minecraft/server",
        "npm:@minecraft/server-ui",
    ];

    private static readonly directoryMap: Record<ProjectType, string[]> = {
        "world": [
            "src/modules",
            "src/marketing",
            "src/behavior_pack/scripts",
            "src/behavior_pack/texts",
            "src/resource_pack/texts",
            "dist/Content/world_template/behavior_packs",
            "dist/Content/world_template/resource_packs",
        ],
        "add-on": [
            "src/modules",
            "src/marketing",
            "src/behavior_pack/scripts",
            "src/behavior_pack/texts",
            "src/resource_pack/texts",
            "dist/Content/behavior_packs",
            "dist/Content/resource_packs",
        ],
        "skin-pack": [
            "src/skin_pack",
            "src/marketing",
            "dist/Content/skin_packs",
        ],
    };

    public static async init(options: ProjectBuilderOptions): Promise<void> {
        Config.setOptions({...options, uuid: crypto.randomUUID(), version: "1.0.0"});

        const projectDir = path.join(this.processDir, options.name);

        Deno.mkdirSync(projectDir, {recursive: true});
        Deno.chdir(projectDir);

        this.createDirectories();
        await this.createFiles();
        await this.installDependencies();

        await new Deno.Command("netherite", {args: ["build"]}).output();
    }

    public static async build(watch?: boolean): Promise<void> {
        await Config.ingestConfig();

        emptyDirectorySync(path.join(Deno.cwd(), Config.Paths.bp.root));
        emptyDirectorySync(path.join(Deno.cwd(), Config.Paths.rp.root));

        await Module.build(watch);
        Static.build(watch);
        Script.build(watch);
        Language.build();
        Sound.build();
        Texture.build();
        Manifest.build();
    }

    private static createDirectories(): void {
        this.directoryMap[Config.Options.type].forEach(dir => Deno.mkdirSync(path.join(Deno.cwd(), dir), {recursive: true}));

        if (Config.Options.type === "skin-pack") return;

        const projectNamespace = Config.Options.namespace;

        const mojangBP = path.join(Config.MojangDirectory, "development_behavior_packs", projectNamespace + "_bp");
        const mojangRP = path.join(Config.MojangDirectory, "development_resource_packs", projectNamespace + "_rp");

        Deno.mkdirSync(mojangBP, {recursive: true});
        Deno.mkdirSync(mojangRP, {recursive: true});

        if (Config.Options.type === "world") {
            Deno.symlinkSync(mojangBP, path.join(Deno.cwd(), "dist/Content/world_template/behavior_packs", projectNamespace + "_bp"), {type: "dir"});
            Deno.symlinkSync(mojangRP, path.join(Deno.cwd(), "dist/Content/world_template/resource_packs", projectNamespace + "_rp"), {type: "dir"});
        } else if (Config.Options.type === "add-on") {
            Deno.symlinkSync(mojangBP, path.join(Deno.cwd(), "dist/Content/behavior_packs", projectNamespace + "_bp"), {type: "dir"});
            Deno.symlinkSync(mojangRP, path.join(Deno.cwd(), "dist/Content/resource_packs", projectNamespace + "_rp"), {type: "dir"});
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
        await new Deno.Command("deno", {args: ["install", ...this.dependencies]}).output();
    }
}