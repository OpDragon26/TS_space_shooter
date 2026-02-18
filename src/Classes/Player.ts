import type SpaceShooter from "./SpaceShooter.ts";
import RectangleHitbox from "./Engine/Hitboxes/RectangleHitbox.ts";
import Meteor from "./Meteor.ts";
import {Tags} from "./Engine/Utils/Tags.ts";
import Projectile from "./Projectile.ts";
import Timer from "./Engine/General/Timer.ts";
import RGBA from "./Engine/General/RGBA.ts";
import ProjectedRect from "./Helper/ProjectedRect.ts";
import clamp from "./Engine/Utils/clamp.ts";

export default class Player extends ProjectedRect
{
    private readonly acceleration: number = 0.40625;
    private readonly maxSpeed: number = 6.5;
    private speed: number = 0;

    public readonly hitbox: RectangleHitbox;

    currentHP: number;
    readonly maxHP: number = 7

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

        this.currentHP = this.maxHP;
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

        this.game.mobilityCounter.update(anyPressed)

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
                        this.gotHit(m)
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

    private gotHit(meteor: Meteor)
    {
        this.game.screenShake.start()
        this.IFrameCounter = this.IFrames

        if (meteor.size == 3)
            this.currentHP -= 2
        else
            this.currentHP--
        this.currentHP = clamp(this.currentHP, 0, this.maxHP)

        if (this.currentHP == 0)
            this.game.stop()
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
        this.rotation = fs * 0.25
    }

    private tryMove(x: number)
    {
        if (0 <= this.x + x && this.game.Width >= this.x + x)
            this.x += x;
        else
            this.speed = 0
    }
}