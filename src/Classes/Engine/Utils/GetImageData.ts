export default function (img: HTMLImageElement, width: number, height: number)
{
    const offscreen = new OffscreenCanvas(width, height);
    const ctx = offscreen.getContext("2d")!;

    ctx.drawImage(img, 0, 0);

    return  ctx.getImageData(0, 0, width, height);
}