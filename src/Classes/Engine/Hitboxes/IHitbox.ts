import type IEntity from "../Entities/IEntity.ts";
import type Game from "../General/Game.ts";

export default interface IHitbox
{
    x: number;
    y: number;
    active: boolean;
    scale: number;

    collides(other: IHitbox): boolean
    containsPoint(x: number, y: number): boolean;
    getKeyPoints(): [x: number, y: number][];
    update<GT extends Game<GT>>(parent: IEntity<GT>): void;
}