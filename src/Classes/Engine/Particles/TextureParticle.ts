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

    override draw() {
        const game = this.game!
        const scale = this.scale!

        const w = this.Width(scale)
        const h = this.Height(scale)
        const dx = this.displayX + game.xOffsetGlobal
        const dy = this.displayY + game.yOffsetGlobal

        rotateCanvas(game.ctx, this.newRotation, dx, dy)

        const prevA = game.ctx.globalAlpha
        game.ctx.globalAlpha = this.newOpacity

        game.ctx.drawImage(this.texture, dx - w / 2, dy - h / 2, w, h);

        game.ctx.globalAlpha = prevA
    }
}