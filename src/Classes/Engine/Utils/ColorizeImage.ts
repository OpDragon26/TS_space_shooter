import type RGBA from "../General/RGBA.ts";
import {ColorTreatment} from "./ColorTreatment.ts";
import clamp from "./clamp.ts";

export default function (imageData: ImageData, color: RGBA, colorTreatment: number = ColorTreatment.INTERPOLATE): ImageData
{
    if (colorTreatment == ColorTreatment.INTERPOLATE)
    {
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] *= color.FR;
            imageData.data[i + 1] *= color.FG;
            imageData.data[i + 2] *= color.FB;
            imageData.data[i + 3] *= color.FA;
        }
    }
    else
    {
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] += clamp(color.R, 0, 255);
            imageData.data[i + 1] += clamp(color.G, 0, 255);
            imageData.data[i + 2] += clamp(color.B, 0, 255);
            imageData.data[i + 3] += clamp(color.A, 0, 255);
        }
    }

    return imageData;
}