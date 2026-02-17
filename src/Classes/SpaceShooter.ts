import Game from "./Engine/General/Game.ts";
import Meteor from "./Meteor.ts";
import GridProjector from "./Engine/Utils/GridProjector.ts";
import Player from "./Player.ts";
import Random from "./Engine/Utils/Random.ts";
import ScreenShake from "./ScreenShake.ts";
import Counter from "./Engine/Utils/Counter.ts";
import easeOut from "./Engine/Utils/easeOut.ts";
import ScoreDisplay from "./ScoreDisplay.ts";
import {Particles} from "./Particles.ts";

export default class SpaceShooter extends Game<SpaceShooter>
{
    public projector: GridProjector
    private enemyInterval: [min: number, max: number] = [5, 40]
    private enemyTimer: number = 0;
    private readonly player: Player
    public readonly screenShake: ScreenShake = new ScreenShake();
    public readonly mobilityCounter: Counter = new Counter(30, 1800, 4);
    public score: number = 0

    public lowerCloseStarProjector: GridProjector
    public lowerMidStarProjector: GridProjector
    public lowerFarStarProjector: GridProjector

    public upperCloseStarProjector: GridProjector
    public upperMidStarProjector: GridProjector
    public upperFarStarProjector: GridProjector

    constructor() {
        super();

        this.player = new Player(this.Width / 2, this.Height, this)
        this.projector = new GridProjector(this.Width, this.Height, this.Width * 0.7, this.Width * 0.025, this.Height * 0.75, this.Width * 0.15, this.Height * 0.2);

        this.lowerCloseStarProjector = new GridProjector(this.Width, this.Height, this.Width * 1.75, this.Width, this.Height * 0.75, this.Width * -0.375, this.Height * 0.2)
        this.lowerMidStarProjector = new GridProjector(this.Width, this.Height, this.Width * 1.5, this.Width, this.Height * 0.75, this.Width * -0.25, this.Height * 0.2)
        this.lowerFarStarProjector = new GridProjector(this.Width, this.Height, this.Width * 1.25, this.Width, this.Height * 0.75, this.Width * -0.125, this.Height * 0.2)

        this.upperCloseStarProjector = new GridProjector(this.Width, this.Height, this.Width, this.Width * 1.75, this.Height * 0.75, this.Width * -0.375, this.Height * -0.55, false, true)
        this.upperMidStarProjector = new GridProjector(this.Width, this.Height, this.Width, this.Width * 1.5, this.Height * 0.75, this.Width * -0.25, this.Height * -0.55, false, true)
        this.upperFarStarProjector = new GridProjector(this.Width, this.Height, this.Width, this.Width * 1.25, this.Height * 0.75, this.Width * -0.125, this.Height * -0.55, false, true)

    }

    override onStart()
    {
        this.entities.add(this.player)
        this.ui.add(new ScoreDisplay(this))
        this.spawnInitialStars()
    }

    override update() {
        super.update();

        if (this.enemyTimer <= 0)
        {
            this.enemyTimer = this.getInterval()
            this.spawnMeteor()
        }
        this.enemyTimer -= 1

        this.screenShake.update();
        this.updateSkews()

        this.spawnStars()
    }

    private spawnMeteor()
    {
        const size = Math.random() < easeOut(this.mobilityCounter.f) / 2 + 0.5 ? 0 : 3

        if (Math.random() < 0.5)
        {
            // aim at player
            const fPos = this.player.x / (this.Width * 2)

            const min = Math.max(0, this.Width * fPos + 75)
            const max = Math.min(this.Width, this.Width * fPos - 75)
            this.entities.add(new Meteor(Random(min, max), 0, 1, this, size))
        }
        else
        {
            this.entities.add(new Meteor(Random(0, this.Width), 0, 1, this, size))
        }
    }

    private getInterval()
    {
        return this.ImmobilityPunishment(Random(this.enemyInterval[0], this.enemyInterval[1]))
    }

    private ImmobilityPunishment(x: number)
    {
        return x * 0.8 + x * 0.2 * easeOut(this.mobilityCounter.f)
    }

    updateSkews() {
        const s = -(this.player.x - this.Width / 2) * 0.35

        this.projector.skew = s

        this.lowerCloseStarProjector.skew = s * 0.12
        this.lowerMidStarProjector.skew = s * 0.08
        this.lowerFarStarProjector.skew = s * 0.04

        this.upperCloseStarProjector.skew = s * 0.12
        this.upperMidStarProjector.skew = s * 0.08
        this.upperFarStarProjector.skew = s * 0.04
    }

    get xOffsetGlobal(): number {
        return this.screenShake.xOffset
    }

    get yOffsetGlobal(): number {
        return this.screenShake.yOffset;
    }

    spawnStars()
    {
        if (Math.random() > 0.94)
            this.backgroundParticles.spawn(Particles.STAR, Random(0, this.Width) ,0, 1, 0)
    }

    spawnInitialStars()
    {
        for (let i = 0; i < 100; i++) {
            this.backgroundParticles.spawn(Particles.STAR, Random(0, this.Width), Random(0, this.Height), 1, 0)
        }
    }
}