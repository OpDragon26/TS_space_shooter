import hexByte from "./hexByte.ts";

export default class RGBA
{
    r: number;
    g: number;
    b: number;
    a: number;

    constructor(r: number, g: number, b: number, a: number = 0xFF) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    getStr()
    {
        return `#${hexByte(this.r)}${hexByte(this.g)}${hexByte(this.b)}${hexByte(this.a)}`;
    }

    interpolate(other: RGBA): RGBA
    {
        const r = Math.max(0,(this.r + other.r) * 0.5)
        const g = Math.max(0,(this.g + other.g) * 0.5)
        const b = Math.max(0,(this.b + other.b) * 0.5)
        const a = Math.max(0,(this.a + other.a) * 0.5)

        return new RGBA(r, g, b, a);
    }

    add(other: RGBA): RGBA
    {
        const r = Math.max(0,this.r + other.r)
        const g = Math.max(0,this.g + other.g)
        const b = Math.max(0,this.b + other.b)
        const a = Math.max(0,this.a + other.a)

        return new RGBA(r, g, b, a);
    }
}