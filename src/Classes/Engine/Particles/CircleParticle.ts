import BaseParticle from "./BaseParticle.ts";
import type Game from "../General/Game.ts";
import type RGBA from "../General/RGBA.ts";
import rotateCanvas from "../Utils/Display/rotateCanvas.ts";

export default class CircleParticle<GT extends Game<GT>> extends BaseParticle<GT>
{
    radius: number;
    protected color: RGBA;
    protected colorStr: string;

    constructor(color: RGBA, radius: number) {
        super();
        this.radius = radius;
        this.color = color;
        this.colorStr = color.getStr()
    }

    protected Radius(r: number)
    {
        const scale = this.scale!;
        return r * scale;
    }

    override draw() {
        const game = this.game!;

        const dx = this.displayX + game.xOffsetGlobal
        const dy = this.displayY + game.yOffsetGlobal
        const r = this.Radius(this.radius)

        rotateCanvas(game.ctx, this.newRotation, dx, dy)

        const prevA = game.ctx.globalAlpha
        game.ctx.globalAlpha = this.newOpacity

        game.ctx.beginPath();
        game.ctx.arc(dx, dy, r, 0, 2 * Math.PI);
        game.ctx.fillStyle = this.colorStr;
        game.ctx.fill()
        game.ctx.lineWidth = 0;
        game.ctx.strokeStyle = this.colorStr;
        game.ctx.stroke()

        game.ctx.globalAlpha = prevA
    }

    get Color() : RGBA {
        return this.color;
    }

    set Color(color: RGBA) {
        this.color = color;
        this.colorStr = color.getStr();
    }
}