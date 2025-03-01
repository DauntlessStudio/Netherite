import { Config, type ConfigOptions } from "../core/classes/config.ts";

export function config(options: ConfigOptions): void {
    Config.setOptions(options);
}