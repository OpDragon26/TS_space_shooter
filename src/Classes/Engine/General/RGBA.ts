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
}