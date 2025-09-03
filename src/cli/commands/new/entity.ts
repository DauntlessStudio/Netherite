import { Command, type CommandData } from "../../command.ts";
import { Language } from "../../../core/core.ts";
import { minecraftWriteableToSource, writeImage } from "../../utils/write.ts";
import { MinecraftClientEntity, MinecraftClientGeometry, MinecraftServerEntity } from "../../../api/api.ts";

// TODO: Add type for hostile, dummy, passive, etc.

interface EntityCommandData extends CommandData {
    options: {
        lang?: boolean;
        overwrite?: boolean;
    }
}

export default new Command<EntityCommandData>({
    name: "entity",
    usage: {
        description: "Creates a new entity in the current project",
        usage: "[--no-lang --overwrite] ...entity_names",
        flags: {
            "lang": {
                type: "boolean",
                description: "Should a lang entry based on the entity name be added?",
                optional: true,
            },
            "overwrite": {
                type: "boolean",
                description: "Should existing source files be overwritten?",
                optional: true,
            },
        },
    },
    parse: {
        boolean: ["overwrite",],
        alias: {
            overwrite: "o",
        },
        negatable: [
            "lang"
        ],
    },
    validateArgs(_args) {
        if (_args.options.overwrite !== undefined && typeof _args.options.overwrite !== "boolean") throw new Error("overwrite must be a boolean");
        if (_args.options.lang !== undefined && typeof _args.options.lang !== "boolean") throw new Error("lang must be a boolean");
        if (_args.arguments.length <= 0) throw new Error("requires item names as arguments");
        if (!_args.arguments.every(t => typeof t === "string")) throw new Error("all item names must be valid strings");

        return true;
    },
    action(_args) {
        if (_args.options.lang !== false) {;
            Language.ingestLangFiles("./src/resource_pack/texts/");
        }

        for (const name of _args.arguments) {
            const server = MinecraftServerEntity.dummy((name as string));
            minecraftWriteableToSource(server, _args.options);

            const client = MinecraftClientEntity.dummy((name as string));
            minecraftWriteableToSource(client, _args.options);

            const geo = MinecraftClientGeometry.cube((name as string), "entity");
            minecraftWriteableToSource(geo, _args.options);

            writeImage(`PATH/entity/${name}/default`, "uv_medium_texture.png", _args.options);
        }
        
        if (_args.options.lang !== false) {
            Language.buildSource();
        }
    },
});