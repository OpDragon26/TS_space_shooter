import Rectangle from "./Engine/Entities/Rectangle.ts";
import type Game from "./Engine/Game.ts";

export default class Meteor extends Rectangle
{
    private speed: number = 1;
    constructor(x: number, y: number, scale: number, game: Game, tags: Set<number> = new Set<number>()) {
        super(x, y, 50, 50, scale, game, "#ff004f", tags);
        this.tags.add(0);
    }

    override update() {
        this.y += this.speed
        this.speed *= 1.01

        if (this.game.outOfBounds(this, 200, 200))
            this.game.entities.delete(this);
    }
}
