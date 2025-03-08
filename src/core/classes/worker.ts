// deno-lint-ignore-file no-explicit-any
export interface WorkerResponse<T> {
    endpoint: string;
    response: T;
}

export class WorkerManager {
    public static run<T>(script: string, options?: unknown): Promise<WorkerResponse<T>[]> {
        const id = crypto.randomUUID();

        const blob = new Blob([WorkerWriter.toString() + "WorkerWriter.generateWorker();"], { type: "application/typescript" });
        const worker = new Worker(URL.createObjectURL(blob), {
            type: "module",
            deno: {
                permissions: {
                    env: true,
                    ffi: false,
                    import: true,
                    net: false,
                    read: true,
                    run: false,
                    write: false,
                    sys: false,
                }
            }
        });

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                worker.terminate();
                reject(new Error(`Worker timed out for ${script}`));
            }, 10000);

            worker.addEventListener("message", (event) => {
                const data = event.data as { id: string, result: boolean, message?: string, contents?: WorkerResponse<T>[] };

                if (data.id === id) {
                    clearTimeout(timeout);
                    worker.terminate();

                    if (data.result && data.contents) {
                        resolve(data.contents);
                    } else {
                        reject(data.message);
                    }
                }
            });

            worker.postMessage({ id, script, options });
        });
    }
}

declare global {
    interface WorkerGlobalScope {
        workerRegistry: {
            workers: WorkerWriteable<unknown, unknown>[];
            register: <T, U>(worker: WorkerWriteable<T, U>) => void;
        };
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

    public static write(options: unknown): WorkerResponse<unknown>[] {
        const responses: WorkerResponse<unknown>[] = [];
        const registry = (self as any).workerRegistry;

        for (const worker of registry.workers)
        {
            responses.push(worker.generate(options));
        }

        return responses;
    }

    public static generateWorker(): void {
        const worker = self as unknown as Worker;

        worker.addEventListener("message", async (event) => {
            const data = event.data as { id: string, script: string, options: unknown };
            const { id, script, options } = data;

            const blob = new Blob([Deno.readTextFileSync(script)], { type: "application/typescript" });

            try
            {
                await import(URL.createObjectURL(blob));

                worker.postMessage({ id, result: true, contents: this.write(options) });
            } catch (error)
            {
                worker.postMessage({ id, result: false, message: error });
            }
        });
    }
}
