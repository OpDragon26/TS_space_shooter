import type IHitbox from "./IHitbox.ts";
import CollisionTester from "./CollisionTester.ts";
import type Game from "../Game.ts";
import type IEntity from "../Entities/IEntity.ts";

export default class CircleHitbox implements IHitbox
{
    x: number;
    y: number;
    radius: number;
    active: boolean;
    scale: number;
    get Radius() { return this.radius * this.scale }

    constructor(x: number, y: number, radius: number, scale: number = 1) {
        this.x = x;
        this.y = y;
        this.radius = radius;
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
        const xDist = this.x - x;
        const yDist = this.y - y;

        const squareDist = xDist * xDist + yDist * yDist;
        return squareDist <= this.radius * this.radius;
    }

    getKeyPoints(): [x: number, y: number][] {
        return [
            [this.x + this.Radius, this.y],
            [this.x - this.Radius, this.y],
            [this.x, this.y + this.Radius],
            [this.x, this.y - this.Radius],
        ]
    }

    update<GT extends Game>(parent: IEntity<GT>) {
        const pos = parent.displayPos
        this.x = pos[0];
        this.y = pos[1];
        this.scale = parent.scale;
    }
}