import type IHitbox from "./IHitbox.ts";

export default function (first: IHitbox, second: IHitbox): boolean
{
    return first.getKeyPoints().map(p => second.containsPoint(p[0], p[1])).indexOf(true) != -1
        || second.getKeyPoints().map(p => first.containsPoint(p[0], p[1])).indexOf(true) != -1;
}