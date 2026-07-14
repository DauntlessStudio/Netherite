import { Config, Logger } from "../../core/core.ts";
import { commandWrap } from "../../core/utils/error.ts";

export async function runCached(args: string[]): Promise<void> {
    try {
        await commandWrap(new Deno.Command("deno", {
            args: [
                "info",
                `jsr:@coldiron/netherite@${Config.LocalNetheriteVersion}/cli`,
            ]
        }));
    } catch (_error) {
        Logger.log(`Version ${Config.LocalNetheriteVersion} is not cached, attempting to download...`);
        
        try {
            await commandWrap(new Deno.Command("deno", {
                args: [
                    "cache",
                    `jsr:@coldiron/netherite@${Config.LocalNetheriteVersion}/cli`,
                ],
                stdout: "inherit",
            }));
        } catch (_error) {
            Logger.error(`Version ${Config.LocalNetheriteVersion} is not cached, and you appear to be offline.`);
            Deno.exit(1);
        }
    }

    new Deno.Command("deno", {
        args: [
            "run",
            "-A",
            "--cached-only",
            `jsr:@coldiron/netherite@${Config.LocalNetheriteVersion}/cli`,
            ...args
        ],
        stdout: "inherit",
        stderr: "inherit",
        stdin: "inherit",
    }).outputSync();
}