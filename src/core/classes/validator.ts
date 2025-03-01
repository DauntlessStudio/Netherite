export class Validator {
    public static validate(): { success: boolean, messages: string[] } {
        const messages: string[] = [];

        let mcValid: boolean = false;

        try {
            new Deno.Command("npm", {args: ["-v"]}).outputSync();

            console.log("Updated MC Creator Tools");
            new Deno.Command("npm", {args: ["i", "-g", "@minecraft/creator-tools@latest"]}).outputSync();

            console.log("Validating With MC Creator Tools");
            const output = new Deno.Command("npx", {
                args: ["mct", "validate", "-i", "./dist/Content", "-show"]
            }).outputSync();

            mcValid = output.success;
            messages.push(new TextDecoder().decode(output.stderr));
        } catch (_error) {
            console.error("npm is not installed, skipping MC Creator Tools validation.");
            console.error("Please install npm and try again.");
            mcValid = true;
        }

        let tsValid: boolean = false;

        try {
            Deno.statSync("./src/behavior_pack/scripts/main.ts");

            console.log("Checking TypeScript");
            const output = new Deno.Command("deno", {
                args: ["check", "./src/behavior_pack/scripts/main.ts"]
            }).outputSync();

            tsValid = output.success;
            messages.push(new TextDecoder().decode(output.stderr));
        } catch (_error) {
            console.error("main.ts does not exist, skipping TypeScript validation.");
            console.error("Please create a main.ts file in the scripts directory and try again.");
            tsValid = true;
        }

        return {
            success: mcValid && tsValid,
            messages
        };
    }
}