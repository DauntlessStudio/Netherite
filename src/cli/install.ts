import { Config } from "../core/classes/index.ts";

const arg = Deno.args[0];

if (arg === "beta") {
    const beta = await Config.BetaNetheriteVersion;

    new Deno.Command("deno", {
        args: [
            "install",
            "-f",
            "-g",
            "--name", "netherite",
            "--allow-import",
            "--allow-read",
            "--allow-write",
            "--allow-run",
            "--allow-env",
            "--allow-net=localhost:0,jsr.io",
            `jsr:@coldiron/netherite@${beta}/cli`
        ],
        stdout: "inherit",
        stderr: "inherit",
    }).outputSync();
} else if (!arg || ["stable", "latest"].includes(arg)) {
    const latest = await Config.LatestNetheriteVersion;

    new Deno.Command("deno", {
        args: [
            "install",
            "-f",
            "-g",
            "--name", "netherite",
            "--allow-import",
            "--allow-read",
            "--allow-write",
            "--allow-run",
            "--allow-env",
            "--allow-net=localhost:0,jsr.io",
            `jsr:@coldiron/netherite@${latest}/cli`
        ],
        stdout: "inherit",
        stderr: "inherit",
    }).outputSync();
}