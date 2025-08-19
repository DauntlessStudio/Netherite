import Kia from "@jonasschiano/kia";
// import { Colors } from "https://deno.land/x/kia@0.4.1/deps.ts";
// import { clearLine } from "https://deno.land/x/kia@0.4.1/util.ts";
import * as Colors from "@std/fmt/colors"

class Spinner extends Kia {
    override succeed(text?: string): this {
        return this.stopWithFlair(
			text,
			Colors.bold(
				Colors.green("√"),
			),
		);
    }
}

export class Logger {
    private static spinner: Spinner;
    private static isSpinning: boolean = false;
    private static cachedMessages: string[] = [];
    
    public static Verbose: boolean = false;

    public static Spinner = Object.freeze({
        start: function(text: string) {
            Logger.spinner = new Spinner(text).start();
            Logger.isSpinning = true;
        },
        update: function(text: string) {
            Logger.clearLine();
            Logger.spinner.set(text);
        },
        succeed: function(text: string) {
            Logger.spinner.succeed(text);
            Logger.isSpinning = false;
            Logger.logCachedMessages();
        },
        fail: function(text: string) {
            Logger.spinner.fail(text);
            Logger.isSpinning = false;
            Logger.logCachedMessages();
        },
    });

    public static Colors = Colors;

    public static log(message: string, verbose?: boolean) {
        if (!Logger.Verbose && verbose) return;

        const formattedMessage = `[${this.getCurrentTime()}] ${Colors.green("INFO")} ${message}`;

        if (Logger.isSpinning) {
            this.cachedMessages.push(formattedMessage);
        } else {
            console.log(formattedMessage);
        }
    }

    public static warn(message: string, verbose?: boolean) {
        if (!Logger.Verbose && verbose) return;

        const formattedMessage = `[${this.getCurrentTime()}] ${Colors.yellow("WARN")} ${message}`;

        if (Logger.isSpinning) {
            this.cachedMessages.push(formattedMessage);
        } else {
            console.log(formattedMessage);
        }
    }

    public static error(message: string, verbose?: boolean) {
        if (!Logger.Verbose && verbose) return;

        const formattedMessage = `[${this.getCurrentTime()}] ${Colors.red("ERROR")} ${message}`;

        if (Logger.isSpinning) {
            this.cachedMessages.push(formattedMessage);
        } else {
            console.log(formattedMessage);
        }
    }

    private static logCachedMessages(): void {
        for (const msg of this.cachedMessages) {
            console.log(msg);
        }

        this.cachedMessages.length = 0;
    }

    private static clearLine(): void {
        Deno.stdout.writeSync(new TextEncoder().encode("\x1b[" + "2K\r"));
    }

    private static getCurrentTime(): string {
        const now = new Date();
        const pad = (n: number) => n.toString().padStart(2, "0");
        return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }
}