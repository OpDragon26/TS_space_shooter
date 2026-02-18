import type Game from "../General/Game.ts";
import type IEntity from "./IEntity.ts";
import Frame from "../Animations/Frame.ts";
import type Animation from "../Animations/Animation.ts";
import {FrameType} from "../Animations/FrameType.ts";
import discolorImage from "../Utils/discolorImage.ts";

export default class GameEntity<GT extends Game<GT>> implements IEntity<GT> {

    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
    rotation: number;
    game: GT;
    texture: HTMLImageElement;
    hidden: boolean;
    tags: Set<number>;
    animation: Animation | null = null
    layer: number = 0;

    get Height()
    {
        return this.height * this.scale;
    }

    get Width()
    {
        return this.width * this.scale;
    }

    constructor(x: number, y: number, scale: number, rotation: number, game: GT, texture: HTMLImageElement, tags: Set<number> = new Set<number>()) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.texture = texture;
        this.width = texture.width;
        this.height = texture.height;
        this.scale = scale;
        this.rotation = rotation;
        this.hidden = false;
        this.tags = tags
    }

    public update() {}

    get displayPos(): [x: number, y: number]
    {
        return [this.x + this.game.xOffsetGlobal, this.y + this.game.yOffsetGlobal];
    }

    public draw()
    {
        this.drawAt(this.displayPos)
    }

    public drawAt(pos: [x: number, y: number]) {
        this.updateAnimation()
        if (!this.hidden) {
            this.game.ctx.save()
            this.drawBody(pos)
            this.game.ctx.restore();
        }
    }

    protected drawBody(pos: [x: number, y: number])
    {
        this.rotateCanvas(pos)
        if (this.animation == null)
            this.drawNormal(pos)
        else
            this.drawAnimated(pos)
    }

    protected drawNormal(pos: [x: number, y: number]): void
    {
        this.game.ctx.drawImage(this.texture, pos[0] - this.Width / 2, pos[1] - this.Height / 2, this.Width, this.Height);
    }

    protected drawAnimated(pos: [x: number, y: number]): void
    {
        const frame: Frame = this.animation!.current

        let w: number
        let h: number

        switch (frame.frameType)
        {
            case FrameType.OFFSET:
                w = this.width * this.getScale(frame)
                h = this.height * this.getScale(frame)

                const discolored = discolorImage(this.texture, frame.colorOffset)
                this.game.ctx.drawImage(discolored, pos[0] - w / 2, pos[1] - h / 2, w, h)

                break;

            case FrameType.UPDATE:
                if (this.animation!.newFrame)
                    this.scale = this.getScale(frame)

                this.drawNormal(pos)
                break;

            case FrameType.OBJECTIVE:
                this.game.ctx.fillStyle = frame.colorOffset.getStr()

                w = this.width * frame.scaleMultiplier
                h = this.height * frame.scaleMultiplier

                this.game.ctx.drawImage(this.texture, pos[0] - w / 2, pos[1] - h / 2, w, h)
                break;

            case FrameType.REPLACE:
                if (this.animation!.newFrame)
                    this.scale = frame.scaleMultiplier

                this.drawNormal(pos)
                break;
        }
    }

    animate(animation: Animation)
    {
        this.animation = animation;
        animation.reset()
    }

    private getScale(frame: Frame)
    {
        return this.scale * frame.scaleMultiplier
    }

    public start() {

    }

    public tagged(tag: number)
    {
        return this.tags.has(tag)
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
}