import type IEntity from "./IEntity.ts";
import type Game from "../General/Game.ts";
import type RGBA from "../General/RGBA.ts";
import type RectangleAnimation from "../Animations/RectangleAnimation.ts";
import {ColorTreatment} from "../Animations/ColorTreatment.ts";
import RectangleFrame from "../Animations/RectangleFrame.ts";
import {FrameType} from "../Animations/FrameType.ts";

export default class Rectangle<GT extends Game<GT>> implements IEntity<GT>
{
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
    rotation: number;
    game: GT;
    protected color: RGBA
    hidden: boolean;
    tags: Set<number>;
    private colorStr: string = "#FFFFFF"
    animation: RectangleAnimation | null = null
    layer: number = 0;

    get Width()
    {
        return this.width * this.scale;
    }

    get Height()
    {
        return this.height * this.scale;
    }

    get Color()
    {
        return this.color;
    }

    set Color(value: RGBA)
    {
        this.color = value;
        this.colorStr = this.color.getStr()
    }

    constructor(x: number, y: number, width: number, height: number, scale: number, rotation: number, game: GT, color: RGBA, tags: Set<number> = new Set<number>()) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.rotation = rotation;
        this.game = game;
        this.color = color;
        this.colorStr = this.color.getStr();
        this.hidden = false;
        this.tags = tags;
    }

    public drawAt(pos: [x: number, y: number]) {
        this.updateAnimation()
        if (!this.hidden) {
            this.game.ctx.save()
            this.drawBody(pos)
            this.game.ctx.restore();
        }
    }

    get displayPos(): [x: number, y: number]
    {
        return [this.x + this.game.xOffsetGlobal, this.y + this.game.yOffsetGlobal];
    }

    public draw()
    {
        this.drawAt(this.displayPos)
    }

    protected drawBody(pos: [x: number, y: number])
    {
        if (this.animation == null) {
            this.drawNormal(pos)
        }
        else
        {
            this.drawAnimated(pos)
        }
    }

    protected drawNormal(pos: [x: number, y: number]): void
    {
        this.rotateCanvas(pos)
        this.game.ctx.fillStyle = this.colorStr
        this.game.ctx.fillRect(pos[0] - this.Width / 2, pos[1] - this.Height / 2, this.Width, this.Height);
    }

    protected drawAnimated(pos: [x: number, y: number]): void
    {
        this.rotateCanvas(pos)
        const frame: RectangleFrame = this.animation!.current

        switch (frame.frameType)
        {
            case FrameType.OFFSET:
                const color = this.getNewColor(frame)
                this.game.ctx.fillStyle = color.getStr()
                this.game.ctx.fillRect(pos[0] - this.Width / 2, pos[1] - this.Height / 2, this.Width, this.Height);
            break;

            case FrameType.UPDATE:
                if (this.animation!.newFrame)
                    this.Color = this.getNewColor(frame)
                this.game.ctx.fillStyle = this.colorStr
                this.game.ctx.fillRect(pos[0] - this.Width / 2, pos[1] - this.Height / 2, this.Width, this.Height);
            break;
        }
    }

    private getNewColor(frame: RectangleFrame)
    {
        return frame.colorTreatment == ColorTreatment.INTERPOLATE
            ? this.color.interpolate(frame.colorOffset)
            : this.color.add(frame.colorOffset)
    }

    rotateCanvas(pos: [x: number, y: number])
    {
        this.game.ctx.translate(pos[0], pos[1]);
        this.game.ctx.rotate(this.rotation)
        this.game.ctx.translate(-pos[0], -pos[1]);
    }

    private updateAnimation()
    {
        if (this.animation != null) {
            this.animation.tick()
            if (this.animation.finished)
                this.animation = null
        }
    }

    public tagged(tag: number)
    {
        return this.tags.has(tag)
    }

    update() {

    }

    start() {

    }

    animate(animation: RectangleAnimation)
    {
        this.animation = animation;
        animation.reset()
    }
}