import Rectangle from "./Engine/Rectangle.ts";
import type Game from "./Engine/Game.ts";

export default class Meteor extends Rectangle
{
    constructor(x: number, y: number, width: number, height: number, game: Game, color: string, tags: Set<number> = new Set<number>()) {
        super(x, y, width, height, game, color, tags);
        this.tags.add(0);
    }

    override update() {
        this.y += 1
    }
}
