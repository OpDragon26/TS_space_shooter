import Animation from "../Engine/Animations/Animation.ts";
import Frame from "../Engine/Animations/Frame.ts";
import RGBA from "../Engine/General/RGBA.ts";
import {FrameType} from "../Engine/Animations/FrameType.ts";
import {ColorTreatment} from "../Engine/Utils/ColorTreatment.ts";

export const Animations =
    {
        FLASH: new Animation(
            [
                new Frame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 40)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
                new Frame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 80)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
                new Frame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 120)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
                new Frame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 80)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
                new Frame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 40)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
                new Frame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 0)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
            ],15
        ),

        FINAL_FLASH: new Animation(
            [
                new Frame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 20)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
                new Frame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 40)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
                new Frame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 60)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
                new Frame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 80)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
                new Frame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 100)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
                new Frame({colorOffset: new RGBA(0xFF, 0xFF, 0xFF, 120)}, FrameType.OFFSET, ColorTreatment.INTERPOLATE),
            ], 8
        )
    }