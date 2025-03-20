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
        "--allow-net=localhost:3000",
        "jsr:@coldiron/netherite/cli"
    ],
    stdout: "inherit",
    stderr: "inherit",
}).outputSync();