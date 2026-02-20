import Random from "../Utils/Math/Random.ts";

export default class TextureSet
{
    textures: HTMLImageElement[];

    constructor(selector: string) {
        this.textures = [];

        document.querySelectorAll<HTMLImageElement>(selector).forEach((img) => {
            this.textures.push(img);
        })
    }

    random(): HTMLImageElement
    {
        const i = Math.round(Random(0, this.textures.length - 1));
        return this.textures[i]
    }
}