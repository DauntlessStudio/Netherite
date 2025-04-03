/**
 * This file is not part of the exported Netherite project, it is a utility file to get the encoded values of the non-typescript files in the templates directory.
 * It is used to encode the files in the templates directory into base64 strings and export them as a JSON object.
 * The exported object is in `src/templates/encoded.ts`.
 * The encoded values are used in the `TemplateFile` class to create the files in the output directory.
 */
import * as path from "@std/path";
import { Buffer } from "node:buffer";

const encodeMap: Record<string, string> = {};

function processDirectory(dir: string): void {
    for (const entry of Deno.readDirSync(dir)) {
        const entryPath = path.join(dir, entry.name);
        if (entry.isDirectory) {
            processDirectory(entryPath);
        } else if (entry.isFile && !entry.name.endsWith(".ts")) {
            const fileContent = Deno.readFileSync(entryPath);
            const encodedContent = Buffer.from(fileContent).toString("base64");
            encodeMap[entry.name] = encodedContent;
        }
    }
}

processDirectory(path.join(Deno.cwd(), "src", "templates"));
Deno.writeTextFileSync(path.join(Deno.cwd(), "src", "templates", "encoded.ts"), "export default " + JSON.stringify(encodeMap, null, "\t"));