// deno-lint-ignore-file no-explicit-any no-explicit-any
export interface WriteableResponse<T> {
    endpoint: string;
    response: T;
}

/**
 * Manages the long-running daemon for importing `*.mod.ts` files.
 */
export class ModuleManager {
    private static daemon?: Deno.ChildProcess;
    private static port: number = 0;

    /**
     * Spawns the daemon process with the ability to read and write output via stdin and stdout.
     */
    private static startup(): void {
        if (this.daemon) return;

        Deno.serve({hostname: "localhost", port: 0, onListen: ({port}) => {this.port = port}}, () => new Response()).shutdown();

        const task = new Deno.Command("deno", {
            args: [
                "run",
                "--config",
                "deno.json",
                "--allow-read",
                "--allow-env",
                `--allow-net=localhost:${this.port}`,
                this.getEncodedScript(),
            ],
            stdin: "piped",
            stdout: "inherit",
            stderr: "inherit",
        }).spawn();

        this.daemon = task;
    }

    /**
     * Shuts down the daemon and cleans up.
     */
    public static shutdown(): void {
        this.daemon?.kill();
        this.daemon = undefined;
    }
    
    /**
     * Runs a modular file.
     * @param script The full path to the `*.mod.ts` or `netherite.config.ts` file.
     * @param options The project's options that are passed to the writeable objects.
     * @returns An array of objects created by any writeable objects in the `.ts` file.
     */
    public static async run<T>(script: string, options?: unknown): Promise<WriteableResponse<T>[]> {
        this.startup();

        if (!this.daemon) throw new Error(`Failed to spawn Daemon before processing "${script}"`);

        script = script.replaceAll("\\", "/");

        const response = await fetch(`http://localhost:${this.port}`, {
            method: "POST",
            body: JSON.stringify({script, options}),
        });

        switch (response.status) {
            case 200:
                return await response.json();        
            default:
                throw (await response.json()).message;
        }
    }

    /**
     * Gets the encoded worker writer to run in the Daemon.
     * @returns The base64 encoded worker.
     */
    private static getEncodedScript(): string {
        return "data:application/typescript;base64," + btoa(`
            self.writeables = [];
            ${ModuleWriter.toString().replaceAll("PORT", String(this.port))}
            ModuleWriter.start();
        `);
    }
}

export interface WriteableModule<T, U> {
    generate(options: T): WriteableResponse<U>;
}

/**
 * The class spawned by the Daemon.
 * The Daemon instance then executes the `ts` files that register their writeable objects to this worker.
 */
export class ModuleWriter {
    // Pins writeables array to globalthis object so it can be accessed by all modules
    private static writeables: WriteableModule<unknown, unknown>[] = (self as any).writeables;
    private static server?: Deno.HttpServer<Deno.NetAddr>;

    /**
     * Register a Writeable Module to the Writer.
     * @param writeable The object implementing {@link WriteableModule} that provides output to the Daemon.
     */
    public static register<T, U>(writeable: WriteableModule<T, U>): void {
        this.writeables.push(writeable);
    }

    private static async run(data: { script: string, options: unknown }): Promise<WriteableResponse<unknown>[]> {
        const url = new URL("file://" + data.script + `?t=${Date.now()}`);
        await import(url.toString());

        const responses: WriteableResponse<unknown>[] = [];

        for (const worker of this.writeables) {
            responses.push(worker.generate(data.options));
        }

        this.writeables.length = 0; // Clear the registry before next run
        return responses;
    }

    protected static start(): void {
        if (!this.server) {
            this.server = Deno.serve(
                {
                    port: Number("PORT"),
                    hostname: "localhost",
                    onListen: () => {}, // Suppress startup message
                },
                async (req: Request) => {
                    switch (req.method) {
                        case "POST": {
                            const data = await req.json();
                            if (!data.script) return new Response(JSON.stringify({ message: "Malformed request" }), { status: 400 });

                            try {
                                return new Response(JSON.stringify(await this.run(data)), { status: 200 });
                            } catch (error) {
                                return new Response(JSON.stringify({ message: String(error) }), { status: 500 });
                            }
                        }
                        default: {
                            return new Response(JSON.stringify({ message: "Method not allowed" }), { status: 405 });
                        }
                    }
                }
            );
        }
    }
}