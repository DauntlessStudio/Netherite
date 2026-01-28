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
deno run -A jsr:@coldiron/netherite/install latest
```

## Getting Started
Let's go step-by-step and build a Netherite project, exploring some of the core features.

### Create New Project
You can generate a new project from the command line. A new directory will be created in your current working path that contains a basic project. Let's create a new project.

```
netherite init
```

Running this command will take you through a guided build process to get some information about your project, like the name, namespace, etc. For this demo, you can use the following values (for defaults you can just press Enter):

```
Please enter the name of the project: Demo
Please enter the author of the project: Me
Please enter the namespace of the project: me_demo
Please enter the format version of the project [default: 1.21.70]: default
Please enter the type of the project (world, add-on, skin-pack) [default: world]: default
Do you want to include a skin pack?: [y/N] y
Please enter the TypeScript framework of the project. Deno is highly recommended unless you are converting a node project (deno, node) [default: deno]: default
```

Netherite will spend a moment building and notify you when the project is ready. You should now have a "Demo" sub-directory. If you take a look at how it's organized, you should see the following:
```
Demo/
├── .vscode/
│   ├── launch.json
│   └── settings.json
├── dist/
│   ├── skin_pack/
│   │   └── ...
│   └── world_template/
│       └── ...
├── public/
│   ├── marketing/
│   │   └── *.png
│   └── store/
│       └── *.jpg
├── src/
│   ├── behavior_pack/
│   │   ├── scripts/
│   │   │   └── main.ts
│   │   ├── texts/
│   │   │   └── en_US.lang
│   │   └── pack_icon.png
│   ├── modules/
│   ├── resource_pack/
│   │   ├── texts/
│   │   │   └── en_US.lang
│   │   └── pack_icon.png
│   └── skin_pack/
│       ├── texts/
│       │   └── en_US.lang
│       └── skins.json
├── .gitignore
├── deno.json
├── deno.lock
├── netherite.config.ts
├── README.md
└── my_project.code-workspace
```

Don't be overwhelmed, we'll consider what these do one piece at a time. For now, if you are using VSCode, open the `my_project.code-workspace` file and familiarize yourself with the structure. Starting in the `dist/` directory, you'll find the contents of your project: the behavior pack and resource pack (you'll also have some world data and a skin_pack directory if you chose the `world` type and said `y` for the skin pack). The behavior and resource packs here are automatically synchronized to your `development_behavior_pack` and `development_resource_pack` directories. You should be able to add these packs to a world in Minecraft already, so go ahead and make a test world and attach them.

It's important to note, the `dist/` is your project's *output* and is built by Netherite. You shouldn't manually change any files in `dist/`, if you do **they will get overwritten**. Your project's *input* is in the `src/` directory, and if you look around there you'll see that the structure is much simpler. Many files in the `dist/` are automatically generated by Netherite, and you don't need to include them in the `src/`, for example the `manifest.json` files are all generated dynamically. Other files in `src/` will be processed and output when you build with Netherite.

We can see an example of that file processing with in `src/resource_pack/texts/en_US.lang`, in that file you'll see:

```lang
## PACK MANIFEST ============================================================================================
pack.name=NAME
pack.description=vVERSION by AUTHOR
```

If you compare that to the output file in `dist/` you'll see:

```lang
## PACK MANIFEST ========================================================================================================
pack.name=Demo
pack.description=v1.0.0 by Me
```

This is because one element of the file processing involves keyword replacement, specific words are dynamically replaced based on your project's config. This means that if you rename your project, update the version, etc. you just need to update the config and the rest of the project automatically updates. Netherite uses the following reserved keywords (note that these are always in all-caps):
- `FORMATVERSION`: The format version of your project, generally this should be the newest Minecraft version.
- `NAMESPACE`: The namespace of your project, generally in the format of `<team_name>_<project_id>` i.e. `me_demo`.
- `VERSION`: The current version of your project, starting with `1.0.0`.
- `AUTHOR`: The author of your project.
- `NAME`: The display name of your project.

These values are assigned in our project's config file, `netherite.config.ts`, ours should look like this (Your project will have a different `uuid` and may have a newer `format_version`):
```ts
import * as netherite from "@coldiron/netherite/api";

