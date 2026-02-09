import Rectangle from "./Engine/Entities/Rectangle.ts";
import Random from "./Utils/Random.ts";
import type SpaceShooter from "./SpaceShooter.ts";
import CircleHitbox from "./Engine/Hitboxes/CircleHitbox.ts";

export default class Meteor extends Rectangle<SpaceShooter>
{
    private speed: number = 1;
    private readonly acceleration: number = 1.015;
    public readonly hitbox: CircleHitbox;

    constructor(x: number, y: number, scale: number, game: SpaceShooter, tags: Set<number> = new Set<number>()) {
        const size = Random(35, 75)
        super(x, y, size, size, scale, game, "#ff004f", tags);
        this.tags.add(0);

        this.hitbox = new CircleHitbox(x, y / 2, size / 2);
    }

    override update() {
        this.y += this.speed
        this.speed *= this.acceleration

        if (this.game.outOfBounds(this, 200, 200))
            this.game.entities.delete(this);

        this.scale = this.game.projector.fractionalY(this.y)

        this.hitbox.scale = this.scale;
        const newPos = this.game.projector.plot([this.x, this.y]);
        this.hitbox.x = newPos[0]
        this.hitbox.y = newPos[1]
    }

    override draw() {
        const newPos = this.game.projector.plot([this.x, this.y]);
        this.drawAt(newPos)
    }
}
