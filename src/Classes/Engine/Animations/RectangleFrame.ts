import type IFrame from "./IFrame.ts";
import {FrameType} from "./FrameType.ts";
import type RGBA from "../General/RGBA.ts";
import {ColorTreatment} from "./ColorTreatment.ts";

export default class RectangleFrame implements IFrame {
    frameType: number;
    colorTreatment: number;
    colorOffset: RGBA

    constructor(colorOffset: RGBA, frameType: number = FrameType.OFFSET, colorTreatment: number = ColorTreatment.INTERPOLATE) {
        this.frameType = frameType;
        this.colorTreatment = colorTreatment;
        this.colorOffset = colorOffset;
    }
}