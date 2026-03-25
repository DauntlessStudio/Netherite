import * as path from "@std/path";
import { writeTextToDist } from "../../utils/fileIO.ts";
import { Config } from "../config.ts";
import { Logger, sendToDist, writeTextToSrc } from "../../utils/index.ts";
import type { ClientLanguage, LangType } from "../../../api/types/index.ts";


type LangEntries = Map<string, string>;

export class Language {
    /**
     * A map structured as Language/Key/Value
     */
    private static readonly langMap: Map<LangType, LangEntries> = new Map();
    private static readonly langFileRefs: Set<string> = new Set();

    // Required because modules process before the build files are ingested
    private static readonly pendingCallbacks: Set<() => void> = new Set();
    private static finishedFirstBuild: boolean = false;

    public static addLangEntry(lang: LangType, key: string, value: string, lowPriority?: boolean): void {
        if (!value) return;

        value = value.trim();
        key = key.trim();

        // Get map for lang file
        if (!this.langMap.has(lang)) {
            this.langMap.set(lang, new Map());
        }

        // Only adds entry if this is high priority (src static file) or the entry is unique
        // This prevents modules from overwriting src files
        const langEntries = this.langMap.get(lang)!;
        if (!lowPriority || !langEntries.has(key)) langEntries.set(key, value);
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

    public static ingestLangData(data: ClientLanguage, langs: LangType[]|"all"): void {
        const defaultCallback = () => {
            const useLangs = langs === "all" ? [...this.langMap.keys()] : langs;

            for (const lang of useLangs) {
                for (const [key, value] of Object.entries(data)) {
                    this.addLangEntry(lang, key, value, true);
                }
            }
        }

        if (this.finishedFirstBuild) {
            defaultCallback();
            this.build(false);
        } else {
            this.pendingCallbacks.add(defaultCallback);
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

        const lines = fileContent
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0 && !line.startsWith("#"));

        if (lines.length === 0) return;

        for (const line of lines) {
            const [key, value] = line.split("=");
            this.addLangEntry(langKey, key, value);
        }

        this.langFileRefs.add(filePath);
    }

    private static buildContents(langEntries: LangEntries): string {
        let contents = "";

        langEntries.entries().forEach(([key, value]) => {
            contents += `${key}=${value}\n`;
        });

        return contents.trim();
    }

    public static build(silent: boolean = true): void {
        if (!this.finishedFirstBuild) this.pendingCallbacks.forEach(cb => cb());

        if (Config.Options.type !== "skin-pack") {
            for (const [lang, langEntries] of this.langMap) {
                const langFile = path.join(path.join(Config.Paths.rp.root, "texts"), `${lang}.lang`);
                writeTextToDist(langFile, this.buildContents(langEntries));
            }
    
            writeTextToDist(path.join(path.join(Config.Paths.rp.root, "texts"), "languages.json"), JSON.stringify([...this.langMap.keys()], null, "\t"));

            if (!silent) {
                Logger.log(`[${Logger.Colors.green("write")}] ${path.resolve(path.join(path.join(Config.Paths.rp.root, "texts"), "languages.json"))}`);
                for (const lang of this.langMap.keys()) {
                    Logger.log(`[${Logger.Colors.green("write")}] ${path.resolve(path.join(path.join(Config.Paths.rp.root, "texts"), `${lang}.lang`))}`);
                }
            }
        }

        this.buildNonResourceLanguages();
        this.finishedFirstBuild = true;
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

            this.build(false);
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