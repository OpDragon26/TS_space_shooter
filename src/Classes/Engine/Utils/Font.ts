import {fontStyle, getStyleName} from "./fontStyle.ts";

export default class Font
{
    size: number
    family: string
    style: number
    scale: number

    get Size()
    {
        return this.size * this.scale
    }

    constructor(size: number, family: string, scale: number = 1 , style: number = fontStyle.NORMAL) {
        this.size = size
        this.family = family
        this.style = style
        this.scale = scale
    }

    getStr() : string
    {
        return `${getStyleName(this.style)} ${this.size}px ${this.family}`
    }
}