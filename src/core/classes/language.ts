import * as path from "jsr:@std/path";
import { formatText } from "../utils/text.ts";
import { writeTextToDist } from "../utils/fileIO.ts";
import { Config } from "./config.ts";

export type LangType = "en_US" | "en_GB" | "de_DE" | "es_ES" | "es_MX" | "fr_FR" | "fr_CA" | "it_IT" | "ja_JP" | "ko_KR" | "pt_BR" | "pt_PT" | "ru_RU" | "zh_CN" | "zh_TW" | "nl_NL" | "bg_BG" | "cs_CZ" | "da_DK" | "el_GR" | "fi_FI" | "hu_HU" | "id_ID" | "nb_NO" | "pl_PL" | "sk_SK" | "sv_SE" | "tr_TR" | "uk_UA";

export class Language {
    /**
     * A map structured as Langauge/Category/Key/Value
     */
    private static readonly langMap: Map<LangType, Map<string, Map<string, string>>> = new Map<LangType, Map<string, Map<string, string>>>();

    public static addLangEntry(lang: LangType, category: string, key: string, value: string): void {
        category = category.toLowerCase().trim();
        key = key.toLocaleLowerCase().trim();
        value = value.trim();

        if (!this.langMap.has(lang)) {
            this.langMap.set(lang, new Map<string, Map<string, string>>());
        }

        const langMap = this.langMap.get(lang)!;
        if (!langMap.has(category)) {
            langMap.set(category, new Map<string, string>());
        }

        langMap.get(category)!.set(key, value);
    }

    public static addPlaceholderEntry(category: string, key: string, value: string): void {
        category = category.toLowerCase().trim();
        key = key.toLocaleLowerCase().trim();
        value = formatText(value, [/_/g]);

        for (const lang of this.langMap.keys()) {
            this.addLangEntry(lang, category, key, value);
        }
    }

    public static ingestLangFiles(dirPath: string): void {
        try {
            Deno.statSync(dirPath);
        } catch (_error) {
            return;
        }

        for (const entry of Deno.readDirSync(dirPath)) {
            this.ingestFile(path.join(dirPath, entry.name));
        }
    }

    private static ingestFile(filePath: string): void {
        if (!filePath.endsWith(".lang")) return;

        const langKey = path.basename(filePath).replace(".lang", "") as LangType;

        const fileContent = Deno.readTextFileSync(filePath);

        const categoryGroups = fileContent.split(/(?=(#+ .+ =+))/g);

        for (const category of categoryGroups) {
            const lines = category.split("\n").map(line => line.trim()).filter(line => line.length > 0);
            if (lines.length === 0) continue;

            const categoryName = lines.shift()!.replace(/#+ | =+/g, "").toLowerCase().trim();

            for (const line of lines) {
                const [key, value] = line.split("=");
                this.addLangEntry(langKey, categoryName, key, value);
            }
        }
    }

    public static build(): void {
        for (const [lang, categories] of this.langMap) {
            const langFile = path.join(path.join(Config.Paths.rp.root, "texts"), `${lang}.lang`);

            let contents = "";

            for (const [category, keys] of categories) {
                contents += `## ${category.toUpperCase()} ${"=".repeat(117 - category.length)}\n`;

                for (const [key, value] of keys) {
                    contents += `${key}=${value}\n`;
                }

                contents += "\n";
            }

            writeTextToDist(langFile, contents.trim());
        }

        writeTextToDist(path.join(path.join(Config.Paths.rp.root, "texts"), "languages.json"), JSON.stringify([...this.langMap.keys()], null, "\t"));
        this.buildBehaviorLangauge();
    }

    private static buildBehaviorLangauge(): void {
        const langEntries: LangType[] = [];

        for (const entry of Deno.readDirSync("./src/behavior_pack/texts")) {
            if (!entry.name.endsWith(".lang")) continue;

            const langKey = entry.name.replace(".lang", "") as LangType;
            langEntries.push(langKey);
        }

        writeTextToDist(path.join(path.join(Config.Paths.bp.root, "texts"), "languages.json"), JSON.stringify(langEntries, null, "\t"));
    }
    
    public static watch(filePath: string): void {
        if (filePath.endsWith(".lang")) {
            this.ingestFile(filePath);
        }

        this.build();
    }
}