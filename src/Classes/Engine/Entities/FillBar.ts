import type Game from "../General/Game.ts";
import Rectangle from "./Rectangle.ts";
import type RGBA from "../General/RGBA.ts";

export default class FillBar<GT extends Game<GT>> extends Rectangle<GT>
{
    fillPercent: number = 1

    constructor(x: number, y: number, width: number, height: number, scale: number, rotation: number, game: GT, color: RGBA, tags: Set<number> = new Set<number>()) {
        super(x, y, width, height, scale, rotation, game, color, tags);
    }

    protected override drawNormal(pos: [x: number, y: number]) {
        this.game.ctx.fillStyle = this.colorStr
        this.game.ctx.fillRect(pos[0] - this.Width / 2, pos[1] - this.Height / 2, this.Width * this.fillPercent, this.Height);
    }
}