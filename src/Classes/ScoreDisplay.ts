import Text from "./Engine/Entities/Text.ts";
import type SpaceShooter from "./SpaceShooter.ts";
import Font from "./Engine/Utils/Font.ts";
import RGBA from "./Engine/General/RGBA.ts";
import {textAlignment} from "./Engine/Utils/textAlignment.ts";
import {fontStyle} from "./Engine/Utils/fontStyle.ts";

export default class ScoreDisplay extends Text<SpaceShooter>
{
    constructor(game: SpaceShooter) {
        super("", new Font(48, "monospace", 1, fontStyle.BOLD), new RGBA(0xFF, 0xFF, 0xFF), game.Width - 20, 68, 0, 48, 1, 0, game, textAlignment.END);
    }

    override update() {
        super.update();
        this.text = this.game.score.toString()
    }
}