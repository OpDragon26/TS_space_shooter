import type IEntity from "./IEntity.ts";
import type Game from "./Game.ts";

export default class Rectangle implements IEntity
{
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
    game: Game;
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

    constructor(x: number, y: number, width: number, height: number, scale: number, game: Game, color: string, tags: Set<number> = new Set<number>()) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.scale = scale;
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

    public draw()
    {
        this.drawAt([this.x, this.y])
    }

    protected drawBody(pos: [x: number, y: number])
    {
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