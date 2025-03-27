export interface WorkerResponse<T> {
    endpoint: string;
    response: T;
}

export class WorkerManager {
    private static server?: Deno.HttpServer<Deno.NetAddr>;
    private static responses: WorkerResponse<unknown>[] = [];
    private static options: unknown = {};

    private static startServer(): void {
        if (!this.server) {
            this.server = Deno.serve(
                {
                    port: 3000,
                    hostname: "localhost",
                    onListen: () => {},
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

        // TODO: Adjust this method to call an intermediate scrip that runs the imports, registering classes
        // and sending the request to the server only after the whole file is processed, and avoid sending the
        // request on constructor and re-sending it on modify
        const task = new Deno.Command("deno", {
            args: [
                "run",
                "--allow-read",
                "--allow-env",
                "--allow-net=localhost:3000",
                script
            ],
            stderr: "piped",
        }).spawn();

        const result = await task.output();

        if (!result.success) {
            throw new Error(`Failed to run ${script}: ${new TextDecoder().decode(result.stderr)}`);
        } else {
            return this.responses as WorkerResponse<T>[];
        }
    }
}

export interface WorkerWriteable<T, U> {
    generate(options: T): WorkerResponse<U>;
}

export class WorkerWriter {
    public static async broadcast<T, U>(worker: WorkerWriteable<T, U>): Promise<void> {
        const response = await fetch('http://localhost:3000', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });

        const options = (await response.json()).data;
        const data = worker.generate(options);

        fetch('http://localhost:3000', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }
}
