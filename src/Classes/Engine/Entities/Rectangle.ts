import type IEntity from "./IEntity.ts";
import type Game from "../Game.ts";

export default class Rectangle<GT extends Game<GT>> implements IEntity<GT>
{
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
    rotation: number;
    game: GT;
    color: string
    hidden: boolean;
    tags: Set<number>;

    get Width()
    {
        return this.width * this.scale;
    }

    get Height()
    {
        return this.height * this.scale;
    }

    constructor(x: number, y: number, width: number, height: number, scale: number, rotation: number, game: GT, color: string, tags: Set<number> = new Set<number>()) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.rotation = rotation;
        this.game = game;
        this.color = color;
        this.hidden = false;
        this.tags = tags;
    }

    public drawAt(pos: [x: number, y: number]) {        
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
        this.game.ctx.translate(pos[0], pos[1]);
        this.game.ctx.rotate(this.rotation)
        this.game.ctx.translate(-pos[0], -pos[1]);

        this.game.ctx.fillStyle = this.color
        this.game.ctx.fillRect(pos[0] - this.Width / 2, pos[1] - this.Height / 2, this.Width, this.Height);
    }

    public tagged(tag: number)
    {
        return this.tags.has(tag)
    }

    update() {

    }

    start() {

    }
}