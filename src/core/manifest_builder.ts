import * as path from "jsr:@std/path";
import { Config } from "./classes/config.ts";

export function buildManifests(): void {
    if (Config.Options.projectType !== "skin-pack") {
        buildBehaviorManifest();
        buildResourceManifest();
    }
}

async function buildBehaviorManifest(): Promise<void> {
    const manifest: Record<string, unknown> = {
        format_version: 2,
        header: {
            name: "pack.name",
            description: "pack.description",
            uuid: await Config.getUUID("behavior"),
            pack_scope: "world",
            version: [1, 0, 0],
            min_engine_version: Config.Options.projectFormatVersion.split(".").map(Number),
        },
        modules: [
            {
                type: "data",
                uuid: await Config.getUUID("data"),
                version: [1, 0, 0],
            },
            {
                type: "script",
                language: "javascript",
                uuid: await Config.getUUID("script"),
                version: [1, 0, 0],
                entry: "scripts/main.js",
            }
        ],
        dependencies: [
            {
                uuid: await Config.getUUID("resource"),
                version: [1, 0, 0],
            },
            {
                module_name: "@minecraft/server",
                version: getVersionNumber("@minecraft/server"),
            },
            {
                module_name: "@minecraft/server-ui",
                version: getVersionNumber("@minecraft/server-ui"),
            },
        ],
    };

    if (Config.Options.projectType === "add-on") {
        manifest["metadata"] = {
            product_type: "addon"
        }
    }

    Deno.writeTextFileSync(path.join(Config.Paths.bp.root, "manifest.json"), JSON.stringify(manifest, null, "\t"));
}

async function buildResourceManifest(): Promise<void> {
    const manifest: Record<string, unknown> = {
        format_version: 2,
        header: {
            name: "pack.name",
            description: "pack.description",
            uuid: await Config.getUUID("resource"),
            pack_scope: "world",
            version: [1, 0, 0],
            min_engine_version: Config.Options.projectFormatVersion.split(".").map(Number),
        },
        modules: [
            {
                type: "data",
                uuid: await Config.getUUID("resources"),
                version: [1, 0, 0],
            },
        ],
        dependencies: [
            {
                uuid: await Config.getUUID("behavior"),
                version: [1, 0, 0],
            },
        ],
    };

    if (Config.Options.projectType === "add-on") {
        manifest["metadata"] = {
            product_type: "addon"
        }
    }

    Deno.writeTextFileSync(path.join(Config.Paths.rp.root, "manifest.json"), JSON.stringify(manifest, null, "\t"));
}

function getVersionNumber(module: string): string {
    try {
        const deno = JSON.parse(Deno.readTextFileSync(path.join(Deno.cwd(), "deno.json")));
        const value = deno.imports[module] as string|undefined;

        if (!value) throw new Error(`Could not find module ${module} in deno.json`);
        return value.split("@^")[1]; // TODO: handle beta versions correctly
    } catch (_error) {
        throw new Error(`Could not get version number for module ${module} as deno.json doesn't exist`);
    }
}