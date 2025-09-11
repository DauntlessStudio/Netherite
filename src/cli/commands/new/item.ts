import { MinecraftServerItem } from "../../../api/api.ts";
import { Command, type CommandData } from "../../command.ts";
import { Language } from "../../../core/core.ts";
import { minecraftWriteableToSource, writeImage } from "../../utils/write.ts";

interface ItemCommandData extends CommandData {
    options: {
        lang?: boolean;
        stack?: number;
        cooldown?: number;
        overwrite?: boolean;
    }
}

export default new Command<ItemCommandData>({
    name: "item",
    usage: {
        description: "Creates a new item in the current project",
        usage: "[--no-lang --stack <stack_size> --cooldown <cooldown_ticks> --overwrite] ...item_names",
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
            "overwrite": {
                type: "boolean",
                description: "Should existing source files be overwritten?",
                optional: true,
            },
        },
    },
    parse: {
        boolean: ["overwrite",],
        string: ["stack", "cooldown",],
        alias: {
            stack: "s",
            cooldown: "c",
            overwrite: "o",
        },
        negatable: [
            "lang"
        ],
    },
    validateArgs(_args) {
        if (_args.options.stack) _args.options.stack = Number(_args.options.stack);
        if (_args.options.cooldown) _args.options.cooldown = Number(_args.options.cooldown);
        if (Number.isNaN(_args.options.stack)) throw new Error("stack must be a valid number");
        if (Number.isNaN(_args.options.cooldown)) throw new Error("cooldown must be a valid number");
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
            const writeable = MinecraftServerItem.dummy((name as string), _args.options.stack, _args.options.cooldown);
            minecraftWriteableToSource(writeable, {overwrite: _args.options.overwrite});
            writeImage(`PATH/items/${name}`, "image_x16.png", {..._args.options, addToItem: true});
        }
        
        if (_args.options.lang !== false) {
            Language.buildSource();
        }
    },
});