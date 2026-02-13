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

    private xVelocity: number;
    private yVelocity: number;
    private readonly deacceleration: number = 0.95;

    constructor(x: number, y: number, scale: number, game: SpaceShooter, size: number = 0, initXVelocity: number = 0, initYVelocity: number = 0, tags: Set<number> = new Set<number>()) {
        size = size == 0 ? randomSize() : size
        const edge = randomEdge(size)

        super(x, y, edge, edge, scale, 0, game, getColor(size), tags);
        this.size = size;
        this.hp = this.size
        this.speed = getSpeed(size)
        this.frameRotation = randomRotation(size)

        this.tags.add(Tags.METEOR);
        this.hitbox = new CircleHitbox(x, y, edge / 2);

        this.xVelocity = initXVelocity
        this.yVelocity = initYVelocity
    }

    override update() {
        this.y += this.speed
        this.speed *= this.acceleration
        this.rotation += this.frameRotation

        this.x += this.xVelocity
        this.xVelocity *= this.deacceleration
        if (this.xVelocity > -0.05 && this.xVelocity < 0.05)
            this.xVelocity = 0
        this.y += this.yVelocity
        this.yVelocity *= this.deacceleration
        if (this.yVelocity > -0.05 && this.yVelocity < 0.05)
            this.yVelocity = 0

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
        if (this.size === 3)
        {
            this.split()
            this.game.score += 2
        }
        else
            this.game.score++;
    }

    private get destroyed()
    {
        return !this.hitbox.active && this.animation == null;
    }

    private split()
    {
        for (let i = 0; i < Math.round(random(2,3.5)); i++)
            this.spawnNew(this.hitbox.randomPointFrom([this.x, this.y]))
    }

    private spawnNew(pos: [x: number, y: number])
    {
        const sign = Math.sign(pos[0] - this.x)
        const xVelocity = random(4, 16) * sign
        const yVelocity = random(-4, 4) * sign
        const m: Meteor = new Meteor(pos[0], pos[1], 1, this.game, 1, xVelocity, yVelocity)
        m.speed = this.speed
        this.game.entities.add(m)
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