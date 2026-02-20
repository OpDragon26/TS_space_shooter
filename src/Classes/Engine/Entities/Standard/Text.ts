import type IEntity from "../IEntity.ts";
import type Game from "../../General/Game.ts";
import Font from "../../Utils/Font.ts";
import type RGBA from "../../General/RGBA.ts";
import {textAlignment} from "../../Utils/textAlignment.ts";
import clamp from "../../Utils/clamp.ts";

export default class Text<GT extends Game<GT>> implements IEntity<GT>
{
    constructor(text: string, font: Font, color: RGBA, x: number, y: number, width: number, height: number, scale: number, rotation: number, game: GT, alignment: string = textAlignment.START, tags: Set<number> = new Set<number>()) {
        this.text = text;
        this.font = font;
        this.color = color;
        this.colorStr = color.getStr()
        this.alignment = alignment

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.rotation = rotation;
        this.game = game;
        this.tags = tags;
        this.hidden = false;
        this.layer = 0
    }

    text: string;
    private font: Font;
    private color: RGBA;
    private colorStr: string;
    alignment: string;

    opacity: number = 1

    set Color(color: RGBA) {
        this.color = color;
        this.colorStr = this.color.getStr()
    }

    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
    rotation: number;
    game: GT;
    hidden: boolean;
    tags: Set<number>;
    layer: number;

    draw(): void
    {
        this.drawAt(this.displayPos)
    }
    drawAt(pos: [x: number, y: number]): void
    {
        if (!this.hidden) {
            this.game.ctx.save()
            this.drawText(pos)
            this.game.ctx.restore();
        }
    }

    private drawText(pos: [x: number, y: number]): void
    {
        const prevA = this.game.ctx.globalAlpha
        this.game.ctx.globalAlpha = this.opacity

        if (this.font.scale != this.scale)
            this.font = new Font(this.font.size, this.font.family, this.scale, this.font.style)

        this.game.ctx.font = this.font.getStr()
        this.game.ctx.fillStyle = this.colorStr
        this.game.ctx.textAlign = this.alignment as CanvasTextAlign
        if (this.width == 0)
            this.game.ctx.fillText(this.text, pos[0], pos[1]);
        else
            this.game.ctx.fillText(this.text, pos[0], pos[1], this.Width);

        this.game.ctx.globalAlpha = prevA
    }

    get displayPos(): [x: number, y: number]
    {
        return [this.x + this.game.xOffsetGlobal, this.y + this.game.yOffsetGlobal];
    }
    start(): void {}
    update(): void {

    }
    tagged(tag: number): boolean {
        return this.tags.has(tag)
    }
    get Height(): number {
        return this.height * this.scale;
    }
    get Width(): number {
        return this.width * this.scale;
    }

    public get Opacity() {
        return this.opacity
    }

    public set Opacity(v: number) {
        this.opacity = clamp(v, 0, 1)
    }
}