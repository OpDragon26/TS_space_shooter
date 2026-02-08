import Rectangle from "./Engine/Entities/Rectangle.ts";
import type Game from "./Engine/Game.ts";

export default class Player extends Rectangle
{
    private readonly acceleration: number = 0.2;
    private readonly maxSpeed: number = 3;
    private speed: number = 0;

    private readonly limit: number = 400;

    constructor(x: number, y: number, game: Game) {
        super(x, y, 50, 20, 1, game, "#444282");
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