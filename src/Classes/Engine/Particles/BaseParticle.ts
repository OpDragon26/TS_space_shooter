import type IParticleTemplate from "./IParticleTemplate.ts";
import type Game from "../General/Game.ts";

export default class BaseParticle<GT extends Game<GT>> implements IParticleTemplate<GT>
{
    game: GT | null = null;
    x: number | null = null
    y: number | null = null
    scale: number | null = null
    rotation: number | null = null
    elapsedTime: number | null = null
    randomizer: number | null = null
    deleted: boolean | null = null

    ySpeed: number = 0;
    xSpeed: number = 0;
    xAcceleration: number = 0;
    yAcceleration: number = 0;

    load(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): void {
        this.game = game;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.rotation = rotation;
        this.elapsedTime = elapsedTime;
        this.randomizer = randomizer;
    }

    update() {
        this.x = this.newX
        this.y = this.newY
        this.rotation = this.newRotation
        this.scale = this.newScale
        this.deleted = this.doRemove
    }

    // @ts-ignore
    get newX(): number {
        const x = this.x!
        const elapsedTime = this.elapsedTime!

        return x + this.xSpeed + elapsedTime * this.xAcceleration
    }

    get newY(): number {
        const y = this.y!
        const elapsedTime = this.elapsedTime!

        return y + this.ySpeed + elapsedTime * this.yAcceleration
    }

    get newRotation(): number {
        const rotation = this.rotation!
        const elapsedTime = this.elapsedTime!
        return rotation * elapsedTime
    }

    get newScale(): number {
        return this.scale!
    }

    get doRemove(): boolean {
        const game: GT = this.game!
        const x: number = this.x!
        const y: number = this.y!

        return game.outOfBoundsPoint(x, y, 50, 50)
    }

    draw(): void {

    }

    get displayX() {
        return this.x!
    }

    get displayY() {
        return this.y!
    }
}