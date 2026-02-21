import Text from "../Engine/Entities/Standard/Text.ts";
import type SpaceShooter from "../SpaceShooter.ts";
import RGBA from "../Engine/General/RGBA.ts";
import Font from "../Engine/Utils/TextStyling/Font.ts";
import {fontFamily} from "../Engine/Utils/TextStyling/fontFamily.ts";
import {fontStyle} from "../Engine/Utils/TextStyling/fontStyle.ts";
import {textAlignment} from "../Engine/Utils/TextStyling/textAlignment.ts";
import {degToRad} from "../Engine/Utils/Math/Converter.ts";
import {Tags} from "../Helper/Tags.ts";

export default class NewHighScoreSplash extends Text<SpaceShooter>
{
    private readonly flashInterval: number;
    protected readonly colors = ["#F7B436", "#C98E20"]

    constructor(x: number, y: number, flashInterval: number, game: SpaceShooter) {
        super(
            "NEW HIGHSCORE!!",
            new Font(20, fontFamily.SANS_SERIF, 1, fontStyle.BOLD),
            new RGBA(0xFF, 0xFF, 0xFF),
            x, y,
            0, 20, 1, degToRad(-20),
            game, textAlignment.CENTER,
            new Set<number>([Tags.GAME_OVER_UI])
        );

        this.flashInterval = flashInterval;
    }

    protected override get ColorStr()
    {
        const i = this.game.globalTime % (this.flashInterval * 2) > this.flashInterval ? 0 : 1;
        return this.colors[i]
    }
}