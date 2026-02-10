import type SpaceShooter from "./SpaceShooter.ts";
import Rectangle from "./Engine/Entities/Rectangle.ts";

export default class Projectile extends Rectangle<SpaceShooter>
{
    constructor(x: number, y: number, game: SpaceShooter, tags: Set<number> = new Set()) {
        super(x, y, 5, 5, 1, 0, game, "#FFFFFF", tags);
    }
}