# Netherite
Netherite is a framework for developing Minecraft Bedrock projects, including worlds, add-ons, and skin packs. It provides a command-line interface for working with Netherite projects, as well as an API for working within a Netherite project. Netherite is built with [Deno](https://github.com/denoland/deno) using TypeScript.

Netherite seeks to reduce the frustation in and speed up the development of Minecraft Bedrock projects. It generally provides features that work on top of or alongside vanilla development (i.e. making a Bedrock project by working directly with Bedrock files and not being assisted via tools), as opposed to fundamentally changing the way a project is created.

## Feature Overview
- Create projects easily by running `netherite init` and letting it walk you through the project's creation and even uploading it to GitHub.
- Sync your projects to the development packs. You can conviently keep your behavior and resource packs together during development, and the `netherite build` command will sync your project to the `development_behavior_packs` and `development_resource_packs` directories of Minecraft to streamline seeing your changes in-game.

## Installation

### Dependencies
Netherite depends on Deno, so see their [installation guide](https://github.com/denoland/deno?tab=readme-ov-file#installation) to get set up. Netherite also makes calls to other programs under the hood, you can use many of its features without them but to have access to the full range of Netherite's capabilities you should also install:
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) is used in the `netherite validate` command in order to use the Minecraft Creator Tools for project validation. This dependency will hopefully be removed in the future.
- [GitHub Command Line Tool](https://cli.github.com/) is used when creating projects and packages. Make sure to authenticate the tool with `gh auth login`.

### Installing Netherite
You can use Deno to install Netherite with the following command
```
deno run -A jsr:@coldiron/netherite/install
```
