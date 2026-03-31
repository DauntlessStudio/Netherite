import * as path from "@std/path";
import { writeTextToDist } from "../../utils/fileIO.ts";
import { Config } from "../config.ts";
import { formatText, Logger, sendToDist } from "../../utils/index.ts";
import type { ClientLanguage, LangType } from "../../../api/types/index.ts";


type LangEntries = Map<string, string>;
type LangOutput = Map<LangType|"all", LangEntries>;

export class Language {
    /**
     * A map structured as SourceFile/Language/Key/Value.
     * Represents the full data stack mapping each lang entry back to its source file.
     */
    private static readonly langData: Map<string, LangOutput> = new Map();
    private static readonly languageList: Set<LangType> = new Set(["en_US"]);

    // Required because modules process before the build files are ingested
    private static finishedFirstBuild: boolean = false;

    /**
     * Adds an entry to the lang data so it will be used when building.
     * @param inputFile The file the entry came from. Prefix with `virtual:` if a mod.ts file.
     * @param lang The language the entry should go into. Use "all" as shorthand for all referenced languages.
     * @param key The lang entry key.
     * @param value The lang entry value.
     */
    public static addLangEntry(inputFile: string, lang: LangType|"all", key: string, value: string): void {
        if (!value) return;

        const outputMap = this.langData.get(inputFile) ?? new Map();
        value = value.trim();
        key = key.trim();
        
        if (lang !== "all") this.languageList.add(lang);

        const langEntries = outputMap.get(lang) ?? new Map();
        langEntries.set(key, value);

        outputMap.set(lang, langEntries);

        this.langData.set(inputFile, outputMap);
    }

    /**
     * Injests a directory of lang files to build the output.
     * @param dirPath The text directory to ingest.
     */
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

    /**
     * Adds lang entries from a virtual source (mod.ts files).
     * @param data The lang entry data.
     * @param source The source file (mod.ts).
     * @param langs The languages the entry should be added to.
     */
    public static ingestLangData(data: ClientLanguage, source: string, langs: LangType[]|"all"): void {
        this.deleteLangData(source);
        const useLang: (LangType|"all")[] = langs === "all" ? ["all"] : langs;

        for (const lang of useLang) {
            for (const [key, value] of Object.entries(data)) {
                this.addLangEntry(`virtual:${source}`, lang, key, value);
            }
        }
    }

    public static deleteLangData(source: string): void {
        this.langData.delete(`virtual:${source}`);
    }

    /**
     * Ingests an individual lang files, parsing the text and creating lang entries accordingly.
     * @param filePath The lang filepath.
     */
    private static ingestFile(filePath: string): void {
        try {
            Deno.statSync(filePath);
        } catch (_error) {
            this.langData.delete(filePath);
            return;
        }

        if (!filePath.endsWith(".lang")) return;

        const langKey = path.basename(filePath).replace(".lang", "") as LangType;

        const fileContent = Deno.readTextFileSync(filePath);

        const lines = fileContent
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0 && !line.startsWith("#"));

        if (lines.length === 0) return;

