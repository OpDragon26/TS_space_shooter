import Rectangle from "../Entities/Rectangle.ts";
import type SpaceShooter from "../../SpaceShooter.ts";

export default class ProjectedRect extends Rectangle<SpaceShooter>
{
    override get displayPos(): [x: number, y: number] {
        const dPos = this.game.projector.plot([this.x, this.y])
        dPos[0] += this.game.xOffsetGlobal
        dPos[1] += this.game.yOffsetGlobal
        return dPos;
    }

    override update() {
        this.scale = this.game.projector.fractionalY(this.y)
    }
}