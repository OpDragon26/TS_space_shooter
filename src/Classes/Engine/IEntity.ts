import type Game from "./Game.ts";

export default interface IEntity {
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
    game: Game;
    hidden: boolean;
    tags: Set<number>;

    draw(): void
    drawAt(pos: [x: number, y: number]): void
    start(): void
    update(): void
    tagged(tag: number): boolean
    get Height(): number
    get Width(): number
}