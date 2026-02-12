import Random from "./Utils/Random.ts";
import type SpaceShooter from "./SpaceShooter.ts";
import CircleHitbox from "./Engine/Hitboxes/CircleHitbox.ts";
import {Tags} from "./Utils/Tags.ts";
import ProjectedRect from "./Utils/ProjectedRect.ts";
import RGBA from "./Engine/General/RGBA.ts";
import {Presets} from "./Engine/Animations/Presets.ts";

export default class Meteor extends ProjectedRect
{
    private speed: number = Random(0.5, 0.7);
    private readonly acceleration: number = 1.015;
    public readonly hitbox: CircleHitbox;
    private readonly frameRotation: number = Random(0.001, 0.01);

    constructor(x: number, y: number, scale: number, game: SpaceShooter, tags: Set<number> = new Set<number>()) {
        const size = Random(35, 75)
        super(x, y, size, size, scale, 0, game, new RGBA(0xFF, 0x00, 0x4F), tags);

        this.tags.add(Tags.METEOR);
        this.hitbox = new CircleHitbox(x, y, size / 2);
    }

    override update() {
        this.y += this.speed
        this.speed *= this.acceleration
        this.rotation += this.frameRotation

        if (this.game.outOfBounds(this, 200, 200) || this.destroyed)
            this.game.entities.delete(this);

        super.update();

        this.hitbox.update(this)
    }

    destroy()
    {
        this.animate(Presets.RECT_POP)
        this.hitbox.active = false;
    }

    private get destroyed()
    {
        return !this.hitbox.active && this.animation == null;
    }
}
