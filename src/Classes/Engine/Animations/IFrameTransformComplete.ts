import type RGBA from "../General/RGBA.ts";

export default interface IFrameTransformComplete
{
    readonly colorOffset: RGBA
    readonly xOffset: number
    readonly yOffset: number
    readonly scaleMultiplier: number
}