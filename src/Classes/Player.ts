import Rectangle from "./Engine/Entities/Rectangle.ts";
import type SpaceShooter from "./SpaceShooter.ts";
import RectangleHitbox from "./Engine/Hitboxes/RectangleHitbox.ts";
import Meteor from "./Meteor.ts";

export default class Player extends Rectangle<SpaceShooter>
{
    private readonly acceleration: number = 0.22;
    private readonly maxSpeed: number = 3.5;
    private speed: number = 0;

    public readonly limit: number = this.game.Width * 0.3;

    public readonly hitbox: RectangleHitbox;

    constructor(x: number, y: number, game: SpaceShooter) {
        super(x, y, 50, 20, 1, game, "#444282");

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

        this.hitbox.update(this)

        this.game.entities.forEach((entity) => {
            if (typeof (entity as Meteor) !== "undefined") {
                let m: Meteor = entity as Meteor;
                if (m.hitbox.collides(this.hitbox) && !Object.is(this, m))
                    console.log("BOOM")
            }
        })
    }

    private tryMove(x: number)
    {
        if (this.limit <= this.x + x && this.game.Width - this.limit >= this.x + x)
            this.x += x;
        else
            this.speed = 0
    }

    /*
    override draw() {
        this.drawBody([this.game.Width / 2, this.y])
    }
    */
}