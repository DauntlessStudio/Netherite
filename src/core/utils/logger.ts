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
    private static spinnerResolve: (result: "success"| "failure") => void;
    
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
            Logger.spinnerResolve?.("success");
        },
        fail: function(text: string) {
            Logger.spinner.fail(text);
            Logger.spinnerResolve?.("failure");
        },
    });

    public static Colors = Colors;

    public static log(message: string, verbose?: boolean) {
        if (!Logger.Verbose && verbose) return;

        this.spinnerResult().then(() => console.log(message));
    }

    public static warn(message: string, verbose?: boolean) {
        if (!Logger.Verbose && verbose) return;

        this.spinnerResult().then(() => console.log(this.Colors.yellow(message)));
    }

    public static error(message: string, verbose?: boolean) {
        if (!Logger.Verbose && verbose) return;

        this.spinnerResult().then(() => console.log(this.Colors.red(message)));
    }

    private static spinnerResult(): Promise<"success" | "failure" | "inactive"> {
        return new Promise((resolve) => {
            if (!Logger.spinner?.isSpinning()) {
                resolve("inactive");
                return;
            }

            Logger.spinnerResolve = resolve;
        });
    }
}