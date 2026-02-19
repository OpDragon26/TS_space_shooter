import type Game from "../../General/Game.ts";
import RectButton from "./RectButton.ts";
import type RGBA from "../../General/RGBA.ts";
import type Text from "../Standard/Text.ts";
type PressFn = () => void;

export default class TextButton<GT extends Game<GT>> extends RectButton<GT>
{
    normalText: Text<GT>
    hoverText: Text<GT> | null
    pressedText: Text<GT> | null

    constructor(x: number, y: number, width: number, height: number, scale: number, rotation: number, game: GT,
                activator: number = 0, pressTime: number = 30, onPress: PressFn,
                normal: RGBA, hover: RGBA, pressed: RGBA,
                normalText: Text<GT>, hoverText: Text<GT> | null = null, pressedText: Text<GT> | null = null,
                tags: Set<number> = new Set<number>()) {
        super(x, y, width, height, scale, rotation, game, activator, pressTime, onPress, normal, hover, pressed, tags);
        this.normalText = normalText
        this.hoverText = hoverText
        this.pressedText = pressedText
    }

    protected override drawNormal(pos: [x: number, y: number]) {
        super.drawNormal(pos);
        this.normalText.drawAt(this.getTextPos(pos, this.normalText))
    }

    protected override drawHover(pos: [x: number, y: number]) {
        super.drawHover(pos);
        if (this.hoverText == null)
            this.normalText.drawAt(this.getTextPos(pos, this.normalText))
        else
            this.hoverText.drawAt(this.getTextPos(pos, this.hoverText))
    }

    protected override drawPressed(pos: [x: number, y: number]) {
        super.drawPressed(pos);
        if (this.pressedText == null)
            this.normalText.drawAt(this.getTextPos(pos, this.normalText))
        else
            this.pressedText.drawAt(this.getTextPos(pos, this.pressedText))
    }

    override set Opacity(opacity: number) {
        super.Opacity = opacity
        this.normalText.Opacity = opacity
        if (this.hoverText != null)
            this.hoverText.Opacity = opacity
        if (this.pressedText != null)
            this.pressedText.Opacity = opacity
    }

    protected getTextPos(pos: [x: number, y: number], text: Text<GT>): [x: number, y: number] {
        return [pos[0] + text.x, pos[1] + text.y];
    }
}