netherite.config({
    name: "Demo",
    author: "Me",
    namespace: "me_demo",
    type: "world",
    scripting: "deno",
    version: "1.0.0",
    format_version: "1.21.70",
    uuid: "d5a5d75f-7018-4d9e-8d31-76a39882489d",
    include_skin_pack: true,
});
```

### Adding Content
Now that you understand the relationship between the `src/` and `dist/`, let's add some content to the project. Generally, any files you create in the behavior or resource packs will be processed and sent to the output. You can create an item, block, or entity as normal with the exceptions of using `NAMESPACE:my_cool_entity` instead of `me_demo:my_cool_entity` and `format_version: "FORMATVERSION"` wherever you'd normally use the latest Minecraft version.

Once you've made some changes and are ready to see them in-game, run the command:
```
netherite build
```

After the build finishes, you should be able to see your new creation both in the `dist/` and in-game!

### Special Files
Most files are just processed and sent directly to the output, but some have special rules. Some of these will be explained in more detail later, but these are the special files:
- `manifest.json`: All of your project's manifest files are automatically generated when you build. If you change your config's uuid, then all your manifest uuids will change as well. The behavior pack manifest includes the scripting modules for the `@minecraft/server` and `@minecraft/server-ui` modules, and the version information will be automatically sourced from your `deno.json` file, making sure that the version you're working with in VSCode is always the same version you have with in Minecraft.
- `languages.json`: Your resource pack's languages list is automatically generated based on the existing `*.lang` files in your project. By default Netherite will create an `en_US.lang` but if you were to add an `en_GB.lang` file for instance, your languages list will automatically update to include both languages.
- `*.lang`, `sounds.json`, `sound_definitions.json`, `blocks.json`, `terrain_texture.json`, and `item_texture.json`: These resource files will dynamically merge the input from all your modules and default resource pack together into a single output. Your default resource pack always takes priority, so a duplicate entry in a module can be overwritten by your project's entry.
- `scripts/*.ts`: The TypeScript files in your behavior pack's scripts will by automatically compiled into `main.js` in your output. Note that `main.ts` is treated as the entry point for your input, so only files referenced by `main.ts` will be built.

### Scripting
As mentioned above, scripting in Netherite is intended to be done in TypeScript. This is not required, you could delete `main.ts`, replace it with `main.js` and do all your work in vanilla JavaScript. TypeScript is recommended however, as it affords you the benifits of type-safety and improved code completion in your editor. Running `netherite build` will also build your TypeScript files into a single JavaScript output, `main.js`.

Your output also maintains source maps, meaning that you place breakpoints in your TypeScript source files and they will break in the debugger if you have the [Minecraft Debugger Extension](https://marketplace.visualstudio.com/items?itemName=mojang-studios.minecraft-debugger).

### Modules
A strong focus of Netherite is to improve modularity and make efficient use of development time. Keywords allow for easy dragging and dropping of files between projects is one way this goal is realized. But the primary benefit is gained through the use of modules.

A Netherite module is a self-contained miniature project that gets dynamically merged into the larger project. Allowing for custom blocks, entities, items, scripting systems, etc. to be modularly shared between different projects. Netherite even includes tools to store your modules online and version them, semantically a module refers to one of these modular sub-projects and a package refers to a module stored online. Packages are stored online as Git repositories, which has the pros of being easy, free to use and simple to handle authentication needs for public or private packages. The tradeoff is that, although publishing and working with packages through Netherite will enforce version immutability, a manual change to a Git repo will not, so be conscientious.

Let's get started with making a module of our own (Note that this demo will include publishing your package to GitHub, if you don't want to do that, you can ignore those steps). Let's start by running the command:

```
netherite package create
```

This will also take you through a simple guided process:

```
Please enter the name of the package: Blocky
Please enter the description of the package: A blocky entity.
Do you want to publish the package using the GitHub Command Line Tool?: [y/N] y
```

If you respond `y` to the GitHub question, the GitHub command line tool will take over and guide you through publishing your repo. If you don't have the GitHub command line tool, or don't want to bother with publishing a package right now, feel free to say `N`.

After running those commands, your modules folder should now look like this:

```
modules/
└── Blocky/
    └── netherite.package.json
```

As mentioned, a module is basically a small project. So within the `Blocky/` directory you can create subdirectories called `BP/` and `RP/` and anything you make in those folders will be dynamically merged into the output of your final project. Including sound definitions, lang entries, terrain and item textures, etc. And since Netherite automatically converts keywords like `NAMESPACE`, if you download your new `Blocky` package into a different Netherite project, you wouldn't need to make any updates before seeing your package contents in-game. It's important to note that your **core project always takes priority** over modules, meaning if you make a lang entry in `Blocky/RP/texts/en_US.lang` saying `entity.NAMESPACE.blocky:name=Blocky` but your core project has an entry at `src/resource_pack/texts/en_US.lang` saying `entity.NAMESPACE:blocky.name=Blocko`, the output in your dist will be `Blocko`. This prioritization is important, since a module may get used in multiple projects and you want to be able to make minor changes to it without needing to update your module for each project.

#### Minecraft Scripting in Modules
You can create scripting libraries in modules too, which can be really convenient way to share useful functions between multiple projects. As an example, let's make a simple utility script at `Blocky/scripts/utility.ts`. Inside that script you can use the following code:

```ts
import * as mc from "@minecraft/server";

export function sleep(ticks: number): Promise<void> {
    return new Promise(resolve => {
        mc.system.runTimeout(resolve, ticks);
    });
}
```

This is a simple sleep function that let's you use the `async/await` syntax to wait a few ticks before continuing. Now we can import this in `src/behavior_pack/scripts/main.ts` with some code like this:

```ts
import * as mc from "@minecraft/server";
import { sleep } from "../../modules/Blocky/scripts/utility.ts";

function main() {
    console.log("Loaded [Test]!");
}

// Our event that uses the sleep function
mc.world.afterEvents.itemUse.subscribe(async event => {
    event.source.sendMessage(`Exploding in 10 seconds...`);
    await sleep(200);
    event.source.dimension.createExplosion(event.source.location, 3, {breaksBlocks: false});
});

mc.system.run(main);
```

If you run

```
netherite build
```

Then in game, when you use an item you should get a warning about an explosion, then ten seconds later you'll explode. This is pretty cool, but `import { sleep } from "../../modules/Blocky/scripts/utility.ts";` is a pretty awkward line to write, luckily we can simplify this with a simple change to our `deno.json` file:

```json
{
	"exclude": [
		"dist"
	],
	"imports": {
		"@coldiron/netherite": "jsr:@coldiron/netherite@^0.0.1-beta.0",
		"@minecraft/server": "npm:@minecraft/server@^1.18.0",
		"@minecraft/server-ui": "npm:@minecraft/server-ui@^1.3.0",
		"blocky": "./src/modules/Blocky/scripts/utility.ts" // Our new line
	}
}
```

By adding `blocky` as an imported module that points to our utility script, we can update our `main.ts` file as so:

```ts
import * as mc from "@minecraft/server";
import { sleep } from "blocky";

function main() {
    console.log("Loaded [Test]!");
}

// Our event that uses the sleep function
mc.world.afterEvents.itemUse.subscribe(async event => {
    event.source.sendMessage(`Exploding in 10 seconds...`);
    await sleep(200);
    event.source.dimension.createExplosion(event.source.location, 3, {breaksBlocks: false});
});

mc.system.run(main);
```

`import { sleep } from "blocky";` is a much nicer looking import, and it lets us use it in other files easily without needing to update our relative import path.

#### Netherite Scripting in Modules
One more powerful use of modules in Netherite is the ability to write code that output Minecraft files for us. If you have 20 entities that all share the same behavior base but just need some minor variations between them, or you create an entity that needs 1000 `minecraft:variant` component groups, these are really easily accomplished with Module Scripts. Let's demonstrate both of these, let's make the file `Blocky/blocky.mod.ts` (note the `.mod.ts` extension is what tells Netherite that this file runs code for your module):

```ts
import * as netherite from "@coldiron/netherite/api";

new netherite.MinecraftServerEntity({
    "minecraft:entity": {
        description: {
            identifier: "NAMESPACE:blocky"
        }
    }
});
```

If you run `netherite build` now, you'll get an output entity in your behavior pack called `blocky.json`. These API classes are meant to be as close to working on vanilla files as possible, so all your existing Bedrock development knowledge is directly transferrable to working with Module Scripts. But because this is executable TypeScript code, we can do some cool stuff, like:

```ts
import * as netherite from "@coldiron/netherite/api";

const blocky = new netherite.MinecraftServerEntity({
    "minecraft:entity": {
        description: {
            identifier: "NAMESPACE:blocky"
        }
    }
});

for (let index = 0; index < 1000; index++) {
    blocky.modify({
        "minecraft:entity": {
            component_groups: {
                [`variant_${index}`]: {
                    "minecraft:variant": {
                        value: index
                    }
                }
            },
            events: {
                [`set_variant_${index}`]: {
                    add: {
                        component_groups: [
                            `variant_${index}`
                        ]
                    }
                }
            }
        }
    });
}
```

And after running `netherite build`, just like that you've got an entity with 1000 variants!
