import TextButton from "./Engine/Entities/Utility/TextButton.ts";
import type SpaceShooter from "./SpaceShooter.ts";
import RGBA from "./Engine/General/RGBA.ts";
import Text from "./Engine/Entities/Standard/Text.ts";
import Font from "./Engine/Utils/Font.ts";
import {fontFamily} from "./Engine/Utils/fontFamily.ts";
import {fontStyle} from "./Engine/Utils/fontStyle.ts";
import {textAlignment} from "./Engine/Utils/textAlignment.ts";
import {gameStates} from "./Helper/gameStates.ts";
import {Tags} from "./Helper/Tags.ts";

export default class RestartButton extends TextButton<SpaceShooter>
{
    thickness: number = 5

    constructor(x: number, y: number, game: SpaceShooter) {
        super(x, y, 150, 70, 1, 0, game, 0, 10, () => {game.setStage(gameStates.ONGOING)},
            new RGBA(0xF7, 0xB4, 0x36),new RGBA(0xF7, 0xB4, 0x36),new RGBA(0xF7, 0xB4, 0x36),
            new Text("RETRY",
                new Font(48, fontFamily.MONOSPACE, 1, fontStyle.NORMAL),
                new RGBA(0xF7, 0xB4, 0x36),
                0,0, 0, 48, 1, 0, game, textAlignment.CENTER
                )
            );

        this.tags.add(Tags.GAME_OVER_UI)
    }

    protected override drawNormal(pos: [x: number, y: number]) {
        const prevA = this.game.ctx.globalAlpha
        this.game.ctx.globalAlpha = this.opacity
        this.game.ctx.fillStyle = this.normalColorStr
        this.game.ctx.fillRect(pos[0] - this.Width / 2, pos[1] - this.Height / 2, this.Width, this.Height);
        this.game.ctx.globalAlpha = prevA


        const iw = this.Width - this.thickness;
        const ih = this.Height - this.thickness;
        this.game.ctx.fillStyle = "#000000"
        this.game.ctx.fillRect(pos[0] - iw / 2, pos[1] - ih / 2, iw, ih);

        this.normalText.drawAt(pos)
    }
}