        for (const line of lines) {
            const [key, value] = line.split("=");
            this.addLangEntry(filePath, langKey, key, value);
        }
    }

    /**
     * Builds the file contents from a set of lang entries.
     * @param langEntries The lang entries to build output from.
     * @returns The contents to be written to a text file.
     */
    private static buildContents(langEntries: LangEntries): string {
        let contents = "";

        langEntries.entries().forEach(([key, value]) => {
            contents += `${key}=${value}\n`;
        });

        return contents.trim();
    }

    /**
     * Builds the output files from the lang data.
     * @param silent Should the build print messages to console? This should be false on the first run and true on subsequent watches.
     */
    public static build(silent: boolean = true): void {
        if (Config.Options.type !== "skin-pack") {
            const outData = new Map<LangType, LangEntries>();

            // Iterate through all files, starting with virtual files so any physical files with duplicate keys will overwrite them
            for (const dataKey of this.langData.keys().toArray().sort((a, b) => Number(a.startsWith("virtual")) - Number(b.startsWith("virtual")))) {
                const entry = this.langData.get(dataKey)!;

                // Add key value pairs for each language into outData, replacing "all" with all referenced languages.
                entry.forEach((entries, langKey) => {
                    const languages = langKey === "all" ? this.languageList : new Set<LangType>([langKey]);
                    languages.forEach(language => {
                        const outEntries = outData.get(language) ?? new Map();
                        entries.forEach((value, key) => outEntries.set(key, value));
                        outData.set(language, outEntries);
                    });
                });
            }

            for (const [lang, langEntries] of outData) {
                const langFile = path.join(path.join(Config.Paths.rp.root, "texts"), `${lang}.lang`);
                writeTextToDist(langFile, this.buildContents(langEntries));
            }

            writeTextToDist(path.join(path.join(Config.Paths.rp.root, "texts"), "languages.json"), JSON.stringify([...outData.keys()], null, "\t"));

            if (!silent) {
                Logger.log(`[${Logger.Colors.green("write")}] ${path.resolve(path.join(path.join(Config.Paths.rp.root, "texts"), "languages.json"))}`);
                for (const lang of outData.keys()) {
                    Logger.log(`[${Logger.Colors.green("write")}] ${path.resolve(path.join(path.join(Config.Paths.rp.root, "texts"), `${lang}.lang`))}`);
                }
            }
        }

        this.buildNonResourceLanguages();
        this.finishedFirstBuild = true;
    }

    /**
     * Builds the output files from virtual (mod.ts) changes.
     * Does nothing if the initial build hasn't finished yet, since modules process before Language.
     */
    public static buildFromVirtual(): void {
        if (!this.finishedFirstBuild) return;
        this.build(false);
    }

    /**
     * Adds a lang entry to the `src` lang files, *not* the dist.
     * **This will remove any comments not formatted as categories (i.e. ## NAME =).**
     * @param category The category comment the entry should be added to.
     * @param key The lang key.
     * @param value The lang entry.
     */
    public static addToSource(category: string, key: string, value: string): void {
        const path = "./src/resource_pack/texts";
        value = formatText(value, [/_/]);

        for (const entry of Deno.readDirSync(path)) {
            if (!entry.name.endsWith(".lang")) continue;
            
            const fileContent = Deno.readTextFileSync(path + "/" + entry.name);
            const categoryGroups = fileContent.split(/\n(?=#.+=+)/g);
            const langMap = new Map<string, LangEntries>();
            let contents = "";

            for (const categoryData of categoryGroups) {
                const lines = categoryData
                    .split("\n")
                    .map(line => line.trim())
                    .filter(line => line.length > 0);

                if (lines.length === 0) continue;

                const categoryName = (lines.shift() ?? "misc").replace(/#+ | =+/g, "").toLowerCase().trim();
                const categoryMap: LangEntries = new Map();

                for (const line of lines) {
                    const [key, value] = line.split("=");
                    categoryMap.set(key, value);
                }

                if (categoryName === category) categoryMap.set(key, value);

                langMap.set(categoryName, categoryMap);
            }

            if (!langMap.has(category)) langMap.set(category, new Map([[key, value]]));

            langMap.entries().forEach(([category, entry]) => {
                contents += `## ${category.toUpperCase()} ${"=".repeat(117 - category.length)}\n`;

                for (const [key, value] of entry) {
                    contents += `${key}=${value}\n`;
                }

                contents += "\n";
            });

            Deno.writeTextFileSync(path + "/" + entry.name, contents.trim());
        }
    }

    /**
     * Builds the lang data for worlds, behavior packs, and skin packs. A comparatively lightweight process.
     */
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
    
    /**
     * Called when a watched file has an event. Processes/deletes the file data and rebuilds output.
     * @param filepath The filepath that generated the event.
     * @param event The event type that was generated.
     */
    public static watch(filepath: string, event: Deno.FsEvent["kind"]): void {
        if (!filepath.endsWith(".lang")) return;

        try {
            switch (event) {
                case "create":
                    this.ingestFile(filepath);
                    break;
                case "modify":
                    this.ingestFile(filepath);
                    break;
                case "rename":
                    this.ingestFile(filepath);
                    break;
                case "remove":
                    this.langData.delete(filepath);
                    break;
                default:
                    return;
            }

            this.build(false);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            Logger.error(`Failed to read ${filepath} [${message}]`);
        }
    }

    /**
     * Stops watching for changes and clears the data.
     */
    public static endWatch(): void {
        this.langData.clear();
        this.languageList.clear();
        this.finishedFirstBuild = false;
    }
}