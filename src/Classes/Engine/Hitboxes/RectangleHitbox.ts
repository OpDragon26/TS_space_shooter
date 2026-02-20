import type IHitbox from "./IHitbox.ts";
import CollisionTester from "./CollisionTester.ts";
import type Game from "../General/Game.ts";
import type IEntity from "../Entities/IEntity.ts";
import random from "../Utils/Math/Random.ts";

export default class RectangleHitbox implements IHitbox
{
    x: number;
    y: number;
    width: number;
    height: number;
    active: boolean;
    scale: number;
    get Width() { return this.width * this.scale }
    get Height() { return this.height * this.scale }

    constructor(x: number, y: number, width: number, height: number, scale: number = 1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.active = true;
        this.scale = scale;
    }

    collides(other: IHitbox): boolean
    {
        if (this.active && other.active)
        {
            return CollisionTester(this, other)
        }
        return false;
    }

    containsPoint(x: number, y: number): boolean {
        const xDist = Math.abs(this.x - x);
        const yDist = Math.abs(this.y - y);

        return xDist <= this.width / 2 && yDist <= this.height / 2;
    }

    getKeyPoints(): [x: number, y: number][] {
        return [
            [this.x + this.Width / 2, this.y + this.Height / 2],
            [this.x - this.Width / 2, this.y + this.Height / 2],
            [this.x + this.Width / 2, this.y - this.Height / 2],
            [this.x - this.Width / 2, this.y - this.Height / 2],
        ]
    }

    update<GT extends Game<GT>>(parent: IEntity<GT>) {
        const pos = parent.displayPos
        this.x = pos[0];
        this.y = pos[1];
        this.scale = parent.scale;
    }

    randomPoint(): [x: number, y: number] {
        return this.randomPointFrom([this.x, this.y]);
    }

    randomPointFrom(pos: [x: number, y: number]): [x: number, y: number] {
        const x = pos[0] + random(0, this.Width) - this.Width / 2;
        const y = pos[1] + random(0, this.Height) - this.Height / 2;
        return [x, y];
    }
}