import type { WorkerResponse, ModuleResponse } from "../../core/core.ts";
import type { ClientGeometryLoose, ClientGeometryStrict } from "../types/index.d.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";

export class MinecraftClientGeometry extends MinecraftWriteable<ClientGeometryLoose, ClientGeometryStrict> {
    public static cube(name: string, subpath: string): MinecraftClientGeometry {
        return new MinecraftClientGeometry({
            format_version: "1.12.0",
            "minecraft:geometry": [
                {
                    description: {
                        identifier: `geometry.NAMESPACE.${name}`,
                        texture_width: 64,
                        texture_height: 64,
                        visible_bounds_width: 2,
                        visible_bounds_height: 2,
                        visible_bounds_offset: [0, 0.5, 0],
                    },
                    bones: [
                        {
                            name: "body",
                            pivot: [0, 0, 0],
                            cubes: [
                                {
                                    origin: [-8, 0, -8],
                                    size: [16, 16, 16],
                                    uv: [0, 0],
                                }
                            ]
                        }
                    ]
                }
            ]
        }, name, subpath);
    }

    public static armor(name: string): MinecraftClientGeometry {
        return new MinecraftClientGeometry({
            format_version: "1.8.0",
            [`geometry.NAMESPACE.player.${name}.base` as "geometry.base"]: {
                texturewidth: 64,
                textureheight: 64,
                visible_bounds_width: 3,
                visible_bounds_height: 3,
                visible_bounds_offset: [0, 1.5, 0],
                bones: [
                    {
                        "name": "waist",
                        "pivot": [0, 12, 0]
                    },
                    {
                        "name": "body",
                        "parent": "waist",
                        "pivot": [0, 24, 0],
                        "cubes": [
                            { "origin": [-4, 12, -2], "size": [8, 12, 4], "uv": [16, 16], "inflate": 1.01 }
                        ]
                    },
                    {
                        "name": "head",
                        "parent": "body",
                        "pivot": [0, 24, 0],
                        "cubes": [
                            { "origin": [-4, 24, -4], "size": [8, 8, 8], "uv": [0, 0], "inflate": 1 }
                        ]
                    },
                    {
                        "name": "hat",
                        "parent": "head",
                        "pivot": [0, 24, 0],
                        "cubes": [
                            { "origin": [-4, 24, -4], "size": [8, 8, 8], "uv": [32, 0], "inflate": 1 }
                        ]
                    },
                    {
                        "name": "rightArm",
                        "parent": "body",
                        "pivot": [-5, 22, 0],
                        "cubes": [
                            { "origin": [-8, 12, -2], "size": [4, 12, 4], "uv": [40, 16], "inflate": 1 }
                        ]
                    },
                    {
                        "name": "rightItem",
                        "parent": "rightArm",
                        "pivot": [-6, 15, 1]
                    },
                    {
                        "name": "leftArm",
                        "parent": "body",
                        "pivot": [5, 22, 0],
                        "mirror": true,
                        "cubes": [
                            { "origin": [4, 12, -2], "size": [4, 12, 4], "uv": [40, 16], "inflate": 1 }
                        ]
                    },
                    {
                        "name": "torso",
                        "parent": "body",
                        "pivot": [0, 24, 0],
                        "cubes": [
                            { "origin": [-4, 12, -2], "size": [8, 12, 4], "uv": [16, 48], "inflate": 0.5 }
                        ]
                    },
                    {
                        "name": "rightLeg",
                        "parent": "body",
                        "pivot": [-1.9, 12, 0],
                        "cubes": [
                            { "origin": [-3.9, 0, -2], "size": [4, 12, 4], "uv": [0, 48], "inflate": 0.49 }
                        ]
                    },
                    {
                        "name": "rightBoot",
                        "parent": "rightLeg",
                        "pivot": [-1.9, 12, 0],
                        "cubes": [
                            { "origin": [-3.9, 0, -2], "size": [4, 12, 4], "uv": [0, 16], "inflate": 1 }
                        ]
                    },
                    {
                        "name": "leftLeg",
                        "parent": "body",
                        "pivot": [1.9, 12, 0],
                        "mirror": true,
                        "cubes": [
                            { "origin": [-0.1, 0, -2], "size": [4, 12, 4], "uv": [0, 48], "inflate": 0.49 }
                        ]
                    },
                    {
                        "name": "leftBoot",
                        "parent": "leftLeg",
                        "pivot": [1.9, 12, 0],
                        "mirror": true,
                        "cubes": [
                            { "origin": [-0.1, 0, -2], "size": [4, 12, 4], "uv": [0, 16], "inflate": 1 }
                        ]
                    }
                ],
            },
            [`geometry.NAMESPACE.player.${name}.helmet:geometry.NAMESPACE.player.${name}.base` as "geometry.helmet"]: {
                bones: [
                    {
                        "name": "body",
                        "neverRender": true
                    },
                    {
                        "name": "torso",
                        "neverRender": true
                    },
                    {
                        "name": "rightArm",
                        "neverRender": true
                    },
                    {
                        "name": "leftArm",
                        "neverRender": true
                    },
                    {
                        "name": "rightLeg",
                        "neverRender": true
                    },
                    {
                        "name": "leftLeg",
                        "neverRender": true
                    },
                    {
                        "name": "rightBoot",
                        "neverRender": true
                    },
                    {
                        "name": "leftBoot",
                        "neverRender": true
                    }
                ]
            },
            [`geometry.NAMESPACE.player.${name}.chestplate:geometry.NAMESPACE.player.${name}.base` as "geometry.chestplate"]: {
                bones: [
                    {
                        "name": "head",
                        "neverRender": true
                    },
                    {
                        "name": "hat",
                        "neverRender": true
                    },
                    {
                        "name": "torso",
                        "neverRender": true
                    },
                    {
                        "name": "rightLeg",
                        "neverRender": true
                    },
                    {
                        "name": "leftLeg",
                        "neverRender": true
                    },
                    {
                        "name": "rightBoot",
                        "neverRender": true
                    },
                    {
                        "name": "leftBoot",
                        "neverRender": true
                    }
                ]
            },
            [`geometry.NAMESPACE.player.${name}.leggings:geometry.NAMESPACE.player.${name}.base` as "geometry.leggings"]: {
                bones: [
                    {
                        "name": "body",
                        "neverRender": true
                    },
                    {
                        "name": "head",
                        "neverRender": true
                    },
                    {
                        "name": "hat",
                        "neverRender": true
                    },
                    {
                        "name": "rightArm",
                        "neverRender": true
                    },
                    {
                        "name": "leftArm",
                        "neverRender": true
                    },
                    {
                        "name": "rightBoot",
                        "neverRender": true
                    },
                    {
                        "name": "leftBoot",
                        "neverRender": true
                    }
                ]
            },
            [`geometry.NAMESPACE.player.${name}.boots:geometry.NAMESPACE.player.${name}.base` as "geometry.boots"]: {
                bones: [
                    {
                        "name": "head",
                        "neverRender": true
                    },
                    {
                        "name": "hat",
                        "neverRender": true
                    },
                    {
                        "name": "body",
                        "neverRender": true
                    },
                    {
                        "name": "torso",
                        "neverRender": true
                    },
                    {
                        "name": "rightArm",
                        "neverRender": true
                    },
                    {
                        "name": "leftArm",
                        "neverRender": true
                    },
                    {
                        "name": "rightLeg",
                        "neverRender": true
                    },
                    {
                        "name": "leftLeg",
                        "neverRender": true
                    }
                ]
            },
        }, name, "entity/player");
    }

