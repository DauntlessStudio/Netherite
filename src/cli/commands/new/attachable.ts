import { MinecraftServerItem } from "../../../api/api.ts";
import { Command, type CommandData } from "../../command.ts";
import { Language } from "../../../core/core.ts";
import { minecraftWriteableToSource, writeImage } from "../../utils/write.ts";
import { MinecraftClientAttachable, MinecraftClientGeometry, MinecraftClientAnimation, MinecraftClientAnimationController } from "../../../api/classes/index.ts";

type AttachmentType = "skeletal"; // TODO: Add parented here which creates a simple attachable anchored to the player's hand

interface AttachableCommandData extends CommandData {
    options: {
        lang?: boolean;
        stack?: number;
        cooldown?: number;
        type?: AttachmentType;
        overwrite?: boolean;
    }
}

export default new Command<AttachableCommandData>({
    name: "attachable",
    usage: {
        description: "Creates a new attachable in the current project",
        usage: "[--no-lang --type <attachment_type> --overwrite] ...item_names",
        flags: {
            "lang": {
                type: "boolean",
                description: "Should a lang entry based on the item name be added?",
                optional: true,
            },
            "stack": {
                type: "number",
                description: "The stack size of the item",
                optional: true,
            },
            "cooldown": {
                type: "number",
                description: "The duration of the cooldown in ticks",
                optional: true,
            },
            "type": {
                type: "string",
                description: `The attachment type, valid options are ["skeletal"]. Default is "skeletal"`,
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
        string: ["stack", "cooldown", "type"],
        alias: {
            stack: "s",
            cooldown: "c",
            type: "t",
            overwrite: "o",
        },
        negatable: [
            "lang",
        ],
    },
    validateArgs(_args) {
        if (_args.options.stack) _args.options.stack = Number(_args.options.stack);
        if (_args.options.cooldown) _args.options.cooldown = Number(_args.options.cooldown);
        if (Number.isNaN(_args.options.stack)) throw new Error("stack must be a valid number");
        if (Number.isNaN(_args.options.cooldown)) throw new Error("cooldown must be a valid number");
        if (_args.options.overwrite !== undefined && typeof _args.options.overwrite !== "boolean") throw new Error("overwrite must be a boolean");
        if (_args.options.lang !== undefined && typeof _args.options.lang !== "boolean") throw new Error("lang must be a boolean");
        if (_args.options.type !== undefined && !["skeletal"].includes(_args.options.type)) throw new Error(`piece must be one of ${["skeletal"].join(", ")}`)
        if (_args.arguments.length <= 0) throw new Error("requires item names as arguments");
        if (!_args.arguments.every(t => typeof t === "string")) throw new Error("all item names must be valid strings");

        return true;
    },
    action(_args) {
        if (_args.options.lang !== false) {;
            Language.ingestLangFiles("./src/resource_pack/texts/");
        }

        for (const name of _args.arguments) {
            const item = MinecraftServerItem.attachable((name as string), _args.options.stack, _args.options.cooldown);
            minecraftWriteableToSource(item, _args.options);
            writeImage(`PATH/items/${name}`, "image_x16.png", {..._args.options, addToItem: true});

            const attachable = MinecraftClientAttachable.skeletal((name as string));
            minecraftWriteableToSource(attachable, _args.options);

            const geo = MinecraftClientGeometry.skeletalAttachable((name as string));
            minecraftWriteableToSource(geo, _args.options);
            writeImage(`PATH/attachables/${name}`, "uv_medium_texture.png", _args.options);

            const anim = MinecraftClientAnimation.skeletalAttachable((name as string));
            minecraftWriteableToSource(anim, _args.options);

            const controller = MinecraftClientAnimationController.skeletalAttachable((name as string));
            minecraftWriteableToSource(controller, _args.options);
        }
        
        if (_args.options.lang !== false) {
            Language.buildSource();
        }
    },
});