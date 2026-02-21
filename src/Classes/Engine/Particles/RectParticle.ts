import Game from "../General/Game.ts";
import type RGBA from "../General/RGBA.ts";
import BaseParticle from "./BaseParticle.ts";
import rotateCanvas from "../Utils/Display/rotateCanvas.ts";

export default class RectParticle<GT extends Game<GT>> extends BaseParticle<GT> {
    width: number;
    height: number;
    protected color: RGBA;
    protected colorStr: string;

    constructor(color: RGBA, width: number, height: number) {
        super()
        this.width = width;
        this.height = height;
        this.color = color;
        this.colorStr = color.getStr()
    }

    get Color() : RGBA {
        return this.color;
    }

    set Color(color: RGBA) {
        this.color = color;
        this.colorStr = color.getStr();
    }

    protected get ColorStr(): string
    {
        return this.colorStr
    }

    protected Width(scale: number) {
        return this.width * scale;
    }

    protected Height(scale: number) {
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

        game.ctx.fillStyle = this.ColorStr;
        game.ctx.fillRect(dx - w / 2, dy - h / 2, w, h);

        game.ctx.globalAlpha = prevA
    }
}