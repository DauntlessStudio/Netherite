import * as mod from "jsr:@std/collections/deep-merge";

export function deepMerge<Source extends object, Modifier extends object>(target: Source, source:Modifier): Source {
    return mod.deepMerge(target, source) as Source;
}