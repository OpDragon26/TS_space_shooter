import type Game from "../../General/Game.ts";
import Button from "./Button.ts";
import type RGBA from "../../General/RGBA.ts";
import flatten from "../../Utils/flatten.ts";
type PressFn = () => void;

export default class RectButton<GT extends Game<GT>> extends Button<GT>
{
    protected normalColorStr: string = "#FFFFFF"
    protected normalColor: RGBA
    protected hoverColorStr: string = "#FFFFFF"
    protected hoverColor: RGBA
    protected pressedColorStr: string = "#FFFFFF"
    protected pressedColor: RGBA

    constructor(x: number, y: number, width: number, height: number, scale: number, rotation: number, game: GT,
                activator: number = 0, pressTime: number = 30, onPress: PressFn,
                normal: RGBA, hover: RGBA, pressed: RGBA,
                tags: Set<number> = new Set<number>()) {
        super(x, y, width, height, scale, rotation, game, activator, pressTime, onPress, tags);

        this.normalColor = normal;
        this.hoverColor = hover;
        this.pressedColor = pressed;

        this.normalColorStr = normal.getStr();
        this.hoverColorStr = hover.getStr();
        this.pressedColorStr = pressed.getStr();
    }

    protected override drawNormal(pos: [x: number, y: number]) {
        this.game.ctx.fillStyle = this.normalColorStr
        this.game.ctx.fillRect(pos[0] - this.Width / 2, pos[1] - this.Height / 2, this.Width, this.Height);
    }

    protected override drawHover(pos: [x: number, y: number]) {
        this.game.ctx.fillStyle = this.hoverColorStr
        this.game.ctx.fillRect(pos[0] - this.Width / 2, pos[1] - this.Height / 2, this.Width, this.Height);
    }

    protected override drawPressed(pos: [x: number, y: number]) {
        const s = this.scale

        const f = 1 - this.PressedElapsedTime / this.pressTime
        this.scale *= flatten(f, 0.9)

        this.game.ctx.fillStyle = this.pressedColorStr
        this.game.ctx.fillRect(pos[0] - this.Width / 2, pos[1] - this.Height / 2, this.Width, this.Height);

        this.scale = s
    }

    get NormalColor() {
        return this.normalColor;
    }

    get HoverColor() {
        return this.hoverColor;
    }

    get PressedColor() {
        return this.pressedColor;
    }

    set NormalColor(color: RGBA) {
        this.normalColor = color;
        this.normalColorStr = this.normalColor.getStr();
    }

    set HoverColor(color: RGBA) {
        this.hoverColor = color;
        this.hoverColorStr = this.hoverColor.getStr();
    }

    set PressedColor(color: RGBA) {
        this.pressedColor = color;
        this.pressedColorStr = this.pressedColor.getStr();
    }
}