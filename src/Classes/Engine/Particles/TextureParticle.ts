import type Game from "../General/Game.ts";
import BaseParticle from "./BaseParticle.ts";
import rotateCanvas from "../Utils/rotateCanvas.ts";

export default class TextureParticle<GT extends Game<GT>> extends BaseParticle<GT>
{
    width: number;
    height: number;
    texture: HTMLImageElement;

    constructor(width: number, height: number, texture: HTMLImageElement) {
        super();
        this.width = width;
        this.height = height;
        this.texture = texture;
    }

    private Width(scale: number) {
        return this.width * scale;
    }

    private Height(scale: number) {
        return this.height * scale;
    }

    //@ts-ignore
    override draw(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number) {
        rotateCanvas(game.ctx, rotation, x, y)

        const w = this.Width(scale)
        const h = this.Height(scale)
        const dx = this.displayX(x, y)
        const dy = this.displayY(x, y)

        game.ctx.drawImage(this.texture, dx, dy, w, h);
    }
}