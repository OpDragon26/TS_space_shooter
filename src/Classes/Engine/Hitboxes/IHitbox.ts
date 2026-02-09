export default interface IHitbox
{
    x: number;
    y: number;
    active: boolean;
    scale: number;

    collides(other: IHitbox): boolean
    containsPoint(x: number, y: number): boolean;
    getKeyPoints(): [x: number, y: number][];
}