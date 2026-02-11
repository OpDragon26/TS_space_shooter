import type Game from "../General/Game.ts";
import type IEntity from "./IEntity.ts";

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
        if (!this.hidden) {
            this.game.ctx.save()
            this.drawBody(pos)
            this.game.ctx.restore();
        }
    }

    protected drawBody(pos: [x: number, y: number])
    {
        this.game.ctx.translate(pos[0], pos[1]);
        this.game.ctx.rotate(this.rotation)
        this.game.ctx.translate(-pos[0], -pos[1]);

        this.game.ctx.drawImage(this.texture, pos[0] - this.width * this.scale / 2, pos[1] - this.height * this.scale / 2);
    }

    public start() {

    }

    public tagged(tag: number)
    {
        return this.tags.has(tag)
    }
}