import RectangleAnimation from "./RectangleAnimation.ts";
import RectangleFrame from "./RectangleFrame.ts";
import RGBA from "../General/RGBA.ts";
import {FrameType} from "./FrameType.ts";
import {ColorTreatment} from "./ColorTreatment.ts";

export const Presets =
    {
        RECT_POP: new RectangleAnimation(
            [
                new RectangleFrame({colorOffset: new RGBA(0, 0, 0, -25), scaleMultiplier: 1.175}, FrameType.UPDATE, ColorTreatment.ADD),
                new RectangleFrame({colorOffset: new RGBA(0, 0, 0, -26), scaleMultiplier: 1.175}, FrameType.UPDATE, ColorTreatment.ADD),
                new RectangleFrame({colorOffset: new RGBA(0, 0, 0, -25), scaleMultiplier: 1.175}, FrameType.UPDATE, ColorTreatment.ADD),
                new RectangleFrame({colorOffset: new RGBA(0, 0, 0, -26), scaleMultiplier: 1.175}, FrameType.UPDATE, ColorTreatment.ADD),
                new RectangleFrame({colorOffset: new RGBA(0, 0, 0, -25), scaleMultiplier: 1.175}, FrameType.UPDATE, ColorTreatment.ADD),
                new RectangleFrame({colorOffset: new RGBA(0, 0, 0, -26), scaleMultiplier: 1.175}, FrameType.UPDATE, ColorTreatment.ADD),
                new RectangleFrame({colorOffset: new RGBA(0, 0, 0, -25), scaleMultiplier: 1.175}, FrameType.UPDATE, ColorTreatment.ADD),
                new RectangleFrame({colorOffset: new RGBA(0, 0, 0, -26), scaleMultiplier: 1.175}, FrameType.UPDATE, ColorTreatment.ADD),
                new RectangleFrame({colorOffset: new RGBA(0, 0, 0, -25), scaleMultiplier: 1.175}, FrameType.UPDATE, ColorTreatment.ADD),
                new RectangleFrame({colorOffset: new RGBA(0, 0, 0, -26), scaleMultiplier: 1.175}, FrameType.UPDATE, ColorTreatment.ADD),
                new RectangleFrame({colorOffset: new RGBA(0, 0, 0, -25), scaleMultiplier: 1.175}, FrameType.UPDATE, ColorTreatment.ADD),
            ], 10
        ),
        RECT_FLASH: new RectangleAnimation(
            [
                    new RectangleFrame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 40)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
                    new RectangleFrame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 80)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
                    new RectangleFrame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 120)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
                    new RectangleFrame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 80)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
                    new RectangleFrame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 40)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
                    new RectangleFrame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 0)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
            ],15
        )
    }