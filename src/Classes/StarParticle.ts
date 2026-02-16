import RectParticle from "./Engine/Particles/RectParticle.ts";
import  SpaceShooter from "./SpaceShooter.ts";
import RGBA from "./Engine/General/RGBA.ts";
import flatten from "./Engine/Utils/flatten.ts";

export default class StarParticle extends RectParticle<SpaceShooter>
{
    constructor() {
        super(new RGBA(0xFF, 0xFF, 0xFF), 2.5, 2.5);
        this.ySpeed = 0.015
        this.yAcceleration = 0.0005
    }

    override displayX(game: SpaceShooter, x: number, y: number): number {
        return game.starProjector.plotX(x, y)
    }

    override displayY(game: SpaceShooter, x: number, y: number): number {
        return game.starProjector.plotY(x, y)
    }

    //@ts-ignore
    override updateScale(game: SpaceShooter, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number): number {
        return flatten(game.starProjector.fractionalY(y), 0.2)
    }

    protected getDist(randomizer: number) {
        return Math.round(randomizer * 2 + 1)
    }
}