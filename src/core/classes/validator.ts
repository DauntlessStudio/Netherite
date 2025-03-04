import { Logger } from "../utils/index.ts";
import { Config } from "./config.ts";
import { Project } from "./project.ts";

export class Validator {
    public static async validate(): Promise<{success: boolean, messages: string[]}> {
        const messages: string[] = [];

        await Project.build();

        let mcValid: boolean = false;

        try {
            await new Deno.Command("npm", {args: ["-v"]}).output();
            Logger.Spinner.start(`Validating Project with MC Creator Tools...`);

            await new Deno.Command("npm", {args: ["i", "-g", "@minecraft/creator-tools@latest"]}).output();

            // TODO: Look into sending the output to a temp file and parsing the CSV output
            const args = ["mct", "validate", "-i", "./dist/Content", "-show"];
            if (Config.Options.type === "add-on") args.splice(2, 0, "addon");
            const output = await new Deno.Command("npx", { args }).output();

            mcValid = output.success;
            messages.push(new TextDecoder().decode(output.stderr));

            Logger.Spinner.succeed("Finished MC Creator Tools Validation.");
        } catch (_error) {
            Logger.error("npm is not installed, skipping MC Creator Tools validation.");
            Logger.error("Please install npm and try again.");
            mcValid = true;
        }

        let tsValid: boolean = false;

        try {
            Deno.statSync("./src/behavior_pack/scripts/main.ts");
            Logger.Spinner.start("Validating TypeScript");

            const output = await new Deno.Command("deno", {args: ["check", "./src/behavior_pack/scripts/main.ts"]}).output();

            tsValid = output.success;
            if (!tsValid) messages.push(new TextDecoder().decode(output.stderr));

            Logger.Spinner.succeed("Finished TypeScript Validation.");
        } catch (_error) {
            Logger.error("main.ts does not exist, skipping TypeScript validation.");
            Logger.error("Please create a main.ts file in the scripts directory and try again.");
            tsValid = true;
        }

        return {
            success: mcValid && tsValid,
            messages
        };
    }
}