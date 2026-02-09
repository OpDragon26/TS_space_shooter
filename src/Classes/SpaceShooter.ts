import Game from "./Engine/Game.ts";
import Meteor from "./Meteor.ts";
import GridProjector from "./Utils/GridProjector.ts";
import Player from "./Player.ts";
import Random from "./Utils/Random.ts";
import ScreenShake from "./ScreenShake.ts";

export default class SpaceShooter extends Game
{
    public projector: GridProjector
    private enemyInterval: [min: number, max: number] = [5, 40]
    private enemyTimer: number = 0;
    private readonly player: Player
    public readonly screenShake: ScreenShake;

    constructor() {
        super();

        this.player = new Player(this.Width / 2, this.Height - 50, this)
        this.projector = new GridProjector(this.canvas.width, this.canvas.height, this.canvas.width * 0.7, this.canvas.width * 0.025, this.canvas.height * 0.75, this.canvas.width * 0.15, this.canvas.height * 0.2);
        this.screenShake = new ScreenShake();
    }

    override onStart()
    {
        this.entities.add(this.player)
        this.screenShake.start()
    }

    override update() {
        super.update();

        if (this.enemyTimer <= 0)
        {
            this.enemyTimer = this.getInterval()
            this.spawnMeteor()
        }
        this.enemyTimer -= 1

        //this.entities.add(new Meteor(0, 0, 1, this))
        //this.entities.add(new Meteor(this.Width, 0, 1, this))

        this.screenShake.update();
        this.projector.skew = -(this.player.x - this.Width / 2) * 0.5
    }

    private spawnMeteor()
    {
        if (Math.random() < 0.5)
        {
            // aim at player
            const fPos = (this.player.x - this.player.limit) / (this.Width - this.player.limit * 2)

            const min = Math.max(0, this.Width * fPos + 75)
            const max = Math.min(this.Width, this.Width * fPos - 75)
            this.entities.add(new Meteor(Random(min, max), 0, 1, this))
        }
        else
        {
            this.entities.add(new Meteor(Random(0, this.Width), 0, 1, this))
        }
    }

    private getInterval()
    {
        return Random(this.enemyInterval[0], this.enemyInterval[1])
    }

    get xOffsetGlobal(): number {
        return this.screenShake.xOffset
    }

    get yOffsetGlobal(): number {
        return this.screenShake.yOffset;
    }
}