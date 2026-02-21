export default class Texture {
    private readonly texture: HTMLImageElement;

    constructor(selector: string) {
        this.texture = document.querySelector<HTMLImageElement>(selector)!
    }

    get Texture()
    {
        return this.texture;
    }
}