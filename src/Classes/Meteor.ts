import Rectangle from "./Engine/Entities/Rectangle.ts";
import Random from "./Utils/Random.ts";
import type SpaceShooter from "./SpaceShooter.ts";
import CircleHitbox from "./Engine/Hitboxes/CircleHitbox.ts";
import {Tags} from "./Tags.ts";

export default class Meteor extends Rectangle<SpaceShooter>
{
    private speed: number = Random(0.7, 0.9);
    private readonly acceleration: number = 1.02;
    public readonly hitbox: CircleHitbox;

    constructor(x: number, y: number, scale: number, game: SpaceShooter, tags: Set<number> = new Set<number>()) {
        const size = Random(35, 75)
        super(x, y, size, size, scale, game, "#ff004f", tags);

        this.tags.add(Tags.METEOR);
        this.hitbox = new CircleHitbox(x, y / 2, size / 2);
    }

    override update() {
        this.y += this.speed
        this.speed *= this.acceleration

        if (this.game.outOfBounds(this, 200, 200))
            this.game.entities.delete(this);

        this.scale = this.game.projector.fractionalY(this.y)

        this.hitbox.update(this)
    }

    override get displayPos(): [x: number, y: number] {
        const dPos = this.game.projector.plot([this.x, this.y])
        dPos[0] += this.game.xOffsetGlobal
        dPos[1] += this.game.yOffsetGlobal
        return dPos;
    }
}
