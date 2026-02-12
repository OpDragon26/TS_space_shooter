import hexByte from "./hexByte.ts";
import clamp from "../Utils/clamp.ts";

export default class RGBA
{
    private r: number = 0;
    private g: number = 0;
    private b: number = 0;
    private a: number = 255;

    get opacity() {
        return this.a / 255
    }

    set R(v: number) { this.r = Math.round(clamp(v, 0, 255)); }
    set G(v: number) { this.g = Math.round(clamp(v, 0, 255)); }
    set B(v: number) { this.b = Math.round(clamp(v, 0, 255)); }
    set A(v: number) { this.a = Math.round(clamp(v, 0, 255)); }

    get R() { return this.r; }
    get G() { return this.g; }
    get B() { return this.b; }
    get A() { return this.a; }

    constructor(r: number, g: number, b: number, a: number = 0xFF) {
        this.R = r
        this.G = g
        this.B = b
        this.A = a
    }

    getStr()
    {
        return `#${hexByte(this.r)}${hexByte(this.g)}${hexByte(this.b)}${hexByte(this.a)}`;
    }

    interpolate(other: RGBA): RGBA
    {
        let tof;
        let oof;

        if (this.opacity > other.opacity) {
            oof = other.opacity / this.opacity
            tof = 1 - oof
        }
        else
        {
            tof = this.opacity / other.opacity;
            oof = 1 - tof
        }

        const r = this.r * tof + other.r * oof
        const g = this.g * tof + other.g * oof
        const b = this.b * tof + other.b * oof
        const a = this.a + other.a

        return new RGBA(r, g, b, a);
    }

    add(other: RGBA): RGBA
    {
        const r = this.r + other.r
        const g = this.g + other.g
        const b = this.b + other.b
        const a = this.a + other.a

        return new RGBA(r, g, b, a);
    }
}