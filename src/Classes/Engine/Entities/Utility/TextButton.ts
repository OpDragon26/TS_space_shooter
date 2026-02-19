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
                normalText: Text<GT>, hoverText: Text<GT> | null, pressedText: Text<GT> | null,
                tags: Set<number> = new Set<number>()) {
        super(x, y, width, height, scale, rotation, game, activator, pressTime, onPress, normal, hover, pressed, tags);
        this.normalText = normalText
        this.hoverText = hoverText
        this.pressedText = pressedText
    }

    protected override drawNormal(pos: [x: number, y: number]) {
        super.drawNormal(pos);
        this.normalText.drawAt(pos)
    }

    protected override drawHover(pos: [x: number, y: number]) {
        super.drawHover(pos);
        if (this.hoverText == null)
            this.normalText.drawAt(pos)
        else
            this.hoverText.drawAt(pos)
    }

    protected override drawPressed(pos: [x: number, y: number]) {
        super.drawPressed(pos);
        if (this.pressedText == null)
            this.normalText.drawAt(pos)
        else
            this.pressedText.drawAt(pos)
    }
}