import "jsr:@std/dotenv/load";
import * as path from "jsr:@std/path";
import { Config } from "./config.ts";
import { templateFileMap } from "../../templates/index.ts";
import { replaceTextInFile } from "../utils/index.ts";
import { emptyDirectorySync } from "../utils/fileIO.ts";
import { Module } from "./module.ts";
import { Static } from "./static.ts";
import { Language } from "./language.ts";
import { Manifest } from "./manifest.ts";
import { Script } from "./script.ts";

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
        this.createFiles();
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
        } else {
            Deno.symlinkSync(mojangBP, path.join(Deno.cwd(), "dist/Content/behavior_packs", projectNamespace + "_bp"), {type: "dir"});
            Deno.symlinkSync(mojangRP, path.join(Deno.cwd(), "dist/Content/resource_packs", projectNamespace + "_rp"), {type: "dir"});
        }
    }

    private static createFiles(): void {
        if (Config.Options.type === "skin-pack") {
            // Add skin pack files
            return;
        }

        Object.entries(templateFileMap).forEach(([src, dest]) => {
            const filePath = Config.getTemplateFile(src);
            dest.forEach(d => {
                Deno.writeTextFileSync(
                    path.join(Deno.cwd(), d), Deno.readTextFileSync(filePath)
                    .replace(/\$PROJECTNAME\$/g, Config.Options.name)
                    .replace(/\$PROJECTAUTHOR\$/g, Config.Options.author)
                    .replace(/\$PROJECTNAMESPACE\$/g, Config.Options.namespace)
                    .replace(/\$PROJECTTYPE\$/g, Config.Options.type)
                    .replace(/\$PROJECTVERSION\$/g, Config.Options.version)
                    .replace(/\$FORMATVERSION\$/g, Config.Options.formatVersion)
                    .replace(/\$UUID\$/g, Config.Options.uuid)
                );
            });
        });
    }

    private static async installDependencies(): Promise<void> {
        await new Deno.Command("deno", {args: ["install", ...this.dependencies]}).output();

        if (Deno.env.get("LOCALAPI")) {
            replaceTextInFile(path.join(Deno.cwd(), "netherite.config.ts"), {
                "@coldiron/netherite": Deno.env.get("LOCALAPI") as string,
            });
        }
    }
}