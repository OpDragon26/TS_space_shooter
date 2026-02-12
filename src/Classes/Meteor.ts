import type SpaceShooter from "./SpaceShooter.ts";
import CircleHitbox from "./Engine/Hitboxes/CircleHitbox.ts";
import {Tags} from "./Engine/Utils/Tags.ts";
import ProjectedRect from "./Engine/Utils/ProjectedRect.ts";
import RGBA from "./Engine/General/RGBA.ts";
import {Presets} from "./Engine/Animations/Presets.ts";
import random from "./Engine/Utils/Random.ts";

export default class Meteor extends ProjectedRect
{
    private speed: number;
    private readonly acceleration: number = 1.01;
    public readonly hitbox: CircleHitbox;
    private readonly frameRotation: number;
    private hp: number
    private readonly size: number;

    constructor(x: number, y: number, scale: number, game: SpaceShooter, size: number = 0, tags: Set<number> = new Set<number>()) {
        size = size == 0 ? randomSize() : size
        const edge = randomEdge(size)

        super(x, y, edge, edge, scale, 0, game, getColor(size), tags);
        this.size = size;
        this.hp = this.size
        this.speed = getSpeed(size)
        this.frameRotation = randomRotation(size)

        this.tags.add(Tags.METEOR);
        this.hitbox = new CircleHitbox(x, y, edge / 2);
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

    hit()
    {
        this.hp--

        if (this.hp <= 0)
            this.destroy()
        else
            this.animate(Presets.RECT_FLASH)
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
function randomSize(): number
{
    let n = Math.random();
    if (n > 0.65)
        return 1
    n = Math.random()
    if (n > 0.2)
        return 2
    return 3
}

function randomEdge(size: number): number
{
    const min = 25 * size + 5
    const max = 35 * size + 10
    return random(min, max);
}

function getColor(size: number): RGBA
{
    return new RGBA(40 * size, 40 * size, 40 * size)
}

function getSpeed(size: number): number
{
    switch (size)
    {
        case 1: return random(0.6, 0.8)
        case 2: return random(0.35, 0.5)
        case 3: return random(0.15, 0.2)
    }
    return 0
}

function randomRotation(size: number): number
{
    const m = 3.5 - size;
    return random(m * -0.01, m * 0.01)
}