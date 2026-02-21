import Game from "./Engine/General/Game.ts";
import Meteor from "./Entities/Meteor.ts";
import GridProjector from "./Engine/Utils/Display/GridProjector.ts";
import Player from "./Entities/Player.ts";
import Random from "./Engine/Utils/Math/Random.ts";
import ScreenShake from "./Effects/ScreenShake.ts";
import Counter from "./Engine/Utils/Timing/Counter.ts";
import easeOut from "./Engine/Utils/Math/easeOut.ts";
import ScoreDisplay from "./UI/ScoreDisplay.ts";
import {Particles} from "./Helper/Particles.ts";
import Rectangle from "./Engine/Entities/Standard/Rectangle.ts";
import RGBA from "./Engine/General/RGBA.ts";
import FillBar from "./Engine/Entities/Utility/FillBar.ts";
import type IEntity from "./Engine/Entities/IEntity.ts";
import {Tags} from "./Helper/Tags.ts";
import {gameStates} from "./Helper/gameStates.ts";
import FadeRect from "./Engine/Entities/Utility/FadeRect.ts";
import Text from "./Engine/Entities/Standard/Text.ts";
import Font from "./Engine/Utils/TextStyling/Font.ts";
import {fontStyle} from "./Engine/Utils/TextStyling/fontStyle.ts";
import {fontFamily} from "./Engine/Utils/TextStyling/fontFamily.ts";
import {textAlignment} from "./Engine/Utils/TextStyling/textAlignment.ts";
import RestartButton from "./UI/RestartButton.ts";
import HighScore from "./Engine/Utils/Game/HighScore.ts";
import FinalScoreDisplay from "./UI/FinalScoreDisplay.ts";
import NewHighScoreSplash from "./UI/NewHighScoreSplash.ts";

export default class SpaceShooter extends Game<SpaceShooter>
{
    public projector: GridProjector
    private enemyInterval: [min: number, max: number] = [5, 40]
    private enemyTimer: number = 0;
    private readonly player: Player
    public readonly screenShake: ScreenShake = new ScreenShake();
    public readonly mobilityCounter: Counter = new Counter(30, 1800, 4);
    public score: number = 0

    private readonly highScore: HighScore = new HighScore()

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
    private readonly restartButton: RestartButton;
    private readonly restartButtonWait: number = 250;
    private readonly scoreTextWait: number = 200;
    private readonly hsDisplay: FinalScoreDisplay;
    private readonly newHSSplash: NewHighScoreSplash;

    private readonly playerExplosionPoints = [1, 60, 120]

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
            this.Width / 2, this.Height / 2 - 50,
            0, 100, 1, 0,
            this,
            textAlignment.CENTER,
            new Set<number>([Tags.GAME_OVER_UI])
        )

        this.restartButton = new RestartButton(this.Width / 2, this.Height / 2 + 50, this)
        this.hsDisplay = new FinalScoreDisplay(this.Width / 2, this.Height / 2 + 175, this)
        this.newHSSplash = new NewHighScoreSplash(this.Width / 2 + 100, this.Height / 2 + 190, 5, this)
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
        this.ui.add(this.restartButton)
        this.ui.add(this.hsDisplay)
        this.ui.add(this.newHSSplash)

        this.spawnInitialStars()

        this.setStage(0)
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

        if (this.gameState == gameStates.GAME_OVER_TRANSITION)
        {
            this.explodePlayer()
        }

        this.restartButton.hitbox.active = this.gameState == gameStates.GAME_OVER_TRANSITION && this.globalTime > this.restartButtonWait + 30

        this.spawnStars()
    }

    public reset()
    {
        this.score = 0
        this.player.currentHP = this.player.maxHP
        this.player.IFrameCounter = 0
        this.player.x = this.Width / 2
        this.player.y = this.Height
        this.entities.clear()
        this.particles.clear()
        this.backgroundParticles.clear()
        this.spawnInitialStars()
        this.entities.add(this.player)
        this.player.hidden = false
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
        this.restartButton.hitbox.active = false

        switch (state)
        {
            case gameStates.ONGOING:
                this.setAllWithTag(Tags.RUN_UI, this.ui, false)
                this.reset()
                break;

            case gameStates.GAME_OVER_TRANSITION:
                this.setAllWithTag(Tags.RUN_UI, this.ui, false)
                this.setAllWithTag(Tags.GAME_OVER_UI, this.ui, false)
                this.player.hidden = true

                this.highScore.add(this.score)
                this.hsDisplay.score = this.score

                this.newHSSplash.hidden = !this.highScore.IsNewBest
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

    private setAllWithTag(tag: number, set: Set<IEntity<SpaceShooter>>, hidden: boolean)
    {
        set.forEach(entity => {
            if (entity.tagged(tag))
                entity.hidden = hidden
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
            this.restartButton.Opacity = (this.globalTime - this.restartButtonWait) / (this.fadeOutLength * 0.5)
            this.hsDisplay.Opacity = (this.globalTime - this.scoreTextWait) / (this.fadeOutLength * 0.5)
            this.newHSSplash.Opacity = (this.globalTime - this.scoreTextWait) / (this.fadeOutLength * 0.5)
        }
        else
        {
            this.restartButton.Opacity = 0
            this.fading.Opacity = 0
            this.gameOverText.Opacity = 0
            this.hsDisplay.Opacity = 0
            this.newHSSplash.Opacity = 0
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

    spawnExplosionParticles(x: number, y: number, size: number)
    {
        for (let i = 0; i < 3; i++) {
            this.particles.spawn(Particles.SCATTER, x, y, 1, 0, size * 10 + i)
        }
        for (let i = 0; i < 5; i++) {
            this.particles.spawn(Particles.SMOKE, x, y, 1, 0, size)
        }
    }

    explodePlayer()
    {
        if (this.playerExplosionPoints.includes(this.globalTime))
        {
            this.screenShake.start()
            this.spawnExplosionParticles(this.player.x + Random(-40, 40), this.player.y + Random(-10, 10) - 40, 4)
        }
    }
}