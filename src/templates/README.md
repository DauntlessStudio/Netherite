# PROJECTNAME
This is a Minecraft Bedrock project made using Netherite. It provides support for writing your game scripts in TypeScript and building them for you, as well as writing TypeScript modules that can be used to generate your project's files.

## Project Overview
Your project structure should look something like this:
```
.
├── netherite.config.ts
├── deno.json
├── deno.lock
├── .gitignore
├── src/
│   ├── behavior_pack/
│   │   └── scripts/
│   │       └── main.ts
│   ├── resource_pack
│   └── modules/
│       └── sample/
│           ├── BP
│           ├── RP
│           └── sample.mod.ts
└── dist/
    └── Content/
        ├── behavior_packs/
        │   └── your_pack_bp
        └── resource_packs/
            └── your_pack_rp
```
All of the contents of `dist` are generated automatically by Netherite **if you make changes in dist they will be overwritten**. You can work in the `src` directory. It can be treated like a normal project and the files will be automatically built to the `dist` and synchronized with your Minecraft development pack directories. However it provides two additional functions:
1. You can write your behavior_pack scripts with TypeScript, allowing you to have complete type safety in your development process. This will build to a single `main.js` file in your `dist` output.
2. You can create add modules to the `modules` directory. These have the structure of a `BP` and `RP` directory, as well as the module's `*.mod.ts` file which can provide additional functionality like generating 100 variants of a given entity. Note that if you include a `BP/scripts` folder you can reference it in your primary behavior pack scripts to have your module's scripts built as well.