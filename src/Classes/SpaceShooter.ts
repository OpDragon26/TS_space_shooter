import Game from "./Engine/General/Game.ts";
import Meteor from "./Meteor.ts";
import GridProjector from "./Engine/Utils/GridProjector.ts";
import Player from "./Player.ts";
import Random from "./Engine/Utils/Random.ts";
import ScreenShake from "./ScreenShake.ts";
import Counter from "./Engine/Utils/Counter.ts";
import easeOut from "./Engine/Utils/easeOut.ts";
import ScoreDisplay from "./ScoreDisplay.ts";
import {Particles} from "./Helper/Particles.ts";
import Rectangle from "./Engine/Entities/Rectangle.ts";
import RGBA from "./Engine/General/RGBA.ts";
import FillBar from "./Engine/Entities/FillBar.ts";
import type IEntity from "./Engine/Entities/IEntity.ts";
import {Tags} from "./Helper/Tags.ts";
import {gameStates} from "./Helper/gameStates.ts";
import FadeRect from "./Engine/Entities/FadeRect.ts";
import Text from "./Engine/Entities/Text.ts";
import Font from "./Engine/Utils/Font.ts";
import {fontStyle} from "./Engine/Utils/fontStyle.ts";
import {fontFamily} from "./Engine/Utils/fontFamily.ts";
import {textAlignment} from "./Engine/Utils/textAlignment.ts";

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

    private readonly HPBar: FillBar<SpaceShooter>

    private readonly fading: FadeRect<SpaceShooter>;
    private readonly fadeOutLength: number = 180;
    private readonly gameOverText: Text<SpaceShooter>;

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

        this.HPBar = new FillBar<SpaceShooter>(95, 35, 120, 15, 1 , 0, this, new RGBA(0xFF, 0xFF, 0xFF), new Set<number>([Tags.RUN_UI]))
        this.fading = new FadeRect<SpaceShooter>(this, new RGBA(0, 0, 0), new Set<number>([Tags.GAME_OVER_UI]))
        this.gameOverText = new Text<SpaceShooter>(
            "GAME OVER",
            new Font(100, fontFamily.SANS_SERIF, 1, fontStyle.BOLD),
            new RGBA(0xFF, 0, 0x4F),
            this.Width / 2, this.Height / 2,
            0, 100, 1, 0,
            this,
            textAlignment.CENTER,
            new Set<number>([Tags.GAME_OVER_UI]))
    }

    override onStart()
    {
        this.entities.add(this.player)
        this.ui.add(new ScoreDisplay(this))
        this.ui.add(new Rectangle<SpaceShooter>(95, 35, 135, 30, 1, 0, this, new RGBA(0xFF, 0xFF, 0xFF), new Set<number>([Tags.RUN_UI])))
        this.ui.add(new Rectangle<SpaceShooter>(95, 35, 127.5, 22.5, 1, 0, this, new RGBA(0x00, 0x00, 0x00), new Set<number>([Tags.RUN_UI])))
        this.ui.add(this.HPBar)
        this.ui.add(this.fading)
        this.ui.add(this.gameOverText)

        this.spawnInitialStars()
    }
    override update() {
        super.update();

        if (this.enemyTimer <= 0 && this.gameState == gameStates.ONGOING)
        {
            this.enemyTimer = this.getInterval()
            this.spawnMeteor()
        }
        this.enemyTimer -= 1

        this.HPBar.fillPercent = this.player.currentHP / this.player.maxHP
        this.screenShake.update();
        this.updateSkews()
        this.updateFade()

        this.spawnStars()
    }

    public reset()
    {
        this.player.currentHP = this.player.maxHP
        this.player.x = this.Width / 2
        this.player.y = this.Height
        this.entities.clear()
        this.entities.add(this.player)
    }

    private spawnMeteor()
    {
        const size = Math.random() < easeOut(this.mobilityCounter.f) / 2 + 0.5 ? 0 : 3

        if (Math.random() < 0.5)
        {
            // aim at player
            const fPos = this.player.x / this.Width

            const min = Math.max(0, this.Width * fPos + 75)
            const max = Math.min(this.Width, this.Width * fPos - 75)
            this.entities.add(new Meteor(Random(min, max), 0, 1, this, size))
        }
        else
        {
            this.entities.add(new Meteor(Random(0, this.Width), 0, 1, this, size))
        }
    }

    protected override stateSet(state: number) {
        this.ui.forEach(entity => entity.hidden = true)

        switch (state)
        {
            case gameStates.ONGOING:
                this.setAllWithTag(Tags.RUN_UI, this.ui, false)
                break;

            case gameStates.GAME_OVER_TRANSITION:
                this.setAllWithTag(Tags.RUN_UI, this.ui, false)
                this.setAllWithTag(Tags.GAME_OVER_UI, this.ui, false)
                break;

            case gameStates.GAME_START_TRANSITION:

                break;
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

    private setAllWithTag(tag: number, set: Set<IEntity<SpaceShooter>>, on: boolean)
    {
        set.forEach(entity => {
            if (entity.tagged(tag))
                entity.hidden = on
        })
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

    updateFade()
    {
        if (this.gameState == gameStates.GAME_OVER_TRANSITION)
        {
            this.fading.Opacity = this.globalTime / this.fadeOutLength
            this.gameOverText.Opacity = this.globalTime / (this.fadeOutLength * 2)
        }
        else
        {
            this.fading.Opacity = 0
            this.gameOverText.Opacity = 0
        }
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

    spawnHitParticles(x: number, y: number)
    {
        for (let i = 0; i < 5; i++) {
            this.particles.spawn(Particles.HIT, x, y, 1, 0)
        }
    }
}