export default interface IHitbox
{
    x: number;
    y: number;
    active: boolean;
    type: number;

    collides(other: IHitbox): boolean;
}