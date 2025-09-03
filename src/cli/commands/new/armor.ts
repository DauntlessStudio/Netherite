import { MinecraftServerItem } from "../../../api/api.ts";
import { Command, type CommandData } from "../../command.ts";
import { Language } from "../../../core/core.ts";
import { minecraftWriteableToSource, writeImage } from "../../utils/write.ts";
import { MinecraftClientGeometry } from "../../../api/classes/client_geometry.ts";
import { MinecraftClientAttachable } from "../../../api/classes/index.ts";

type ArmorPiece = "helmet"|"chestplate"|"leggings"|"boots";

interface ArmorCommandData extends CommandData {
    options: {
        lang?: boolean;
        protection?: number;
        piece?: ArmorPiece;
        overwrite?: boolean;
        suffix?: boolean;
    }
}

const ArmorTypeMap: Record<ArmorPiece, string> = {
    boots: "slot.armor.feet",
    leggings: "slot.armor.legs",
    chestplate: "slot.armor.chest",
    helmet: "slot.armor.head",
};

export default new Command<ArmorCommandData>({
    name: "armor",
    usage: {
        description: "Creates a new armor set in the current project",
        usage: "[--no-lang --no-suffix --piece <armor_piece> --protection <protection_level> --overwrite] ...item_names",
        flags: {
            "lang": {
                type: "boolean",
                description: "Should a lang entry based on the item name be added?",
                optional: true,
            },
            "suffix": {
                type: "boolean",
                description: "Should the piece type be addes as a suffix (i.e. should `diamond` become `diamond_chestplate`)?",
                optional: true,
            },
            "piece": {
                type: "string",
                description: `The piece of armor, valid options are ${Object.keys(ArmorTypeMap).join(", ")}. If omitted, all pieces will be added`,
                optional: true,
            },
            "protection": {
                type: "number",
                description: "The protection level the armor piece, or the total of all pieces if --piece was omitted",
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
        boolean: ["overwrite"],
        string: ["protection", "cooldown", "piece"],
        alias: {
            protection: "p",
            cooldown: "c",
            overwrite: "o",
        },
        negatable: [
            "lang",
            "suffix",
        ],
    },
    validateArgs(_args) {
        if (_args.options.protection !== undefined && typeof _args.options.protection !== "number") _args.options.protection = Number(_args.options.protection);
        
        if (Number.isNaN(_args.options.protection)) throw new Error("protection must be a valid number");
        if (_args.options.overwrite !== undefined && typeof _args.options.overwrite !== "boolean") throw new Error("overwrite must be a boolean");
        if (_args.options.lang !== undefined && typeof _args.options.lang !== "boolean") throw new Error("lang must be a boolean");
        if (_args.options.suffix !== undefined && typeof _args.options.suffix !== "boolean") throw new Error("suffix must be a boolean");
        if (_args.options.piece !== undefined && !Object.keys(ArmorTypeMap).includes(_args.options.piece)) throw new Error(`piece must be one of ${Object.keys(ArmorTypeMap).join(", ")}`)
        if (_args.arguments.length <= 0) throw new Error("requires item names as arguments");
        if (!_args.arguments.every(t => typeof t === "string")) throw new Error("all item names must be valid strings");

        return true;
    },
    action(_args) {
        if (_args.options.lang !== false) {;
            Language.ingestLangFiles("./src/resource_pack/texts/");
        }

        const pieces: string[] = _args.options.piece ? [_args.options.piece] : Object.keys(ArmorTypeMap);
        const protection = _args.options.piece ? _args.options.protection : Math.floor((_args.options.protection ?? 0) / 4);

        for (const name of _args.arguments) {
            for (const piece of pieces) {
                const useName = _args.options.suffix === false ? String(name) : `${name}_${piece}`;

                const item = MinecraftServerItem.armor(useName, ArmorTypeMap[piece as ArmorPiece], protection);
                minecraftWriteableToSource(item, {overwrite: _args.options.overwrite});
                writeImage(`PATH/items/${useName}`, "image_x16.png", {..._args.options, addToItem: true});

                const attachable = MinecraftClientAttachable.armor(useName, piece);
                minecraftWriteableToSource(attachable, _args.options);
            }

            const geo = MinecraftClientGeometry.armor((name as string));
            minecraftWriteableToSource(geo, {overwrite: _args.options.overwrite});
            writeImage(`PATH/attachables/${name}`, "armor_uv_texture.png", _args.options);
        }
        
        if (_args.options.lang !== false) {
            Language.buildSource();
        }
    },
});