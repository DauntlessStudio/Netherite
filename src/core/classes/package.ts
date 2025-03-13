import * as path from "@std/path";
import { Config } from "./config.ts";
import { copyDirSync, Logger } from "../utils/index.ts";

interface NetheritePackage {
    name: string;
    uuid: string;
    version: string;
    description: string;
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

export class Package {
    private static latestVanillaVersion: string = "1.21.62";

    public static get LatestVanillaVersion() : string {
        try {
            const version = JSON.parse(Deno.readTextFileSync(path.join(Config.NetheriteDirectory, "bedrock-samples", "version.json")));
            const latest = (version.latest as string).split(".");
            latest.length = 3;
            return latest.join(".");
        } catch (_error) {
            return this.latestVanillaVersion;
        }
    }
    
    // Initial Setup, should only run once
    public static async init(): Promise<void> {
        try {
            Deno.statSync(Config.NetheriteDirectory);
            Deno.statSync(path.join(Config.NetheriteDirectory, "bedrock-samples"));
        } catch (_error) {
            Logger.Spinner.start("Performing one-time inital setup...");
            const cwd = Deno.cwd();

            Deno.mkdirSync(Config.NetheriteDirectory, {recursive: true});
            Deno.mkdirSync(path.join(Config.NetheriteDirectory, "packages"));

            Deno.chdir(Config.NetheriteDirectory);

            const install = await new Deno.Command("git", {args: ["clone", "https://github.com/Mojang/bedrock-samples.git"]}).output();

            if (!install.success) {
                Logger.Spinner.fail("Failed to install bedrock-samples, is git installed and are you connected to the internet?");
                Deno.exit(1);
            }

            Deno.chdir(cwd);
            Logger.Spinner.succeed("One-time inital setup complete!");
        }

        try {
            Deno.statSync(path.join(Config.NetheriteDirectory, "packages"));
        } catch (_error) {
            Deno.mkdirSync(path.join(Config.NetheriteDirectory, "packages"));
        }
    }

    // Vanilla validation, uses git to check if .netherite/bedrock-samples exists and is up to date
    public static async vanillaUpdate(): Promise<void> {
        await this.init();

        const cwd = Deno.cwd();
        Deno.chdir(path.join(Config.NetheriteDirectory, "bedrock-samples"));

        const update = await new Deno.Command("git", {args: ["pull"]}).output();

        if (!update.success) {
            Logger.error(`Failed to update bedrock-samples, is git installed and are you connected to the internet?`);
            Logger.error(`Latest version defaulting to ${this.latestVanillaVersion}`);
        }

        Deno.chdir(cwd);
    }

    // Installs a package from a git repository into .netherite/packages
    public static async install(url: string): Promise<{dir: string, manifest: NetheriteManifest}> {
        await this.init();

        const packageName = url.split("/").pop()!.replace(".git", "");

        Logger.Spinner.start(`Installing ${Logger.Colors.green(packageName)}...`);

        const cwd = Deno.cwd();
        Deno.chdir(path.join(Config.NetheriteDirectory, "packages"));

        const cached = await this.list();

        const foundPackage = cached.find((item) => item.manifest.name === packageName);
        if (foundPackage) {
            Logger.Spinner.update("Package already installed, updating to latest version...");
            Deno.chdir(path.join(Config.NetheriteDirectory, "packages", packageName));
            const update = await new Deno.Command("git", {args: ["pull"]}).output();
        
            if (!update.success) {
                Logger.Spinner.fail("Failed to update package, is git installed and are you connected to the internet?");
                Deno.exit(1);
            }

            Deno.chdir(cwd);

            Logger.Spinner.succeed(`Installed ${Logger.Colors.green(foundPackage.manifest.name)}!`);
            return foundPackage;
        }

        const install = await new Deno.Command("git", {args: ["clone", url]}).output();

        Deno.chdir(cwd);

        if (!install.success) {
            Logger.Spinner.fail("Failed to install package, is git installed and are you connected to the internet?");
            Deno.exit(1);
        }

        const newPackage = (await this.list()).find((item) => !cached.find((cache) => cache.manifest.uuid === item.manifest.uuid));

        if (!newPackage) {
            Logger.Spinner.fail("Failed to install package, missing netherite.manifest.json");
            Deno.exit(1);
        }

        Logger.Spinner.succeed(`Installed ${Logger.Colors.green(newPackage.manifest.name)}!`);
        return newPackage;
    }

