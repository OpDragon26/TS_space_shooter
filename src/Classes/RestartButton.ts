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
        super(x, y, 300, 70, 1, 0, game, 0, 10, () => {game.setStage(gameStates.ONGOING)},
            new RGBA(0xF7, 0xB4, 0x36),new RGBA(0xF7, 0xB4, 0x36),new RGBA(0xC9, 0x8E, 0x20),
            new Text("RETRY",
                new Font(36, fontFamily.COURIER_NEW, 1, fontStyle.BOLD),
                new RGBA(0xF7, 0xB4, 0x36),
                0,10, 0, 36, 1, 0, game, textAlignment.CENTER
            ),
            new Text("RETRY",
                new Font(36, fontFamily.COURIER_NEW, 1, fontStyle.BOLD),
                new RGBA(0,0,0),
                0,10, 0, 36, 1, 0, game, textAlignment.CENTER
            ),
            new Text("RETRY",
                new Font(36, fontFamily.COURIER_NEW, 1, fontStyle.BOLD),
                new RGBA(0,0,0),
                0,10, 0, 36, 1, 0, game, textAlignment.CENTER
            ),
        );

        this.tags.add(Tags.GAME_OVER_UI)
    }

    protected override drawNormal(pos: [x: number, y: number]) {

        const topLeftX = pos[0] - this.Width / 2
        const topLeftY = pos[1] - this.Height / 2
        const topRightX = pos[0] + this.Width / 2 - this.thickness
        const bottomLeftY = pos[1] + this.Height / 2 - this.thickness

        const prevA = this.game.ctx.globalAlpha
        this.game.ctx.globalAlpha = this.opacity
        this.game.ctx.fillStyle = this.normalColorStr

        this.game.ctx.fillRect(topLeftX, topLeftY, this.Width, this.thickness);
        this.game.ctx.fillRect(topLeftX, topLeftY + this.thickness, this.thickness, this.Height - this.thickness * 2)
        this.game.ctx.fillRect(topRightX, topLeftY + this.thickness, this.thickness, this.Height - this.thickness * 2)
        this.game.ctx.fillRect(topLeftX, bottomLeftY, this.Width, this.thickness);

        this.game.ctx.globalAlpha = prevA

        this.normalText.drawAt(this.getTextPos(pos, this.normalText))
    }
}