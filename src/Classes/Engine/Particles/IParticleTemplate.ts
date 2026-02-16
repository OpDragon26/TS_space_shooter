import type Game from "../General/Game.ts";

export default interface IParticleTemplate<GT extends Game<any>>
{
    updateX(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): number
    updateY(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): number
    updateRotation(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): number
    updateScale(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): number
    doRemove(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): boolean

    draw(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): void
}