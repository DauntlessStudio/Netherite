import Kia from "https://deno.land/x/kia@0.4.1/mod.ts";
import { Colors } from "https://deno.land/x/kia@0.4.1/deps.ts";

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

type LogType = "info" | "warn" | "error";

export class Logger {
    private static spinner: Spinner;
    
    public static Verbose: boolean = false;

    public static Spinner = Object.freeze({
        start: function(text: string) {
            Logger.spinner = new Spinner(text).start();
        },
        update: function(text: string) {
            Logger.spinner.set(text);
        },
        succeed: function(text: string) {
            Logger.spinner.succeed(text);
        },
        fail: function(text: string) {
            Logger.spinner.fail(text);
        },
    });

    public static Colors = Colors;

    public static log(type: LogType, message: string, verbose?: boolean) {
        if (!Logger.Verbose && verbose) return;

        switch (type) {
            case "info":
                console.log(message);
                break;
            case "warn":
                console.warn(this.Colors.yellow(message));
                break;
            case "error":
                console.error(this.Colors.red(message));
                break;
        }
    }
}