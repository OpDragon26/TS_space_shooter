import Rectangle from "./Engine/Rectangle.ts";
import type Game from "./Engine/Game.ts";

export default class Meteor extends Rectangle
{
    private speed: number = 1;
    constructor(x: number, y: number, scale: number, game: Game, color: string, tags: Set<number> = new Set<number>()) {
        super(x, y, 50, 50, scale, game, color, tags);
        this.tags.add(0);
    }

    override update() {
        this.y += this.speed
        this.speed *= 1.01

        if (this.game.outOfBounds(this, 200, 200))
            this.game.entities.delete(this);
    }
}