    // Uninstalls a package from .netherite/packages
    public static async uninstall(value: number|string): Promise<{dir: string, manifest: NetheriteManifest}> {
        const manifest = await this.getInstalledPackage(value);

        Logger.Spinner.start(`Uninstalling ${Logger.Colors.green(manifest.manifest.name)}...`);
        Deno.removeSync(manifest.dir, {recursive: true});

        Logger.Spinner.succeed(`Uninstalled ${Logger.Colors.green(manifest.manifest.name)}...`);
        return manifest;
    }

    // Lists all installed packages
    public static async list(): Promise<{dir: string, manifest: NetheriteManifest}[]> {
        const packages: {dir: string, manifest: NetheriteManifest}[] = [];

        await this.iterateInstalledPackages((dir) => {
            const manifest: NetheriteManifest = JSON.parse(Deno.readTextFileSync(path.join(dir, "netherite.manifest.json")));
            packages.push({dir, manifest});
        });

        return packages;
    }

    // Lists all installed packages
    public static async listLoaded(): Promise<{dir: string, package: NetheritePackage}[]> {
        const packages: {dir: string, package: NetheritePackage}[] = [];

        await this.iterateLoadedPackages((dir) => {
            const nPackage: NetheritePackage = JSON.parse(Deno.readTextFileSync(path.join(dir, "netherite.package.json")));
            packages.push({dir, package: nPackage});
        });

        return packages;
    }

    // Loads an installed package into the current project
    public static async load(value: number|string, version?: string): Promise<void> {
        const nPackage = await this.getInstalledPackage(value);

        Logger.Spinner.start(`Loading ${Logger.Colors.green(nPackage.manifest.name)}...`);

        if (version && !nPackage.manifest.versions[version]) {
            Logger.Spinner.fail(`Invalid ${nPackage.manifest.name} package version`);
            Deno.exit(1);
        }

        const useVersion = version ? version : nPackage.manifest.versions.latest;

        try {
            Deno.statSync(path.join(nPackage.dir, useVersion));
        } catch (_error) {
            Logger.Spinner.fail(`Failed to load ${nPackage.manifest.name} package, missing version ${useVersion}`);
            Deno.exit(1);
        }

        copyDirSync(path.join(nPackage.dir, useVersion), path.join(Deno.cwd(), "src", "modules", nPackage.manifest.name));
        Logger.Spinner.succeed(`Loaded ${Logger.Colors.green(nPackage.manifest.name)}!`);
    }

    // Unloads a package from the current project
    public static async unload(value: number|string): Promise<{dir: string, package: NetheritePackage}> {
        const nPackage = await this.getLoadedPackage(value);
        Deno.removeSync(nPackage.dir, {recursive: true});

        return nPackage;
    }

    // Publishes a loaded package to a git repository
    public static async publish(loadedPackage: {dir: string, package: NetheritePackage}, force?: boolean): Promise<void> {
        const installedPackage = await this.getInstalledPackage(loadedPackage.package.name);
        
        Logger.Spinner.start(`Publishing ${Logger.Colors.green(loadedPackage.package.name)}...`);

        if (!installedPackage.manifest.repository) {
            Logger.Spinner.fail("Failed to publish package, missing repository in netherite.manifest.json");
            Deno.exit(1);
        }

        const cwd = Deno.cwd();
        Deno.chdir(installedPackage.dir);

        const status = await new Deno.Command("git", {args: ["status"]}).output();

        if (!status.success) {
            Logger.Spinner.fail(`${installedPackage.manifest.name} repository is not a git repository, cannot publish`);
            Logger.error(`You may need to remove the package and re-install it`);
            Deno.exit(1);
        }

        await new Deno.Command("git", {args: ["pull"]}).output();
        installedPackage.manifest = JSON.parse(Deno.readTextFileSync(path.join(installedPackage.dir, "netherite.manifest.json")));

        const loadedVersion = parseInt(loadedPackage.package.version.replace(/\./g, ""));
        const lastestVersion = parseInt(installedPackage.manifest.versions.latest.replace(/\./g, ""));
        
        if (loadedVersion <= lastestVersion) {
            Logger.Spinner.fail(`Failed to publish package, version ${loadedPackage.package.version} is not greater than ${installedPackage.manifest.versions.latest}`);
            Deno.exit(1);
        }

        copyDirSync(loadedPackage.dir, path.join(installedPackage.dir, loadedPackage.package.version));

        installedPackage.manifest.versions[loadedPackage.package.version] = loadedPackage.package.version;
        installedPackage.manifest.versions.latest = loadedPackage.package.version;

        Deno.writeTextFileSync(path.join(installedPackage.dir, "netherite.manifest.json"), JSON.stringify(installedPackage.manifest, null, "\t"));

        if (!force) {
            Logger.Spinner.update(`Creating branch ${Logger.Colors.green(loadedPackage.package.version)}...`);
            await new Deno.Command("git", {args: ["checkout", "-b", loadedPackage.package.version]}).output();
            await new Deno.Command("git", {args: ["push", "-u", "origin", loadedPackage.package.version]}).output();
        }

        Logger.Spinner.update(`Pushing ${Logger.Colors.green(loadedPackage.package.version)} changes...`);
        await new Deno.Command("git", {args: ["add", "."]}).output();
        await new Deno.Command("git", {args: ["commit", "-m", loadedPackage.package.version]}).output();
        await new Deno.Command("git", {args: ["push"]}).output();

        if (!force) {
            Logger.Spinner.update(`Creating pull request for ${Logger.Colors.green(loadedPackage.package.version)}...`);
            await new Deno.Command("gh", {args: ["pr", "create", "--assignee=@me", "--fill", `--title=${loadedPackage.package.version}`]}).output();
            await new Deno.Command("git", {args: ["checkout", "main"]}).output();
            new TextDecoder().decode
        }

        Deno.chdir(cwd);

        if (force) Logger.Spinner.succeed(`Published ${Logger.Colors.green(loadedPackage.package.name)} version ${Logger.Colors.green(loadedPackage.package.version)}!`);
        else Logger.Spinner.succeed(`Created Pull Request ${Logger.Colors.green(loadedPackage.package.version)} for ${Logger.Colors.green(loadedPackage.package.name)}!`);
    }

