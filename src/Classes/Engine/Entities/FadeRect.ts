import Rectangle from "./Rectangle.ts";
import type Game from "../General/Game.ts";
import type RGBA from "../General/RGBA.ts";
import clamp from "../Utils/clamp.ts";

export default class FadeRect<GT extends Game<GT>> extends Rectangle<GT>
{
    private opacity: number = 1

    constructor(game: GT, color: RGBA, tags: Set<number> = new Set<number>()) {
        super(game.Width / 2, game.Height / 2, game.Width, game.Height, 1, 0, game, color, tags);
    }

    public get Opacity() {
        return this.opacity
    }

    public set Opacity(v: number) {
        this.opacity = clamp(v, 0, 1)
    }

    protected override drawBody(pos: [x: number, y: number])
    {
        const prevA = this.game.ctx.globalAlpha
        this.game.ctx.globalAlpha = this.opacity

        this.rotateCanvas(pos)
        if (this.animation == null)
            this.drawNormal(pos)
        else
            this.drawAnimated(pos)

        this.game.ctx.globalAlpha = prevA
    }
}