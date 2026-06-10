import * as path from "@std/path";
import { Config } from "./config.ts";
import { copyDirSync, JSONCParse, Logger } from "../utils/index.ts";
import { publishToGitHub } from "../../cli/utils/github.ts";
import { doesPathExist, emptyDirectorySync, sleep } from "../core.ts";

interface NetheritePackage {
    /**
     * The name of the Netherite package.
     */
    name: string;
    /**
     * The UUID of the Netherite package.
     */
    uuid: string;
    /**
     * The version of the Netherite package.
     */
    version: string;
    /**
     * A description of the Netherite package.
     */
    description: string;
    /**
     * The GitHub repository address.
     */
    url: string;
    /**
     * An optional deno import map for the package's scripts.
     */
    import?: {
        /**
         * The name of the import map.
         */
        name: string;
        /**
         * The path to the import map. Relative to the package root.
         */
        path: string;
    };
}

interface NetheriteManifest {
    name: string;
    uuid: string;
    repository: string;
    description: string;
    versions: {
        latest: string;
        [version: string]: string;
    };
}

export type LocalPackage = {dir: string, package: NetheritePackage};
export type GlobalPackage = {dir: string, manifest: NetheriteManifest};

interface PublishOptions {
    owner: string;
}

const action = 
`name: Publish

permissions:
  contents: write

on:
  pull_request:
    types:
      - closed
    branches:
      - main
    paths:
      - 'netherite.manifest.json'

jobs:
  handle-pull-request:
    runs-on: ubuntu-latest
    if: github.event.pull_request.merged == true
    steps:
      - name: Checkout base repo
        uses: actions/checkout@v3
        with:
          token: \${{ secrets.GITHUB_TOKEN }}

      - name: Add changelog entry
        run: |
          echo '## \${{ github.event.pull_request.title }}' >> CHANGELOG.md
          echo '\${{ github.event.pull_request.body }}' >> CHANGELOG.md

      - name: Commit and push changelog
        run: |
          git config user.name "github-actions"
          git config user.email "github-actions@github.com"
          git add CHANGELOG.md
          git commit -m "\${{ github.event.pull_request.title }}"
          git push
    
      - name: Update Tag
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        run: |
          gh release create "\${{ github.event.pull_request.title }}" --repo="$GITHUB_REPOSITORY" --title="Release \${{ github.event.pull_request.title }}" --generate-notes
`;

const prTemplate = 
`### Fixes
- Add fixes here or delete section.
### Changes
- Add new features and changes here or delete section.
`;

export class Package {
    // Initial Setup, should only run once
    public static init(): void {
        try {
            Deno.statSync(path.join(Config.NetheriteDirectory, "packages"));
        } catch (_error) {
            Deno.mkdirSync(path.join(Config.NetheriteDirectory, "packages"));
        }
    }

    // Installs a package from a git repository into .netherite/packages
    public static async install(url: string, tag: string = "latest"): Promise<GlobalPackage> {
        this.init();
        if (tag === "latest") tag = "main";
        const packageName = url.split("/").pop()!.replace(".git", "");

        Logger.Spinner.start(`Installing ${Logger.Colors.green(packageName)}...`);

        const cwd = Deno.cwd();
        Deno.chdir(path.join(Config.NetheriteDirectory, "packages"));

        const cached = await this.listGlobal();

        const foundPackage = cached.find((item) => item.manifest.name === packageName);
        if (foundPackage) {
            Logger.Spinner.update(`Package already installed, switching to ${tag} version...`);
            Deno.chdir(path.join(Config.NetheriteDirectory, "packages", packageName));

            try {
                await commandWrap(new Deno.Command("git", {args: ["checkout", tag]}));
                if (tag === "latest") await commandWrap(new Deno.Command("git", {args: ["pull"]}));
            } catch (error) {
                Logger.Spinner.fail("Failed to update package, is git installed and are you connected to the internet?");
                Logger.error((error as Error).message);
                Deno.exit(1);
            }

            Deno.chdir(cwd);

            Logger.Spinner.succeed(`Updated ${Logger.Colors.green(foundPackage.manifest.name)} to ${tag}!`);
            return foundPackage;
        }

        try {
            await commandWrap(new Deno.Command("git", {args: ["clone", "--branch", tag, url]}));
        } catch (error) {
            Logger.Spinner.fail("Failed to install package, is git installed and are you connected to the internet?");
            Logger.error((error as Error).message);
            Deno.exit(1);
        }

        const newPackage = (await this.listGlobal()).find((item) => !cached.find((cache) => cache.manifest.uuid === item.manifest.uuid));

        if (!newPackage) {
            Logger.Spinner.fail("Failed to install package, missing netherite.manifest.json");
            Deno.exit(1);
        }

        Logger.Spinner.succeed(`Installed ${Logger.Colors.green(newPackage.manifest.name)}!`);
        Deno.chdir(cwd);

        return newPackage;
    }