    // Creates a new package in the current project, allows for publishing to a git repository on creation
    public static async create(name: string, description: string, publish?: boolean): Promise<void> {
        name = name.replace(/\s/g, "-");
        
        const dir = path.join(Deno.cwd(), "src", "modules", name);
        Deno.mkdirSync(dir, {recursive: true});

        const nPackage: NetheritePackage = {
            name,
            description,
            uuid: crypto.randomUUID(),
            version: "0.0.1"
        };

        Deno.writeTextFileSync(path.join(Deno.cwd(), "src", "modules", name, "netherite.package.json"), JSON.stringify(nPackage, null, "\t"));

        if (publish) {
            const cwd = Deno.cwd();
            const installDir = path.join(Config.NetheriteDirectory, "packages", name);

            Deno.mkdirSync(installDir, {recursive: true});
            Deno.chdir(installDir);

            await new Deno.Command("git", {args: ["init"]}).output();

            Logger.log(`\nSelect ${Logger.Colors.green('Push an existing local repository to GitHub')} when prompted and use ${Logger.Colors.green('.')} as the 'Path to local repository'`);
            Logger.log(`Ensure the Repository name is ${Logger.Colors.green(name)}\n`);

            const repo = await new Deno.Command("gh", {args: ["repo", "create"]}).spawn().output();

            if (repo.success) {
                Logger.log(`Repository created, preparing for initial version publish`);

                const gitConfig = Deno.readTextFileSync(path.join(installDir, ".git", "config"));
                const gitConfigLines = gitConfig.split("\n");
                const urlLine = gitConfigLines.find(line => line.includes("url = "));
                const repository = urlLine?.split(" = ")[1].trim();

                Deno.writeTextFileSync(path.join(installDir, "netherite.manifest.json"), JSON.stringify({
                    name,
                    description,
                    repository,
                    uuid: nPackage.uuid,
                    versions: {latest: "0.0.0"}
                }, null, "\t"));

                await new Deno.Command("git", {args: ["remote", "add", "origin", repository!]}).output();
                await new Deno.Command("git", {args: ["add", "."]}).output();
                await new Deno.Command("git", {args: ["commit", "-m", "Initial Commit"]}).output();
                await new Deno.Command("git", {args: ["push", "-u", "origin", "main"]}).output();
    
                copyDirSync(dir, path.join(installDir, nPackage.version));
                await this.publish({dir, package: nPackage}, true);
            } else {
                Logger.error("Failed to create repository, is gh installed and are you connected to the internet?");
                Deno.exit(1);
            }

            Deno.chdir(cwd);
        }
    }

    private static async iterateInstalledPackages(callback: (path: string) => Promise<void>|void): Promise<void> {
        const dir = path.join(Config.NetheriteDirectory, "packages");

        try {
            Deno.statSync(dir);
        } catch (_error) {
            await this.vanillaUpdate();
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

    public static async getInstalledPackage(value: number|string): Promise<{dir: string, manifest: NetheriteManifest}> {
        const packages = await this.list();

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

    private static async iterateLoadedPackages(callback: (path: string) => Promise<void>|void): Promise<void> {
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

    public static async getLoadedPackage(value: number|string): Promise<{dir: string, package: NetheritePackage}> {
        const packages = await this.listLoaded();

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