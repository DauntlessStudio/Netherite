import Kia from "https://deno.land/x/kia@0.4.1/mod.ts";
import { Colors } from "https://deno.land/x/kia@0.4.1/deps.ts";
import { clearLine } from "https://deno.land/x/kia@0.4.1/util.ts";

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
    
    public static Verbose: boolean = false;

    public static Spinner = Object.freeze({
        start: function(text: string) {
            Logger.spinner = new Spinner(text).start();
        },
        update: function(text: string) {
            clearLine(Deno.stdout, new TextEncoder());
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

    public static log(message: string, verbose?: boolean) {
        if (!Logger.Verbose && verbose) return;

        console.log(message);
    }

    public static warn(message: string, verbose?: boolean) {
        if (!Logger.Verbose && verbose) return;

        console.warn(this.Colors.yellow(message));
    }

    public static error(message: string, verbose?: boolean) {
        if (!Logger.Verbose && verbose) return;

        console.error(this.Colors.red(message));
    }
}