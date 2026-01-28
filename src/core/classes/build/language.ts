import * as path from "@std/path";
import { formatText } from "../../utils/text.ts";
import { writeTextToDist } from "../../utils/fileIO.ts";
import { Config } from "../config.ts";
import { Logger, sendToDist, writeTextToSrc } from "../../utils/index.ts";

export type LangType = "en_US" | "en_GB" | "de_DE" | "es_ES" | "es_MX" | "fr_FR" | "fr_CA" | "it_IT" | "ja_JP" | "ko_KR" | "pt_BR" | "pt_PT" | "ru_RU" | "zh_CN" | "zh_TW" | "nl_NL" | "bg_BG" | "cs_CZ" | "da_DK" | "el_GR" | "fi_FI" | "hu_HU" | "id_ID" | "nb_NO" | "pl_PL" | "sk_SK" | "sv_SE" | "tr_TR" | "uk_UA";
type LangEntries = Map<string, {category: string, value: string}>;

export class Language {
    /**
     * A map structured as Language/Key/{Category&Value}
     */
    private static readonly langMap: Map<LangType, LangEntries> = new Map();
    private static readonly langFileRefs: Set<string> = new Set();

    public static addLangEntry(lang: LangType, category: string, key: string, value: string): void {
        if (!category) category = "misc";
        if (!value) return;

        category = category.toLowerCase().trim();
        value = value.trim();

        // Get map for lang file
        if (!this.langMap.has(lang)) {
            this.langMap.set(lang, new Map());
        }

        const langEntries = this.langMap.get(lang)!;
        langEntries.set(key, {category, value});
    }

    public static addPlaceholderEntry(category: string, key: string, value: string): void {
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

    private static reIngestFiles(): void {
        this.langMap.clear();
        this.langFileRefs.forEach(filepath => this.ingestFile(filepath));
    }

    private static ingestFile(filePath: string): void {
        try {
            Deno.statSync(filePath);
        } catch (_error) {
            this.langFileRefs.delete(filePath);
            return;
        }

        if (!filePath.endsWith(".lang")) return;

        const langKey = path.basename(filePath).replace(".lang", "") as LangType;

        const fileContent = Deno.readTextFileSync(filePath);

        const categoryGroups = fileContent.split(/(?=(#+ .+ =+))/g);

        for (const category of categoryGroups) {
            const lines = category
                .split("\n")
                .filter(line => line.length > 0)
                .map(line => line.trim())
                .filter(line => line.length > 0);

            if (lines.length === 0) continue;

            const categoryName = (lines.shift() ?? "misc").replace(/#+ | =+/g, "").toLowerCase().trim();

            for (const line of lines) {
                const [key, value] = line.split("=");
                this.addLangEntry(langKey, categoryName, key, value);
            }
        }

        this.langFileRefs.add(filePath);
    }

    private static buildContents(langEntries: LangEntries): string {
        let contents = "";
        const categoryEntries: Map<string, Map<string, string>> = new Map();

        langEntries.entries().forEach(([key, entry]) => {
            if (!categoryEntries.has(entry.category)) categoryEntries.set(entry.category, new Map());
            categoryEntries.get(entry.category)?.set(key, entry.value);
        });

        for (const [category, keys] of categoryEntries) {
            contents += `## ${category.toUpperCase()} ${"=".repeat(117 - category.length)}\n`;

            for (const [key, value] of keys) {
                contents += `${key}=${value}\n`;
            }

            contents += "\n";
        }

        return contents.trim();
    }

    public static build(): void {
        if (Config.Options.type !== "skin-pack") {
            for (const [lang, langEntries] of this.langMap) {
                const langFile = path.join(path.join(Config.Paths.rp.root, "texts"), `${lang}.lang`);
                writeTextToDist(langFile, this.buildContents(langEntries));
            }
    
            writeTextToDist(path.join(path.join(Config.Paths.rp.root, "texts"), "languages.json"), JSON.stringify([...this.langMap.keys()], null, "\t"));
        }

        this.buildNonResourceLanguages();
    }

    public static buildSource(): void {
        for (const [lang, langEntries] of this.langMap) {
            const langFile = path.join("./src/resource_pack/texts", `${lang}.lang`);
            writeTextToSrc(langFile, this.buildContents(langEntries));
        }
    }

    private static buildNonResourceLanguages(): void {
        try {
            const langEntries: LangType[] = [];

            for (const entry of Deno.readDirSync("./src/behavior_pack/texts")) {
                if (!entry.name.endsWith(".lang")) continue;

                const langKey = entry.name.replace(".lang", "") as LangType;
                langEntries.push(langKey);
            }
            writeTextToDist(path.join(path.join(Config.Paths.bp.root, "texts"), "languages.json"), JSON.stringify(langEntries, null, "\t"));
        } catch (_error) {
            // Do Nothing
        }

        if (Config.Options.type === "world") {
            try {
                sendToDist("./src/behavior_pack/texts", path.join(Config.Paths.root, "texts"));
                writeTextToDist(path.join(Config.Paths.root, "texts/languages.json"), JSON.stringify(["en_US"], null, "\t"));
            } catch (_error) {
                // Do Nothing
            }
        }

        if (Config.Options.type === "skin-pack" || Config.Options.include_skin_pack) {
            try {
                sendToDist("./src/skin_pack/texts", path.join(Config.Paths.skins.root, "/texts"));
                writeTextToDist(path.join(Config.Paths.skins.root, "texts/languages.json"), JSON.stringify(["en_US"], null, "\t"));
            } catch (_error) {
                // Do Nothing
            }
        }
    }
    
    public static watch(filepath: string, event: Deno.FsEvent["kind"]): void {
        if (!filepath.endsWith(".lang")) return;

        try {
            switch (event) {
                case "create":
                    this.ingestFile(filepath);
                    break;
                case "modify":
                    this.reIngestFiles();
                    this.ingestFile(filepath);
                    break;
                case "rename":
                    this.reIngestFiles();
                    this.ingestFile(filepath);
                    break;
                case "remove":
                    this.langFileRefs.delete(filepath);
                    this.reIngestFiles();
                    break;
                default:
                    return;
            }

            this.build();
            Logger.log(`[${Logger.Colors.green("write")}] ${path.resolve(path.join(path.join(Config.Paths.rp.root, "texts"), "languages.json"))}`);
            for (const lang of this.langMap.keys()) {
                Logger.log(`[${Logger.Colors.green("write")}] ${path.resolve(path.join(path.join(Config.Paths.rp.root, "texts"), `${lang}.lang`))}`);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            Logger.error(`Failed to read ${filepath} [${message}]`);
        }
    }

    public static endWatch(): void {
        this.langFileRefs.clear();
        this.langMap.clear();
    }
}