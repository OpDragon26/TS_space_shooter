import type Game from "../../General/Game.ts";
import type IEntity from "../IEntity.ts";
import clamp from "../../Utils/clamp.ts";
import type IHitbox from "../../Hitboxes/IHitbox.ts";
import RectangleHitbox from "../../Hitboxes/RectangleHitbox.ts";
import rotateCanvas from "../../Utils/rotateCanvas.ts";
type PressFn = () => void;

export default class Button<GT extends Game<GT>> implements IEntity<GT>
{
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
    rotation: number;
    game: GT;
    hidden: boolean;
    tags: Set<number>;
    layer: number;
    opacity: number = 1
    hitbox: IHitbox
    activator: number;
    pressTime: number;
    onPress: PressFn
    protected lastPressTime: number = 0;

    constructor(x: number, y: number, width: number, height: number, scale: number, rotation: number, game: GT,
                activator: number = 0, pressTime: number = 30,
                onPress: PressFn,
                tags: Set<number> = new Set<number>()) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.scale = scale
        this.rotation = rotation
        this.game = game
        this.activator = activator
        this.pressTime = pressTime
        this.hidden = false
        this.tags = tags
        this.layer = 0
        this.onPress = onPress
        this.hitbox = new RectangleHitbox(x, y, width, height, scale)
    }

    public get Hover(): boolean {
        const x = this.game.inputManager.mouseX
        const y = this.game.inputManager.mouseY

        return this.hitbox.containsPoint(x, y)
    }

    public get Pressed(): boolean {
        return this.Hover && this.game.inputManager.isMouseDown(this.activator)
    }

    update() {
        this.hitbox.update(this)

        if (this.Pressed && this.lastPressTime == 0)
            this.lastPressTime = this.game.globalTime

        if (this.PressedElapsedTime >= this.pressTime && this.lastPressTime != 0)
        {
            this.onPress()
            this.lastPressTime = 0
        }
    }

    start() {

    }

    get PressedElapsedTime(): number {
        return this.game.globalTime - this.lastPressTime
    }


    public drawAt(pos: [x: number, y: number]) {

        if (!this.hidden) {
            this.game.ctx.save()
            this.drawBody(pos)
            this.game.ctx.restore();
        }
    }

    protected drawBody(pos: [x: number, y: number]) {
        rotateCanvas(this.game.ctx, this.rotation, pos[0], pos[1])

        if (this.Pressed)
            this.drawPressed(pos)
        else if (this.Hover)
            this.drawHover(pos)
        else
            this.drawNormal(pos)
    }

    //@ts-ignore
    protected drawPressed(pos: [x: number, y: number]) {}
    //@ts-ignore
    protected drawHover(pos: [x: number, y: number]) {}
    //@ts-ignore
    protected drawNormal(pos: [x: number, y: number]) {}

    get displayPos(): [x: number, y: number]
    {
        return [this.x + this.game.xOffsetGlobal, this.y + this.game.yOffsetGlobal];
    }

    public draw()
    {
        this.drawAt(this.displayPos)
    }

    public tagged(tag: number)
    {
        return this.tags.has(tag)
    }

    get Height() {
        return this.height * this.scale;
    }

    get Width() {
        return this.width * this.scale;
    }

    public get Opacity() {
        return this.opacity
    }

    public set Opacity(v: number) {
        this.opacity = clamp(v, 0, 1)
    }
}