import type { Molang } from "./molang.ts";

/**
 * @remarks This method is required due to Minecraft failing to treat `1` and `1.0` the same when parsing JSON.
 * @param value The float value.
 * @returns A float serializable value.
 */
export function Float(value: Float): Float {
    if (typeof value === "number" && Number.isInteger(value)) {
        return `__FLOAT__${value}.0`;
    }

    return value;
}

export type Float = `__FLOAT__${number}.0`|number|Molang;