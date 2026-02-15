import type Game from "../General/Game.ts";

export default interface IParticleTemplate<GT extends Game<any>>
{
    updateX(x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): number
    updateY(x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): number
    updateRotation(x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): number
    updateScale(x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): number
    doRemove(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): boolean

    draw(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): void
}