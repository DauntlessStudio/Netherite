import type { WriteableResponse, ModuleResponse } from "../../core/core.ts";
import { MinecraftWriteable } from "./minecraft_writeable.ts";
import { Image, parseDataUrl } from "@cross/image";

const baseImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9TpSKVDhYUcchQnSyIiugmVSyChdJWaNXB5KV/0KQhSXFxFFwLDv4sVh1cnHV1cBUEwR8QVxcnRRcp8b6k0CLGC4/3cd49h/fuA4RGhalm1zigapaRisfEbG5VDLzChwGEIGBWYqaeSC9m4Flf99RNdRflWd59f1afkjcZ4BOJ55huWMQbxNObls55nzjMSpJCfE48ZtAFiR+5Lrv8xrnosMAzw0YmNU8cJhaLHSx3MCsZKvEUcURRNcoXsi4rnLc4q5Uaa92TvzCY11bSXKc1jDiWkEASImTUUEYFFqK0a6SYSNF5zMM/5PiT5JLJVQYjxwKqUCE5fvA/+D1bszA54SYFY0D3i21/jACBXaBZt+3vY9tungD+Z+BKa/urDWDmk/R6W4scAaFt4OK6rcl7wOUOMPikS4bkSH5aQqEAvJ/RN+WA/lugd82dW+scpw9Ahma1fAMcHAKjRcpe93h3T+fc/u1pze8HhnFyr/SPB18AAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnARcPAy7LnN49AAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAHVJREFUOMtj3HLl4X8GPGB+72R80gwsDAwMDBYqMlglT9x5wsDAwMAgLS6BVf7pyxcMTAwUglEDoLEAC21c4OnLF7gNWP5CGK/mhapChF2gIMGNVfLBi68MDAwMDNyKcljlv95/NBqNVEsHsNDGBb7ef4RTDgDbDx58M8mkIwAAAABJRU5ErkJggg=="

export class MinecraftTexture extends MinecraftWriteable<Image, Image> {
    public static createFromTemplate(outPath: string): Promise<MinecraftTexture> {
        return new Promise<MinecraftTexture>(resolve => {
            Image.decode(parseDataUrl(baseImage).bytes, "png").then(value => {
                resolve(new MinecraftTexture(value, outPath))
            });
        });
    }

    public static createFromFile(filepath: string, outPath: string): Promise<MinecraftTexture> {
        return new Promise<MinecraftTexture>(resolve => {
            Image.decode(Deno.readFileSync(filepath), "png").then(value => {
                resolve(new MinecraftTexture(value, outPath));
            });
        });
    }

    public static makeImage(...args: Parameters<typeof Image.create>): Image {
        return Image.create(...args);
    }

    public static readImage(filepath: string): Promise<Image> {
        return new Promise<Image>(resolve => {
            Image.decode(Deno.readFileSync(filepath), "png").then(value => {
                resolve(value);
            });
        });
    }

    public get Texture() : Image {
        return this.minecraftObj;
    }
    
    public override get Identifier(): string {
        return this.outPath;
    }

    private constructor(image: Image, private readonly outPath: string) {
        super(image);
    }

    protected override validate(): Image {
        return this.minecraftObj;
    }

    protected async generate(): Promise<WriteableResponse<ModuleResponse>> {
        const response = {
            endpoint: `RP/textures/${this.Identifier}`,
            response: {
                name: `${this.Identifier}`,
                data: Array.from(await this.Texture.encode("png")),
            },
        };

        return response;
    }
}