import Game from "./Engine/General/Game.ts";
import Meteor from "./Meteor.ts";
import GridProjector from "./Engine/Utils/GridProjector.ts";
import Player from "./Player.ts";
import Random from "./Engine/Utils/Random.ts";
import ScreenShake from "./ScreenShake.ts";
import Counter from "./Engine/Utils/Counter.ts";
import easeOut from "./Engine/Utils/easeOut.ts";
import ScoreDisplay from "./ScoreDisplay.ts";

export default class SpaceShooter extends Game<SpaceShooter>
{
    public projector: GridProjector
    private enemyInterval: [min: number, max: number] = [5, 40]
    private enemyTimer: number = 0;
    private readonly player: Player
    public readonly screenShake: ScreenShake = new ScreenShake();
    public readonly mobilityCounter: Counter = new Counter(30, 1800, 4);
    public score: number = 0

    constructor() {
        super();

        this.player = new Player(this.Width / 2, this.Height, this)
        this.projector = new GridProjector(this.Width, this.Height, this.Width * 0.7, this.Width * 0.025, this.Height * 0.75, this.Width * 0.15, this.Height * 0.2);
    }

    override onStart()
    {
        this.entities.add(this.player)
        this.ui.add(new ScoreDisplay(this))
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
        this.projector.skew = -(this.player.x - this.Width / 2) * 0.35
    }

    private spawnMeteor()
    {
        const size = Math.random() < easeOut(this.mobilityCounter.f) / 2 + 0.5 ? 0 : 3

        if (Math.random() < 0.5)
        {
            // aim at player
            const fPos = (this.player.x - this.player.limit) / (this.Width - this.player.limit * 2)

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

    get xOffsetGlobal(): number {
        return this.screenShake.xOffset
    }

    get yOffsetGlobal(): number {
        return this.screenShake.yOffset;
    }
}