    // Uninstalls a package from .netherite/packages
    public static async uninstall(value: number|string): Promise<GlobalPackage> {
        const manifest = await this.getGlobalPackage(value);

        Logger.Spinner.start(`Uninstalling ${Logger.Colors.green(manifest.manifest.name)}...`);
        Deno.removeSync(manifest.dir, {recursive: true});

        Logger.Spinner.succeed(`Uninstalled ${Logger.Colors.green(manifest.manifest.name)}...`);
        return manifest;
    }

    // Lists all installed packages
    public static async listGlobal(): Promise<GlobalPackage[]> {
        const packages: GlobalPackage[] = [];

        await this.iterateGlobalPackages((dir) => {
            const subpath = path.join(dir, "netherite.manifest.json");

            try {
                const manifest: NetheriteManifest = JSONCParse(Deno.readTextFileSync(subpath));
                packages.push({dir, manifest});
            } catch (error) {
                if (error instanceof Error) {
                    Logger.warn(`Failed to process ${subpath}: ${error.message}`);
                } else {
                    Logger.warn(`Failed to process ${subpath}: ${JSON.stringify(error)}`);
                }
            }
        });

        return packages;
    }

    // Lists all installed packages
    public static async listLocal(): Promise<LocalPackage[]> {
        const packages: LocalPackage[] = [];

        await this.iterateLocalPackages((dir) => {
            const nPackage: NetheritePackage = JSONCParse(Deno.readTextFileSync(path.join(dir, "netherite.package.json")));
            packages.push({dir, package: nPackage});
        });

        return packages;
    }

    // Loads an installed package into the current project
    public static async load(value: number|string): Promise<void> {
        const nPackage = await this.getGlobalPackage(value);

        Logger.Spinner.start(`Loading ${Logger.Colors.green(nPackage.manifest.name)}...`);

        if (!doesPathExist(path.join(nPackage.dir, "src"))) {
            Logger.Spinner.fail(`Failed to validate ${nPackage.manifest.name} package, attempting recovery`);
            await this.convert(nPackage);
            Logger.Spinner.start(`Finished recovery, reloading ${Logger.Colors.green(nPackage.manifest.name)}...`);
        }

        const outPath = path.join(Deno.cwd(), "src", "modules", nPackage.manifest.name);
        emptyDirectorySync(outPath);
        copyDirSync(path.join(nPackage.dir, "src"), outPath);

        // Get imported package information
        const packageInfo: NetheritePackage = JSONCParse(Deno.readTextFileSync(path.join(outPath, "netherite.package.json")));
        if (!packageInfo) {
            Logger.Spinner.fail(`Failed to load ${nPackage.manifest.name} package, missing netherite.package.json`);
            Deno.exit(1);
        }

        // If the package has an import, add it to the deno.json imports
        if (packageInfo.import) {
            const deno = JSONCParse(Deno.readTextFileSync(path.join(Deno.cwd(), "deno.json")));

            if (!deno.imports) {
                deno.imports = {};
            }

            deno.imports[packageInfo.import.name] = `./src/modules/${packageInfo.name}/${packageInfo.import.path}`;
            Deno.writeTextFileSync(path.join(Deno.cwd(), "deno.json"), JSON.stringify(deno, null, "\t"));
        }

        Logger.Spinner.succeed(`Loaded ${Logger.Colors.green(nPackage.manifest.name)}!`);
    }

