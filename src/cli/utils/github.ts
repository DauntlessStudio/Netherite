import * as path from "@std/path";
import { Logger } from "../../core/utils/index.ts";

interface GitHubAPIResponse {
    login: string;
}

export interface GitHubPublishData {
    name: string;
    description: string;
    owner: string;
}

/**
 * @remarks Uses the gh api to return a list of users/orgs this user can create a repo in and prompts them to select one.
 * @returns The string for the owner.
 */
export async function getNewRepoOwner(): Promise<string> {
    try {
        await new Deno.Command("gh", { args: ["--version"] }).output();
    } catch (_error) {
        Logger.error("Required program 'gh' is not installed. Please install and try again https://cli.github.com/");
        Deno.exit(1);
    }

    const owners: string[] = [];

    const userResult = await new Deno.Command("gh", { args: ["api", "user"], stdout: "piped" }).output();

    if (userResult.success) {
        const response = JSON.parse(new TextDecoder().decode(userResult.stdout)) as GitHubAPIResponse;
        owners.push(response.login);
    }

    const orgsResult = await new Deno.Command("gh", { args: ["api", "user/orgs"], stdout: "piped" }).output();

    if (orgsResult.success) {
        const response = JSON.parse(new TextDecoder().decode(orgsResult.stdout)) as GitHubAPIResponse[];
        response.forEach(r => owners.push(r.login));
    }

    let index: number = NaN;

    while (Number.isNaN(index)) {
        for (let i = 0; i < owners.length; i++) {
            console.log(`[${Logger.Colors.green(i.toString())}]: ${Logger.Colors.green(owners[i])}`);
        }

        index = Number(prompt("Enter the index of the code owner:"));

        if (index < 0 || index >= owners.length) {
            Logger.warn(`Invalid response, must be a number between 0 and ${owners.length - 1}`);
            index = NaN;
        }
    }

    return owners[index];
}

/**
 * @remarks Publishes the current working directory to a new GitHub repo.
 * @param publish The options to publish: owner, description, and name.
 * @param preCommit A callback to be executed after successfully creating the repo and before publishing the initial commit.
 * @returns The URL of the newly created repository.
 */
export async function publishToGitHub(publish: GitHubPublishData, preCommit?: (url: string) => void): Promise<string> {
    await new Deno.Command("git", { args: ["init"] }).output();

    const command = await new Deno.Command("gh", { args: ["repo", "create", `${publish.owner}/${publish.name}`, "--private", "--description", publish.description, "--source", ".", "--remote", "origin"] }).output();

    if (command.success) {
        const gitConfig = Deno.readTextFileSync(path.join(Deno.cwd(), ".git", "config"));
        const gitConfigLines = gitConfig.split("\n");
        const urlLine = gitConfigLines.find(line => line.includes("url = "));
        const url = urlLine?.split(" = ")[1].trim();

        if (url) {
            preCommit?.(url);

            await new Deno.Command("git", {args: ["remote", "add", "origin", url]}).output();
            await new Deno.Command("git", {args: ["add", "."]}).output();
            await new Deno.Command("git", {args: ["commit", "-m", "Initial Commit"]}).output();
            await new Deno.Command("git", {args: ["push", "-u", "origin", "main"]}).output();

            return url;
        } else {
            throw new Error("Publish apparantly succeeded, but failed to find publish url");
        }
    } else {
        throw new Error("Failed to create repository: " + new TextDecoder().decode(command.stderr));
    }
}

export async function addLabelsToRepo(shouldPrompt: boolean = false): Promise<void> {
    if (shouldPrompt && !confirm("Do you want to publish useful GitHub labels like '🔧 behavior'?:")) {
        return;
    }

    try {
        await new Deno.Command(`gh`, {args: ["label", "create", "🎨 animation", "-c", "#0E8A16"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "🔫 attachable", "-c", "#D93F0B"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "🔧 behavior", "-c", "#D93F0B"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "🦟 bug", "-c", "#D93F0B"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "🧱 build", "-c", "#FC06Bf"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "🏁 finalization", "-c", "#BFD4F2"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "🖼️ graphic", "-c", "#006B75"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "☝ HIGH PRIORITY", "-c", "#B60205"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "🎨 model", "-c", "#0E8A1b"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "✨ particle", "-c", "#5319E7"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "🔊 sound", "-c", "#0052CC"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "🎨 sprite", "-c", "#0E8A16"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "⌨ system", "-c", "#BFDADC"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "📅 TBD", "-c", "#BFD4F2"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "🎨 texture", "-c", "#0E8A16"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "🖥 UI", "-c", "#1D76DB"]}).output();
        await new Deno.Command(`gh`, {args: ["label", "create", "🌟 wishlist - low priority", "-c", "#FBCA04"]}).output();
    } catch (error) {
        Logger.error(`Failed to publish: ${error}`);
    }

    Logger.log("Published Labels");
}