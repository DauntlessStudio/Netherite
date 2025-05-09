import { Config } from "../../core/classes/index.ts";
import { TemplateFile } from "../template.ts";

const contents = async () => JSON.stringify({
	"version": "0.3.0",
	"configurations": [
		{
			"type": "minecraft-js",
			"request": "attach",
			"name": "Debug with Minecraft",
			"mode": "listen",
			"targetModuleUuid": await Config.getUUID("script"),
			"sourceMapRoot": "${workspaceFolder}/" + Config.Paths.bp.scripts.replace("./", ""),
			"localRoot": "${workspaceFolder}/src/behavior_pack/scripts/",
			"port": 19144
		}
	]
}, null, "\t");

new TemplateFile({
	type: "text",
	out: [".vscode/launch.json"],
	conditions: [() => Config.Options.type !== "skin-pack"],
	contents,
});