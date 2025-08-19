import * as path from "@std/path";
import { deepMerge, JSONCParse, writeTextToDist } from "../utils/index.ts";
import { Config } from "./index.ts";
import type { ClientBlocks} from "../../api/api.ts";

export class Block {
    private static blocks: ClientBlocks = {};
    
    public static ingestBlockFiles(dirPath: string): void {
        try {
            Deno.statSync(dirPath);
        } catch (_error) {
            return;
        }

        for (const entry of Deno.readDirSync(dirPath)) {
            if (entry.name === "blocks.json") {
                const fileContent: ClientBlocks = JSONCParse(Deno.readTextFileSync(path.join(dirPath, entry.name)));
                this.blocks = deepMerge(this.blocks, fileContent);
            }
        }
    }
    
    public static build(): void {
        writeTextToDist(path.join(Config.Paths.rp.root, "blocks.json"), JSON.stringify(this.blocks, null, "\t"));
    }

    public static watch(filePath: string): void {
        if (filePath.endsWith("blocks.json")) {
            const fileContent: ClientBlocks = JSONCParse(Deno.readTextFileSync(filePath));
            this.blocks = deepMerge(this.blocks, fileContent);
        }

        this.build();
    }
}