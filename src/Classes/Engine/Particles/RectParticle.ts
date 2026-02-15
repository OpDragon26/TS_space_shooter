import Game from "../General/Game.ts";
import type RGBA from "../General/RGBA.ts";
import BaseParticle from "./BaseParticle.ts";
import rotateCanvas from "../Utils/rotateCanvas.ts";

export default class RectParticle<GT extends Game<GT>> extends BaseParticle<GT> {
    width: number;
    height: number;
    private color: RGBA;
    private colorStr: string;

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

    //@ts-ignore
    override draw(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number) {
        rotateCanvas(game.ctx, rotation, x, y)

        const w = this.Width(scale)
        const h = this.Height(scale)
        const dx = this.displayX(x, y) - w / 2
        const dy = this.displayY(x, y) - h / 2

        game.ctx.fillStyle = this.colorStr;
        game.ctx.fillRect(dx, dy, w, h);
    }
}