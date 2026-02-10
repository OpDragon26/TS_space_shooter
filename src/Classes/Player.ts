import Rectangle from "./Engine/Entities/Rectangle.ts";
import type SpaceShooter from "./SpaceShooter.ts";
import RectangleHitbox from "./Engine/Hitboxes/RectangleHitbox.ts";
import Meteor from "./Meteor.ts";
import {Tags} from "./Tags.ts";

export default class Player extends Rectangle<SpaceShooter>
{
    private readonly acceleration: number = 0.25;
    private readonly maxSpeed: number = 3.5;
    private speed: number = 0;

    public readonly limit: number = this.game.Width * 0.3;

    public readonly hitbox: RectangleHitbox;

    private readonly IFrames: number = 120;
    private IFrameCounter: number = 0;

    constructor(x: number, y: number, game: SpaceShooter) {
        super(x, y, 50, 20, 1, 0, game, "#444282");

        this.hitbox = new RectangleHitbox(x, y, 50, 20)
    }

    override update() {
        this.tryMove(this.speed)

        let anyPressed: boolean = false;

        if (this.game.inputManager.isKeyDown("a") || this.game.inputManager.isKeyDown("ArrowLeft")) {
            this.speed = Math.max(-this.maxSpeed, this.speed - this.acceleration);
            anyPressed = true;
        }
        if (this.game.inputManager.isKeyDown("d") || this.game.inputManager.isKeyDown("ArrowRight")) {
            this.speed = Math.min(this.maxSpeed, this.speed + this.acceleration);
            anyPressed = true;
        }

        if (!anyPressed)
        {
            if (this.speed < 0)
                this.speed += this.acceleration
            else if (this.speed > 0)
                this.speed -= this.acceleration
        }

        this.applyRotation()

        this.hitbox.update(this)

        this.IFrameCounter--;
        if (this.IFrameCounter < 0)
        {
            this.hidden = false
            this.game.entities.forEach((entity) => {
                if (entity.tagged(Tags.METEOR))
                {
                    const m: Meteor = (entity as Meteor);
                    if (m.hitbox.collides(this.hitbox))
                    {
                        this.game.screenShake.start()
                        this.IFrameCounter = this.IFrames
                    }
                }
            })
        }
        else
        {
            const c = Math.round(this.IFrameCounter / 15)
            this.hidden = c % 2 == 0
        }

    }

    private applyRotation()
    {
        this.rotation = this.speed / 14
    }

    private tryMove(x: number)
    {
        if (this.limit <= this.x + x && this.game.Width - this.limit >= this.x + x)
            this.x += x;
        else
            this.speed = 0
    }
}