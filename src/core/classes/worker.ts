// deno-lint-ignore-file no-explicit-any no-explicit-any
import { Logger } from "../core.ts";

export interface WorkerResponse<T> {
    endpoint: string;
    response: T;
}

export class WorkerManager {
    private static server?: Deno.HttpServer<Deno.NetAddr>;
    private static responses: WorkerResponse<unknown>[] = [];
    private static options: unknown = {};
    private static port: number = 0;

    private static startServer(): void {
        if (!this.server) {
            this.server = Deno.serve(
                {
                    port: 0,
                    hostname: "localhost",
                    onListen: ({port}) => {
                        this.port = port;
                        Logger.log(`Listening on port: ${this.port}`);
                    },
                },
                async (req: Request) => {
                    switch (req.method) {
                        case "POST": {
                            try {
                                const body = await req.json();
                                this.responses.push(body);
                                return new Response(JSON.stringify({ message: "Response stored successfully" }), { status: 200 });
                            } catch (_error) {
                                return new Response(JSON.stringify({ message: "Invalid request" }), { status: 400 });
                            }
                        }
                        case "GET": {
                            return new Response(JSON.stringify({message: "Requested Data", data: this.options}), { status: 200 });
                        }
                        default: {
                            return new Response(JSON.stringify({ message: "Method not allowed" }), { status: 405 });
                        }
                    }
                }
            );
        }
    }

    public static stopServer(): void {
        this.server?.shutdown();
    }
    
    public static async run<T>(script: string, options?: unknown): Promise<WorkerResponse<T>[]> {
        this.startServer();
        this.responses = [];
        this.options = options || {};

        const task = new Deno.Command("deno", {
            args: [
                "run",
                "--allow-read",
                "--allow-env",
                `--allow-net=localhost:${this.port}`,
                "-",
            ],
            stdin: "piped",
            stderr: "piped",
        }).spawn();

        const writer = task.stdin.getWriter();
        await writer.write(new TextEncoder().encode(WorkerWriter.toString().replaceAll("PORT", `${this.port}`) + `WorkerWriter.run("${script.replaceAll("\\", "/")}");`));
        await writer.ready;
        await writer.close();
        const result = await task.output();

        if (!result.success) {
            throw new Error(`Failed to run ${script}: ${new TextDecoder().decode(result.stderr)}`);
        } else {
            return this.responses as WorkerResponse<T>[];
        }
    }
}

if (!('workerRegistry' in self)) {
    (self as any).workerRegistry = {
        workers: [],
        register: function <T, U>(worker: WorkerWriteable<T, U>): void {
            this.workers.push(worker as WorkerWriteable<unknown, unknown>);
        }
    };
}

export interface WorkerWriteable<T, U> {
    generate(options: T): WorkerResponse<U>;
}

export class WorkerWriter {
    public static register<T, U>(worker: WorkerWriteable<T, U>): void {
        (self as any).workerRegistry.register(worker);
    }

    public static async broadcast(): Promise<void> {
        const registry = (self as any).workerRegistry;
        
        if (!registry || !registry.workers || !registry.workers.length) {
            // Do not interact with the server if there is nothing to do.
            return;
        };

        const workers = registry.workers as WorkerWriteable<unknown, unknown>[];

        for (const worker of workers) {
            const response = await fetch('http://localhost:PORT', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const options = (await response.json()).data;
            const data = worker.generate(options);
    
            await fetch('http://localhost:PORT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        }

        workers.length = 0; // Clear the registry after broadcasting
    }

    public static async run(script: string): Promise<void> {
        const url = new URL("file://" + script);
        await import(url.toString());
        await this.broadcast();
    }
}