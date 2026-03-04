// deno-lint-ignore-file no-explicit-any no-explicit-any
export interface ModuleResponse<T> {
    endpoint: string;
    response: T;
}

interface Daemon {
    task: Deno.ChildProcess;
    writer: WritableStreamDefaultWriter<Uint8Array>;
    reader: ReadableStreamDefaultReader<string>;
}

/**
 * Manages the long-running daemon for importing `*.mod.ts` files.
 */
export class ModuleManager {
    private static daemon?: Daemon;

    /**
     * Spawns the daemon process with the ability to read and write output via stdin and stdout.
     */
    private static startup(): void {
        if (this.daemon) return;

        const task = new Deno.Command("deno", {
            args: [
                "run",
                "--config",
                "deno.json",
                "--allow-read",
                "--allow-env",
                this.getEncodedScript(),
            ],
            stdin: "piped",
            stdout: "piped",
            stderr: "inherit",
        }).spawn();

        const writer = task.stdin.getWriter();
        const reader = task.stdout.pipeThrough(new TextDecoderStream()).getReader();

        this.daemon = { task, writer, reader };
    }

    /**
     * Shuts down the daemon and cleans up.
     */
    public static shutdown(): void {
        this.daemon?.task?.kill();
        this.daemon = undefined;
    }
    
    /**
     * Runs a modular file.
     * @param script The full path to the `*.mod.ts` or `netherite.config.ts` file.
     * @param options The project's options that are passed to the writeable objects.
     * @returns An array of objects created by any writeable objects in the `.ts` file.
     */
    public static async run<T>(script: string, options?: unknown): Promise<ModuleResponse<T>[]> {
        this.startup();

        if (!this.daemon) throw new Error(`Failed to spawn Daemon before processing "${script}"`);

        script = script.replaceAll("\\", "/");
        await this.daemon.writer.write(new TextEncoder().encode(JSON.stringify({script, options})));

        const {value} = await this.daemon.reader.read();
        if (!value) return [];

        try {
            const response = JSON.parse(value) as ModuleResponse<T>[];
            return response;
        } catch (_error) {
            throw value.replace(/\?t=\d+/g, "");
        }
    }

    /**
     * Gets the encoded worker writer to run in the Daemon.
     * @returns The base64 encoded worker.
     */
    private static getEncodedScript(): string {
        return "data:application/typescript;base64," + btoa(`
            self.writeables = [];
            ${ModuleWriter.toString()}
            ModuleWriter.start();
        `);
    }
}

export interface WriteableModule<T, U> {
    generate(options: T): ModuleResponse<U>;
}

/**
 * The class spawned by the Daemon.
 * The Daemon instance then executes the `ts` files that register their writeable objects to this worker.
 */
export class ModuleWriter {
    // Pins writeables array to globalthis object so it can be accessed by all modules
    private static writeables: WriteableModule<unknown, unknown>[] = (self as any).writeables;

    /**
     * Register a Writeable Module to the Writer.
     * @param writeable The object implementing {@link WriteableModule} that provides output to the Daemon.
     */
    public static register<T, U>(writeable: WriteableModule<T, U>): void {
        this.writeables.push(writeable);
    }

    private static broadcast(options: unknown): void {
        if (!this.writeables.length) {
            // Do not interact with the server if there is nothing to do.
            return;
        };

        const responses: ModuleResponse<unknown>[] = [];

        for (const worker of this.writeables) {
            responses.push(worker.generate(options));
        }
        
        Deno.stdout.write(new TextEncoder().encode(JSON.stringify(responses)));
        this.writeables.length = 0; // Clear the registry after broadcasting
    }

    private static async run(data: {script: string, options: unknown}): Promise<void> {
        try {
            const url = new URL("file://" + data.script + `?t=${Date.now()}`);
            await import(url.toString());
            this.broadcast(data.options);
        } catch (error) {
            Deno.stdout.write(new TextEncoder().encode(String(error)));
        }
    }

    protected static async start(): Promise<void> {
        const decoder = new TextDecoder();

        for await (const chunk of Deno.stdin.readable) {
            const value = decoder.decode(chunk).trim();
            if (!value) continue;

            this.run(JSON.parse(value));
        }
    }
}