import type Game from "../General/Game.ts";
import RectParticle from "./RectParticle.ts";
import type RGBA from "../General/RGBA.ts";
import type Animation from "../Animations/Animation.ts";
import rotateCanvas from "../Utils/rotateCanvas.ts";
import type Frame from "../Animations/Frame.ts";
import {ColorTreatment} from "../Utils/ColorTreatment.ts";

export default class AnimatedRectParticle<GT extends Game<GT>> extends RectParticle<GT>
{
    animation: Animation;
    repeat: boolean;

    constructor(color: RGBA, width: number, height: number, animation: Animation, repeat: boolean) {
        super(color, width, height);

        this.animation = animation;
        this.repeat = repeat;
    }

    //@ts-ignore
    override draw(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number) {
        rotateCanvas(game.ctx, rotation, x, y)

        const frame = this.currentFrame(elapsedTime);

        const w = this.Width(scale * frame.scaleMultiplier)
        const h = this.Height(scale * frame.scaleMultiplier)
        const dx = this.displayX(x, y) + frame.xOffset - w / 2
        const dy = this.displayY(x, y) + frame.yOffset - h / 2

        game.ctx.fillStyle = this.getColor(frame);
        game.ctx.fillRect(dx, dy, w, h);
    }

    protected frameIndex(elapsedTime: number) {
        return Math.floor(elapsedTime / this.animation.frameLength)
    }

    protected currentFrame(elapsedTime: number): Frame {
        return this.animation.frames[this.frameIndex(elapsedTime) % this.animation.length]
    }

    protected getColor(frame: Frame) : string {
        const newColor = frame.colorTreatment == ColorTreatment.ADD ? this.Color.add(frame.colorOffset) : this.Color.interpolate(frame.colorOffset);
        return newColor.getStr()
    }

    override doRemove(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): boolean {
        return super.doRemove(game, x, y, scale, rotation, elapsedTime, randomizer) || (!this.repeat && this.frameIndex(elapsedTime) > this.animation.length)
    }
}