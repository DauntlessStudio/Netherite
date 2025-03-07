export interface WorkerResponse<T> {
    endpoint: string;
    response: T;
}

export class WorkerManager {
    public static run<T>(script: string, options?: unknown): Promise<WorkerResponse<T>[]> {
        const id = crypto.randomUUID();

        const blob = new Blob([generateWorker.toString() + "generateWorker();"], { type: "application/typescript" });
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

function generateWorker(): void {
    const worker = self as unknown as Worker;

    worker.addEventListener("message", async (event) => {
        const data = event.data as { id: string, script: string, options: unknown };
        const {id, script, options} = data;

        const values: unknown[] = [];
        const blob = new Blob([Deno.readTextFileSync(script)], { type: "application/typescript" });

        const result = await import(URL.createObjectURL(blob));
        try {

            for (const value of Object.values(result)) {
                if (typeof value === "object" && value !== null && "generate" in value && typeof value.generate === "function") {
                    values.push(value.generate(options));
                } else {
                    console.warn("No generate function found in" + value);
                }
            }
            worker.postMessage({ id, result: true, contents: values });
        } catch (error) {
            worker.postMessage({ id, result: false, message: error });
        }
    });
}