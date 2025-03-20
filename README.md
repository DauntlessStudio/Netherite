# Netherite
Netherite is a framework for developing Minecraft Bedrock projects, including worlds, add-ons, and skin packs. It provides a command-line interface for working with Netherite projects, as well as an API for working within a Netherite project. Netherite is built with [Deno](https://github.com/denoland/deno) using TypeScript.

Netherite seeks to reduce the frustation in and speed up the development of Minecraft Bedrock projects. It generally provides features that work on top of or alongside vanilla development (i.e. making a Bedrock project by working directly with Bedrock files and not being assisted via tools), as opposed to fundamentally changing the way a project is created.

## Feature Overview
- Create projects easily by running `netherite init` and letting it walk you through the project's creation and even uploading it to GitHub.
- Sync your projects to the development packs. You can conviently keep your behavior and resource packs together during development, and the `netherite build` command will sync your project to the `development_behavior_packs` and `development_resource_packs` directories of Minecraft to streamline seeing your changes in-game.
- Write scripts in TypeScript, any TypeScript files in your scripts directory will automatically be compiled into regular JavaScript files during the build. This affords the benefits of type-safety and improved code-completion support with most IDEs. Working in TypeScript is not required, you can use vanilla JS if prefered, or even mix and match.
- Work modularly with Netherite's module support. You can create micro-projects in your `modules` directory that will get dynamically mixed into your project. This allows you to easily drag and drop entities, items, blocks, scripts, etc. from project to project with no additional setup. You can even store modules online, as Netherite provides commands for using GitHub repositories as package storage.
- Dynamically generate files, any `*.mod.ts` file in your `modules` directory can interface with Netherite's API to generate files as part of the build process. This can be very useful when you have dozens or even hundreds of entities that share a similar base of behaviors or visuals.
- Export your finished project easily with `netherite export`, this allows you to quickly prepare your package as a world, template or for submitting to the Minecraft Marketplace.

## Installation

### Dependencies
Netherite depends on Deno, so see their [installation guide](https://github.com/denoland/deno?tab=readme-ov-file#installation) to get set up. Netherite also makes calls to other programs under the hood, you can use many of its features without them but to have access to the full range of Netherite's capabilities you should also install:
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) is used in the `netherite validate` command in order to use the Minecraft Creator Tools for project validation. This dependency will hopefully be removed in the future.
- [GitHub Command Line Tool](https://cli.github.com/) is used when creating projects and packages. Make sure to authenticate the tool with `gh auth login`.
- [Visual Studio Code](https://code.visualstudio.com/download) you can work with Netherite projects using whatever editor you prefer, but Netherite will automatically generate helpful files for VSCode to get into development quickly.

### Installing Netherite
You can use Deno to install Netherite with the following command
```
deno run -A jsr:@coldiron/netherite/install
```