    // Unloads a package from the current project
    public static async unload(value: number|string): Promise<LocalPackage> {
        const nPackage = await this.getLoadedPackage(value);
        Deno.removeSync(nPackage.dir, {recursive: true});

        return nPackage;
    }

    // Publishes a loaded package to a git repository
    public static async publish(localPackage: {dir: string, package: NetheritePackage}, version: string, ignoreVersionCollision?: boolean): Promise<void> {
        const globalPackage = await this.getGlobalPackage(localPackage.package.name);
        localPackage.package.version = version;

        Deno.writeTextFileSync(path.join(localPackage.dir, "netherite.package.json"), JSON.stringify(localPackage.package, null, "\t"));
        
        Logger.Spinner.start(`Publishing ${Logger.Colors.green(localPackage.package.name)} ${version}...`);

        if (!globalPackage.manifest.repository) {
            Logger.Spinner.fail("Failed to publish package, missing repository in netherite.manifest.json");
            Deno.exit(1);
        }

        const cwd = Deno.cwd();
        Deno.chdir(globalPackage.dir);

        try {
            await commandWrap(new Deno.Command("git", {args: ["fetch", "origin"]}));
            await commandWrap(new Deno.Command("git", {args: ["status"]}));
            await commandWrap(new Deno.Command("git", {args: ["checkout", "-B", "main", "origin/main"]}));
            await commandWrap(new Deno.Command("git", {args: ["pull"]}));
        } catch (error) {
            Logger.Spinner.fail(`Failed to pull the latest package data`);
            Logger.error((error as Error).message);
            return;
        }

        globalPackage.manifest = JSONCParse(Deno.readTextFileSync(path.join(globalPackage.dir, "netherite.manifest.json")));
        let url = globalPackage.manifest.repository;

        const newVersion = parseInt(version.replace(/\./g, ""));
        const latestVersion = parseInt(globalPackage.manifest.versions.latest.replace(/\./g, ""));
        
        if (newVersion <= latestVersion && !ignoreVersionCollision) {
            Logger.Spinner.fail(`Cannot publish package, version ${version} is not greater than ${globalPackage.manifest.versions.latest}`);
            return;
        }

        emptyDirectorySync(path.join(globalPackage.dir, "src"))
        copyDirSync(localPackage.dir, path.join(globalPackage.dir, "src"));

        globalPackage.manifest.versions[version] = version;
        globalPackage.manifest.versions.latest = version;

        Deno.writeTextFileSync(path.join(globalPackage.dir, "netherite.manifest.json"), JSON.stringify(globalPackage.manifest, null, "\t"));

        Logger.Spinner.update(`Creating branch ${Logger.Colors.green(version)}...`);
        try {
            await commandWrap(new Deno.Command("git", {args: ["checkout", "-b", version]}));
            await commandWrap(new Deno.Command("git", {args: ["push", "-u", "origin", version]}));
        } catch (error) {
            Logger.Spinner.fail(`Failed to create a version entry`);
            Logger.error((error as Error).message);
            return;
        }

        Logger.Spinner.update(`Pushing ${Logger.Colors.green(version)} changes...`);
        try {
            await commandWrap(new Deno.Command("git", {args: ["add", "."]}));
            await commandWrap(new Deno.Command("git", {args: ["commit", "-m", version]}));
            await commandWrap(new Deno.Command("git", {args: ["push"]}));
        } catch (error) {
            Logger.Spinner.fail(`Failed to publish the new version`);
            Logger.error((error as Error).message);
            return;
        }

        Logger.Spinner.update(`Creating pull request for ${Logger.Colors.green(version)}...`);
        const result = await new Deno.Command("gh", {args: ["pr", "create", "--assignee=@me", `--title=${version}`, `--body=${prTemplate}`], stdout: "piped"}).output();

        if (result.success) {
            url = new TextDecoder().decode(result.stdout);
            Logger.Spinner.succeed(`Created pull request at ${url} ${Logger.Colors.green(version)} for ${Logger.Colors.green(localPackage.package.name)}!`);
        } else {
            Logger.Spinner.fail(`Failed to create pull request ${Logger.Colors.green(version)} for ${Logger.Colors.green(localPackage.package.name)}`)
        }

        await commandWrap(new Deno.Command("git", {args: ["checkout", "main"]}));
        Deno.chdir(cwd);
    }