    public static skeletalAttachable(name: string): MinecraftClientGeometry {
        return new MinecraftClientGeometry({
            format_version: "1.12.0",
            "minecraft:geometry": [
                {
                    description: {
                        identifier: `geometry.NAMESPACE.player.${name}`,
                        texture_height: 32,
                        texture_width: 32,
                        visible_bounds_width: 3,
                        visible_bounds_height: 4.5,
                        visible_bounds_offset: [0, 1.75, 0],
                    },
                    bones: [
                        {
                            name: "root",
                            pivot: [0, 0, 0]
                        },
                        {
                            name: "waist",
                            parent: "root",
                            pivot: [0, 12, 0]
                        },
                        {
                            name: "body",
                            parent: "waist",
                            pivot: [0, 24, 0]
                        },
                        {
                            name: "head",
                            parent: "body",
                            pivot: [0, 24, 0]
                        },
                        {
                            name: "hat",
                            parent: "head",
                            pivot: [0, 24, 0]
                        },
                        {
                            name: "cape",
                            parent: "body",
                            pivot: [0, 24, 3]
                        },
                        {
                            name: "leftArm",
                            parent: "body",
                            pivot: [5, 22, 0]
                        },
                        {
                            name: "leftSleeve",
                            parent: "leftArm",
                            pivot: [5, 22, 0]
                        },
                        {
                            name: "leftItem",
                            parent: "leftArm",
                            pivot: [6, 15, 1]
                        },
                        {
                            name: "rightArm",
                            parent: "body",
                            pivot: [-5, 22, 0]
                        },
                        {
                            name: "rightSleeve",
                            parent: "rightArm",
                            pivot: [-5, 22, 0]
                        },
                        {
                            name: "rightItem",
                            parent: "rightArm",
                            pivot: [-6, 15, 1]
                        },
                        {
                            name: name,
                            parent: "rightItem",
                            pivot: [-6, 8, 0],
                            cubes: [
                                { origin: [-10, 4, -4], size: [8, 8, 8], uv: [0, 0] }
                            ]
                        },
                        {
                            name: "jacket",
                            parent: "body",
                            pivot: [0, 24, 0]
                        },
                        {
                            name: "leftLeg",
                            parent: "root",
                            pivot: [1.9, 12, 0]
                        },
                        {
                            name: "leftPants",
                            parent: "leftLeg",
                            pivot: [1.9, 12, 0]
                        },
                        {
                            name: "rightLeg",
                            parent: "root",
                            pivot: [-1.9, 12, 0]
                        },
                        {
                            name: "rightPants",
                            parent: "rightLeg",
                            pivot: [-1.9, 12, 0]
                        }
                    ]
                }
            ]
        }, name, "entity/player");
    }

    public get Identifier() : string {
        return this.name;
    }

    constructor(obj: ClientGeometryLoose, protected readonly name: string, protected readonly subpath: string) {
        super(obj);
    }
    
    protected validate(): ClientGeometryStrict {
        return this.minecraftObj as ClientGeometryStrict;
    }

    public generate(): WorkerResponse<ModuleResponse> {
        return {
            endpoint: `RP/models/${this.subpath}/${this.name}.geo.json`,
            response: {
                name: this.Shortname,
                data: this.encode(),
            }
        }
    }
}