import RectangleAnimation from "./RectangleAnimation.ts";
import RectangleFrame from "./RectangleFrame.ts";
import RGBA from "../General/RGBA.ts";
import {FrameType} from "./FrameType.ts";
import {ColorTreatment} from "./ColorTreatment.ts";

export const Presets =
    {
        RECT_FADE_OUT: new RectangleAnimation(
            [
                new RectangleFrame(new RGBA(0,0,0, -51), FrameType.UPDATE, ColorTreatment.ADD),
                new RectangleFrame(new RGBA(0,0,0, -51), FrameType.UPDATE, ColorTreatment.ADD),
                new RectangleFrame(new RGBA(0,0,0, -51), FrameType.UPDATE, ColorTreatment.ADD),
                new RectangleFrame(new RGBA(0,0,0, -51), FrameType.UPDATE, ColorTreatment.ADD),
            ], 10
        )
    }