    // Creates a new package in the current project, allows for publishing to a git repository on creation
    public static async create(name: string, description: string, publish?: PublishOptions): Promise<void> {
        name = name.replace(/\s/g, "-");
        
        const dir = path.join(Deno.cwd(), "src", "modules", name);
        Deno.mkdirSync(dir, {recursive: true});

        if (publish) {
            const cwd = Deno.cwd();
            const installDir = path.join(Config.NetheriteDirectory, "packages", name);

            Deno.mkdirSync(installDir, {recursive: true});
            Deno.chdir(installDir);

            const finishedPublishing = Promise.withResolvers<void>();
            let nPackage: NetheritePackage;

            try {
                await publishToGitHub({owner: publish.owner, name, description}, (repository) => {
                    nPackage = {
                        name,
                        description,
                        uuid: crypto.randomUUID(),
                        version: "0.0.0",
                        url: repository,
                    };

                    Deno.writeTextFileSync(path.join(dir, "netherite.package.json"), JSON.stringify(nPackage, null, "\t"));
                    Deno.writeTextFileSync(path.join(installDir, "netherite.manifest.json"), JSON.stringify({
                        name,
                        description,
                        repository,
                        uuid: nPackage.uuid,
                        versions: {latest: "0.0.0"}
                    }, null, "\t"));

                    Deno.mkdirSync(path.join(installDir, ".github/workflows"), {recursive: true});
                    Deno.writeTextFileSync(path.join(installDir, ".github/workflows/pull_request.yml"), action);
                    Deno.writeTextFileSync(path.join(installDir, "CHANGELOG.md"), "");
    
                });

                this.publish({dir, package: nPackage!}, "0.0.0", true).then(finishedPublishing.resolve).catch(finishedPublishing.reject);
            } catch (error) {
                Logger.error(String(error));
                Deno.exit(1);
            }

            await finishedPublishing.promise;
            Deno.chdir(cwd);
        }
    }

    /**
     * Converts an older, folder-based package to a modern, tag-based format.
     * @param pack The package to convert.
     */
    public static async convert(pack: GlobalPackage): Promise<void> {
        Logger.log(`Updating ${pack.manifest.name} to tag-based structure`);
        const cacheDir = Deno.cwd();

        pack = await this.install(pack.manifest.repository);
        if (doesPathExist(path.join(pack.dir, "src"))) {
            Logger.log(`Finished updating ${pack.manifest.name}`);
            return;
        }

        Logger.Spinner.start(`Performing package conversion`);
        
        const tempDir = Deno.makeTempDirSync();
        Deno.chdir(tempDir);
        copyDirSync(pack.dir, tempDir);
        emptyDirectorySync(path.join(tempDir, "versions"));

        Deno.writeTextFileSync(path.join(tempDir, ".github/workflows/pull_request.yml"), action);

        const versions = Object.keys(pack.manifest.versions).filter(v => v !== "latest");
        pack.manifest.versions = {latest: ""};

        for (const version of versions) {
            Logger.Spinner.update(`Preparing tag ${version}`);

            emptyDirectorySync(path.join(tempDir, "src"));
            copyDirSync(path.join(pack.dir, "versions", version), path.join(tempDir, "src"));

            pack.manifest.versions.latest = version;
            pack.manifest.versions[version] = version;
            Deno.writeTextFileSync(path.join(tempDir, "netherite.manifest.json"), JSON.stringify(pack.manifest, null, "\t"));

            const packageData: NetheritePackage = JSONCParse(Deno.readTextFileSync(path.join(tempDir, "src", "netherite.package.json")));
            packageData.url = pack.manifest.repository;
            Deno.writeTextFileSync(path.join(tempDir, "src", "netherite.package.json"), JSON.stringify(packageData, null, "\t"));

            try {
                await commandWrap(new Deno.Command("git", {args: ["add", "."]}));
                await commandWrap(new Deno.Command("git", {args: ["commit", "-m", version]}));
                await commandWrap(new Deno.Command("git", {args: ["push"]}));
            } catch (error) {
                Logger.error(`${version} ${(error as Error).message}`);
            }

            while (true) {
                try {
                    await commandWrap(new Deno.Command("gh", {args: ["release", "create", version, "--title", `Release ${version}`, "--generate-notes"]}));
                    break;
                } catch (_error) {
                    Logger.Spinner.update(`Failed to generate tagged release ${version}, trying again in 5 seconds`);
                    await sleep(5000);
                    Logger.Spinner.update(`Retrying ${version} release`);
                }
            }

            Logger.Spinner.update(`Converted tag ${version}`);
        }

        Logger.Spinner.update(`Cleaning up...`);
        emptyDirectorySync(tempDir);
        Deno.chdir(pack.dir);

        try {
            await commandWrap(new Deno.Command("git", {args: ["checkout", "main"]}));
            await commandWrap(new Deno.Command("git", {args: ["pull"]}));
        } catch (error) {
            Logger.Spinner.fail(`Fatal ${(error as Error).message}`);
            Deno.exit(1);
        }

        if (doesPathExist(path.join(pack.dir, "src"))) {
            Deno.chdir(cacheDir);
            Logger.Spinner.succeed(`Converted ${pack.manifest.name}`);
            return;
        } else {
            Logger.Spinner.fail(`Could not convert ${pack.manifest.name}`);
            Deno.exit(1);
        }
    }

