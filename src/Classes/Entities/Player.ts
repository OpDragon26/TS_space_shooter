import type SpaceShooter from "../SpaceShooter.ts";
import RectangleHitbox from "../Engine/Hitboxes/RectangleHitbox.ts";
import Meteor from "./Meteor.ts";
import {Tags} from "../Helper/Tags.ts";
import Projectile from "./Projectile.ts";
import Counter from "../Engine/General/Counter.ts";
import clamp from "../Engine/Utils/Math/clamp.ts";
import {gameStates} from "../Helper/gameStates.ts";
import ProjectedEntity from "../Helper/ProjectedEntity.ts";
import {Textures} from "../Helper/Textures.ts";
import {Particles} from "../Helper/Particles.ts";
import Random from "../Engine/Utils/Math/Random.ts";

export default class Player extends ProjectedEntity
{
    private readonly acceleration: number = 0.40625;
    private readonly maxSpeed: number = 6.5;
    private speed: number = 0;

    public readonly hitbox: RectangleHitbox;

    currentHP: number;
    readonly maxHP: number = 7

    private readonly IFrames: number = 120;
    public IFrameCounter: number = 0;

    private readonly projectileYOffset: number = -10;
    private readonly projectileXOffset: number = 20;
    private projectileXOffsetSign: number = 1;
    private readonly projectileTimer: Counter = new Counter(20);

    private readonly reScale: number = 0.5;

    private readonly trailVariety: number = 10
    private readonly trailYOffset: number = 6
    private readonly contactExplosionYOffset = 15
    public injuryPoint: number = 0;
    private readonly injuryYOffset: number = 5;

    constructor(x: number, y: number, game: SpaceShooter) {
        super(x, y, 1, 0, game, Textures.PLAYER_SHIP.Texture);
        this.layer = 1

        this.width *= this.reScale
        this.height *= this.reScale

        this.hitbox = new RectangleHitbox(x, y, this.width - 40 * this.reScale, this.height)

        this.currentHP = this.maxHP;
    }

    override update() {
        super.update()

        if (this.game.gameState == gameStates.ONGOING)
        {
            this.tryMove(this.speed)

            this.projectileTimer.tick()
            this.handleInputs()
            this.applyRotation()

            this.spawnTrail()
            this.spawnInjury()

            this.hitbox.update(this)
            this.handleCollision()
        }
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
        this.game.spawnExplosionParticles(meteor.x, this.y - this.contactExplosionYOffset, meteor.size)
        this.setInjury(meteor)

        if (meteor.size == 3)
            this.currentHP -= 2
        else
            this.currentHP--
        this.currentHP = clamp(this.currentHP, 0, this.maxHP)

        if (this.currentHP == 0)
        {
            this.game.setStage(gameStates.GAME_OVER_TRANSITION)
        }
    }

    private setInjury(meteor: Meteor)
    {
        if (this.currentHP < 3 || (meteor.size == 3 && this.currentHP < 5))
        {
            if (Math.random() > 0.4 && this.injuryPoint == 0)
            {
                this.injuryPoint = (meteor.x - this.x) / 2
            }
        }
    }

    private spawnProjectile()
    {
        const y = this.y + this.projectileYOffset;
        const x = this.x + this.projectileXOffset * this.projectileXOffsetSign
        this.projectileXOffsetSign = -this.projectileXOffsetSign;

        this.game.entities.add(new Projectile(x, y, this.game))
    }

    private spawnTrail()
    {
        const offset = Random(-this.trailVariety, this.trailVariety);
        this.game.particles.spawn(Particles.TRAIL, this.x + offset, this.y + this.trailYOffset, 1, 0)
    }

    private spawnInjury()
    {
        if (this.injuryPoint != 0)
        {
            if (Math.random() < 0.2)
            {
                this.game.particles.spawn(Particles.SMOKE, this.x + this.injuryPoint, this.y + this.injuryYOffset, 1, 0, 0.75)
            }
        }
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