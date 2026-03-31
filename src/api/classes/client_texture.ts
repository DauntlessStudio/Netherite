import { type WriteableResponse, type ModuleResponse, type ModuleWriteable, ModuleWriter } from "../../core/core.ts";
import { Image, parseDataUrl } from "@cross/image";

const baseImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9TpSKVDhYUcchQnSyIiugmVSyChdJWaNXB5KV/0KQhSXFxFFwLDv4sVh1cnHV1cBUEwR8QVxcnRRcp8b6k0CLGC4/3cd49h/fuA4RGhalm1zigapaRisfEbG5VDLzChwGEIGBWYqaeSC9m4Flf99RNdRflWd59f1afkjcZ4BOJ55huWMQbxNObls55nzjMSpJCfE48ZtAFiR+5Lrv8xrnosMAzw0YmNU8cJhaLHSx3MCsZKvEUcURRNcoXsi4rnLc4q5Uaa92TvzCY11bSXKc1jDiWkEASImTUUEYFFqK0a6SYSNF5zMM/5PiT5JLJVQYjxwKqUCE5fvA/+D1bszA54SYFY0D3i21/jACBXaBZt+3vY9tungD+Z+BKa/urDWDmk/R6W4scAaFt4OK6rcl7wOUOMPikS4bkSH5aQqEAvJ/RN+WA/lugd82dW+scpw9Ahma1fAMcHAKjRcpe93h3T+fc/u1pze8HhnFyr/SPB18AAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnARcPAy7LnN49AAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAHVJREFUOMtj3HLl4X8GPGB+72R80gwsDAwMDBYqMlglT9x5wsDAwMAgLS6BVf7pyxcMTAwUglEDoLEAC21c4OnLF7gNWP5CGK/mhapChF2gIMGNVfLBi68MDAwMDNyKcljlv95/NBqNVEsHsNDGBb7ef4RTDgDbDx58M8mkIwAAAABJRU5ErkJggg=="

/**
 * A class for working with texture data directly.
 */
export class MinecraftClientTexture {
    /**
     * Create a blank image with the specified dimensions and color
     * @param width Image width
     * @param height Image height
     * @param r Red component (0-255, default: 0)
     * @param g Green component (0-255, default: 0)
     * @param b Blue component (0-255, default: 0)
     * @param a Alpha component (0-255, default: 255)
     * @returns Image instance
     */
    public static makeImage(...args: Parameters<typeof Image.create>): Image {
        return Image.create(...args);
    }

    /**
     * Makes an image based on the standard 16x16 Blockbench template
     * @returns A promise resloving to the image instance of the template.
     */
    public static makeImageFromTemplate(): Promise<Image> {
        return new Promise<Image>(resolve => {
            Image.decode(parseDataUrl(baseImage).bytes, "png").then(value => {
                resolve(value)
            });
        });
    }

    /**
     * Reads an image from a filepath. Will throw errors if the filepath is invalid.
     * @param filepath The filepath to read an image from.
     * @returns A promise resolving to the image.
     */
    public static readImage(filepath: string): Promise<Image> {
        return new Promise<Image>(resolve => {
            Image.decode(Deno.readFileSync(filepath), "png").then(value => {
                resolve(value);
            });
        });
    }

    /**
     * The image data associated with this {@link MinecraftClientTexture}.
     */
    public get Texture() : Image {
        return this.image;
    }

    /**
     * Create a writer for the image data.
     * @param image The Image to use as the output.
     * @param outPath The subpath within `RP/textures/` to write to.
     */
    constructor(private readonly image: Image, private readonly outPath: string) {
        ModuleWriter.register(this as unknown as ModuleWriteable); // Type conversion to exposed protected generate to worker.
    }

    protected async generate(): Promise<WriteableResponse<ModuleResponse>> {
        const response = {
            endpoint: `RP/textures/${this.outPath}`,
            response: {
                name: `${this.outPath}`,
                data: Array.from(await this.Texture.encode("png")),
            },
        };

        return response;
    }
}