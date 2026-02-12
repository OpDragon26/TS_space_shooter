import type IFrame from "./IFrame.ts";
import {FrameType} from "./FrameType.ts";
import RGBA from "../General/RGBA.ts";
import {ColorTreatment} from "./ColorTreatment.ts";
import type IFrameTransform from "./IFrameTransform.ts";
import type IFrameTransformComplete from "./IFrameTransformComplete.ts";

export default class RectangleFrame implements IFrame {
    readonly frameType: number;
    readonly colorTreatment: number;

    readonly colorOffset: RGBA
    readonly xOffset: number
    readonly yOffset: number
    readonly scaleMultiplier: number

    constructor(transform: IFrameTransform, frameType: number = FrameType.OFFSET, colorTreatment: number = ColorTreatment.ADD) {
        this.frameType = frameType;
        this.colorTreatment = colorTreatment;

        const t = this.default(transform)

        this.colorOffset = t.colorOffset;
        this.xOffset = t.xOffset
        this.yOffset = t.yOffset
        this.scaleMultiplier = t.scaleMultiplier
    }

    private default(transform: IFrameTransform) : IFrameTransformComplete
    {
        const co = transform.colorOffset == null ? new RGBA(0, 0, 0, 0xFF) : transform.colorOffset
        const xo = transform.xOffset == null ? 0 : transform.xOffset
        const yo = transform.yOffset == null ? 0 : transform.yOffset
        const so = transform.scaleMultiplier == null ? 1 : transform.scaleMultiplier

        return {colorOffset: co, xOffset: xo, yOffset: yo, scaleMultiplier: so}
    }
}