import type RGBA from "../General/RGBA.ts";

export default function (image: HTMLImageElement, color: RGBA)
{
    const cv = document.createElement('canvas')
    const ctx = cv.getContext('2d')!

    cv.width = image.width
    cv.height = image.height

    ctx.drawImage(image, 0, 0);
    ctx.globalCompositeOperation = "source-atop"
    ctx.fillStyle = color.getStr()
    ctx.fillRect(0, 0, cv.width, cv.height);

    return cv
}