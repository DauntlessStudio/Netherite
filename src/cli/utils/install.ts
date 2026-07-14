import { Config, Logger } from "../../core/core.ts";

export async function installNetherite(version: string = "latest", force?: boolean): Promise<void> {
    const spreadArgs: string[] = [];
    if (force) spreadArgs.push("--minimum-dependency-age=0");

    if (version.match(/\d\.\d\.\d?.+/)) {
        new Deno.Command("deno", {
            args: [
                "install",
                "-f",
                "-g",
                ...spreadArgs,
                "--compile",
                "--name", "netherite",
                "--allow-import",
                "--allow-read",
                "--allow-write",
                "--allow-run",
                "--allow-env",
                "--allow-net=localhost,jsr.io,raw.githubusercontent.com",
                `jsr:@coldiron/netherite@${version}/cli`
            ],
            stdout: "inherit",
            stderr: "inherit",
        }).outputSync();
    } else if (!version || ["stable", "latest"].includes(version)) {
        const latest = await Config.LatestNetheriteVersion;

        new Deno.Command("deno", {
            args: [
                "install",
                "-f",
                "-g",
                ...spreadArgs,
                "--compile",
                "--name", "netherite",
                "--allow-import",
                "--allow-read",
                "--allow-write",
                "--allow-run",
                "--allow-env",
                "--allow-net=localhost,jsr.io,raw.githubusercontent.com",
                `jsr:@coldiron/netherite@${latest}/cli`
            ],
            stdout: "inherit",
            stderr: "inherit",
        }).outputSync();
    } else {
        Logger.error(`[FATAL] Could not parse version: ${version}`);
        Deno.exit(1);
    }
}