import { Logger, sleep } from "./index.ts";

export async function attemptRepeater(func: () => unknown, attempts: number = 5): Promise<void> {
    let lastError: string = "";

    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            func();
            return;
        } catch (error) {
            lastError = (error instanceof Error) ? error.message : String(error);
            Logger.warn(`Failed ${attempt}/${attempts} times due to: ${lastError}`, true);
            await sleep(1000);
        }
    }

    Logger.error(`Failed due to: ${lastError}`);
}