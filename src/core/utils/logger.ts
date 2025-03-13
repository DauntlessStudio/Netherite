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
    private static spinnerResolve: (result: "success"| "failure") => void;
    
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
            Logger.spinnerResolve?.("success");
            Logger.isSpinning = false;
        },
        fail: function(text: string) {
            Logger.spinner.fail(text);
            Logger.spinnerResolve?.("failure");
            Logger.isSpinning = false;
        },
    });

    public static Colors = Colors;

    public static log(message: string, verbose?: boolean) {
        if (!Logger.Verbose && verbose) return;

        if (Logger.isSpinning) {
            this.spinnerResult().then(() => console.log(message));
        } else {
            console.log(message);
        }
    }

    public static warn(message: string, verbose?: boolean) {
        if (!Logger.Verbose && verbose) return;

        if (Logger.isSpinning) {
            this.spinnerResult().then(() => console.log(this.Colors.yellow(message)));
        } else {
            console.log(this.Colors.yellow(message));
        }
    }

    public static error(message: string, verbose?: boolean) {
        if (!Logger.Verbose && verbose) return;

        if (Logger.isSpinning) {
            this.spinnerResult().then(() => console.log(this.Colors.red(message)));
        } else {
            console.log(this.Colors.red(message));
        }
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

    private static clearLine(): void {
        Deno.stdout.writeSync(new TextEncoder().encode("\x1b[" + "2K\r"));
    }
}