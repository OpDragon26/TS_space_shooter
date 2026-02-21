import Text from "../Engine/Entities/Standard/Text.ts";
import type SpaceShooter from "../SpaceShooter.ts";
import Font from "../Engine/Utils/TextStyling/Font.ts";
import {fontFamily} from "../Engine/Utils/TextStyling/fontFamily.ts";
import RGBA from "../Engine/General/RGBA.ts";
import {textAlignment} from "../Engine/Utils/TextStyling/textAlignment.ts";
import {Tags} from "../Helper/Tags.ts";

export default class FinalScoreDisplay extends Text<SpaceShooter> {
    constructor(x: number, y: number,game: SpaceShooter) {
        super("Score: ",
            new Font(32, fontFamily.MONOSPACE),
            new RGBA(0xFF, 0xFF, 0xFF),
            x, y,
            0, 32, 1, 0,
            game, textAlignment.CENTER,
            new Set<number>([Tags.GAME_OVER_UI])
            );
    }

    set score(value: number) {
        this.text = `Score: ${value}`;
    }
}