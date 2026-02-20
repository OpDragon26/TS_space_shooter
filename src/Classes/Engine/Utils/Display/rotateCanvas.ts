export default function (ctx: CanvasRenderingContext2D, a: number, x: number, y: number): void
{
    ctx.translate(x, y);
    ctx.rotate(a)
    ctx.translate(-x, -y);
}