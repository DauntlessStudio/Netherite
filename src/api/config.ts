import { Config, type ConfigOptions } from "../core/config.ts";

export function config(options: ConfigOptions): void {
    Config.setOptions(options);
}