    private static async iterateGlobalPackages(callback: (path: string) => Promise<void>|void): Promise<void> {
        const dir = path.join(Config.NetheriteDirectory, "packages");

        try {
            Deno.statSync(dir);
        } catch (_error) {
            this.init();
        }

        for (const entry of Deno.readDirSync(dir)) {
            if (entry.isDirectory) {
                try {
                    Deno.statSync(path.join(dir, entry.name, "netherite.manifest.json"));
                } catch (_error) {
                    continue;
                }

                await callback(path.join(dir, entry.name));
            }
        };
    }

    public static async getGlobalPackage(value: number|string): Promise<GlobalPackage> {
        const packages = await this.listGlobal();

        if (typeof value === "number") {
            if (value < 0 || value >= packages.length) {
                Logger.error("Invalid package index");
                Deno.exit(1);
            }

            return packages[value];
        } else {
            const packageValue = packages.find((item) => item.manifest.name === value);

            if (!packageValue) {
                Logger.error("Invalid package name");
                Deno.exit(1);
            }

            return packageValue;
        }
    }

    private static async iterateLocalPackages(callback: (path: string) => Promise<void>|void): Promise<void> {
        const dir = path.join(Deno.cwd(), "src", "modules");

        try {
            Deno.statSync(dir);
        } catch (_error) {
            Deno.mkdirSync(dir, {recursive: true});
        }

        for (const entry of Deno.readDirSync(dir)) {
            if (entry.isDirectory) {
                try {
                    Deno.statSync(path.join(dir, entry.name, "netherite.package.json"));
                } catch (_error) {
                    continue;
                }

                await callback(path.join(dir, entry.name));
            }
        };
    }

    public static async getLoadedPackage(value: number|string): Promise<LocalPackage> {
        const packages = await this.listLocal();

        if (typeof value === "number") {
            if (value < 0 || value >= packages.length) {
                Logger.error("Invalid package index");
                Deno.exit(1);
            }

            return packages[value];
        } else {
            const packageValue = packages.find((item) => item.package.name === value);

            if (!packageValue) {
                Logger.error("Invalid package name");
                Deno.exit(1);
            }

            return packageValue;
        }
    }
}

async function commandWrap(command: Deno.Command): Promise<void> {
    const result = await command.output();
    if (result.success) return;

    const err = new TextDecoder().decode(result.stderr);
    const out = new TextDecoder().decode(result.stdout);

    throw new Error(out + err);
}