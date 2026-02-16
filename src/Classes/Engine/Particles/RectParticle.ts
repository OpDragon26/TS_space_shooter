import Game from "../General/Game.ts";
import type RGBA from "../General/RGBA.ts";
import BaseParticle from "./BaseParticle.ts";
import rotateCanvas from "../Utils/rotateCanvas.ts";

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

    protected Width(scale: number) {
        return this.width * scale;
    }

    protected Height(scale: number) {
        return this.height * scale;
    }

    override draw() {
        const game = this.game!
        const scale = this.scale!
        const rotation = this.rotation!

        const w = this.Width(scale)
        const h = this.Height(scale)
        const dx = this.displayX - w / 2 + game.xOffsetGlobal
        const dy = this.displayY - h / 2 + game.yOffsetGlobal

        rotateCanvas(game.ctx, rotation, dx, dy)

        game.ctx.fillStyle = this.colorStr;
        game.ctx.fillRect(dx, dy, w, h);
    }
}