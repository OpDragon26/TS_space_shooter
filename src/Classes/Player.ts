import type SpaceShooter from "./SpaceShooter.ts";
import RectangleHitbox from "./Engine/Hitboxes/RectangleHitbox.ts";
import Meteor from "./Meteor.ts";
import {Tags} from "./Engine/Utils/Tags.ts";
import Projectile from "./Projectile.ts";
import Timer from "./Engine/General/Timer.ts";
import RGBA from "./Engine/General/RGBA.ts";
 import ProjectedRect from "./Engine/Utils/ProjectedRect.ts";
import Easing from "./Engine/Utils/easing.ts";

export default class Player extends ProjectedRect
{
    private readonly acceleration: number = 0.75;
    private readonly maxSpeed: number = 7.5;
    private speed: number = 0;

    //public readonly limit: number = this.game.Width * 0.3;
    public readonly limit: number = 0;

    public readonly hitbox: RectangleHitbox;

    private readonly IFrames: number = 120;
    private IFrameCounter: number = 0;

    private readonly projectileYOffset: number = -10;
    private readonly projectileXOffset: number = 20;
    private projectileXOffsetSign: number = 1;
    private readonly projectileTimer: Timer = new Timer(20);

    constructor(x: number, y: number, game: SpaceShooter) {
        super(x, y, 50, 20, 1, 0, game, new RGBA(0x44, 0x42, 0x82));
        this.layer = 1

        this.hitbox = new RectangleHitbox(x, y, 50, 20)
    }

    override update() {
        super.update()
        this.tryMove(this.speed)

        this.projectileTimer.tick()
        this.handleInputs()
        this.applyRotation()

        this.hitbox.update(this)
        this.handleCollision()
    }

    private handleInputs()
    {
        let anyPressed: boolean = false;

        if (this.game.inputManager.isKeyDown("a") || this.game.inputManager.isKeyDown("ArrowLeft")) {
            this.speed = Math.max(-this.maxSpeed, this.speed - this.acceleration);
            anyPressed = true;
        }
        if (this.game.inputManager.isKeyDown("d") || this.game.inputManager.isKeyDown("ArrowRight")) {
            this.speed = Math.min(this.maxSpeed, this.speed + this.acceleration);
            anyPressed = true;
        }
        if (this.game.inputManager.isKeyDown(" ")) {
            if (this.projectileTimer.passed())
            {
                this.spawnProjectile()
                this.projectileTimer.reset()
            }
        }

        if (!anyPressed)
        {
            if (this.speed < 0)
                this.speed += this.acceleration
            else if (this.speed > 0)
                this.speed -= this.acceleration
        }
    }

    private handleCollision()
    {
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
        this.IFrameCounter--;
    }

    private spawnProjectile()
    {
        const y = this.y + this.projectileYOffset;
        const x = this.x + this.projectileXOffset * this.projectileXOffsetSign
        this.projectileXOffsetSign = -this.projectileXOffsetSign;

        this.game.entities.add(new Projectile(x, y, this.game))
    }

    private applyRotation()
    {
        const fs = this.speed / this.maxSpeed
        const s = Math.sign(fs)
        this.rotation = Easing(Math.abs(fs)) * 0.5 * s
    }

    private tryMove(x: number)
    {
        if (this.limit <= this.x + x && this.game.Width - this.limit >= this.x + x)
            this.x += x;
        else
            this.speed = 0
    }
}