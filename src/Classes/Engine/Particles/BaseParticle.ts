import type IParticleTemplate from "./IParticleTemplate.ts";
import type Game from "../General/Game.ts";

export default class BaseParticle<GT extends Game<GT>> implements IParticleTemplate<GT>
{
    ySpeed: number = 0;
    xSpeed: number = 0;
    xAcceleration: number = 0;
    yAcceleration: number = 0;
    rotation: number = 0;

    // @ts-ignore
    updateX(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): number {
        return x + this.xSpeed + elapsedTime * this.xAcceleration
    }

    // @ts-ignore
    updateY(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): number {
        return y + this.ySpeed + elapsedTime * this.yAcceleration
    }

    // @ts-ignore
    updateRotation(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): number {
        return rotation + this.rotation
    }

    // @ts-ignore
    updateScale(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): number {
        return scale
    }

    // @ts-ignore
    doRemove(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): boolean {
        return game.outOfBoundsPoint(x, y, 50, 50)
    }

    // @ts-ignore
    draw(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): void {}

    // @ts-ignore
    displayX(game: GT, x: number, y: number) {
        return x
    }

    // @ts-ignore
    displayY(game: GT, x: number, y: number) {
        return y
    }
}