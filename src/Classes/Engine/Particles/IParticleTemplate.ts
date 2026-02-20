import type Game from "../General/Game.ts";

export default interface IParticleTemplate<GT extends Game<any>>
{
    game: GT | null
    x: number | null
    y: number | null
    scale: number | null
    rotation: number | null
    elapsedTime: number | null
    randomizer: number | null
    fixed: number | null
    deleted: boolean | null

    load(game: GT, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number, fixedValue: number): void
    update(): void
    draw(): void
}