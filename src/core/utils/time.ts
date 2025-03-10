import { Logger } from "./index.ts";

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const abortController = new AbortController();
const signal = abortController.signal;

export async function abortOnKeypress(callbacks: (() => void)[]): Promise<void> {
    Logger.log("Press any key to exit...");
    Deno.stdin.setRaw(true);

    signal.addEventListener("abort", () => callbacks.forEach(callback => callback()), { once: true });

    try {
        const buf = new Uint8Array(1);
        await Deno.stdin.read(buf);
        abortController.abort();
    } finally {
        Deno.stdin.setRaw(false);
        Logger.log("Exiting...");
    }
}