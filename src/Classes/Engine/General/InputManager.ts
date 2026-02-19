export default class InputManager {
    private inputKeys: Record<string, boolean> = {};
    public mouseX: number = 0;
    public mouseY: number = 0;

    constructor() {
        window.addEventListener("keydown", (e) => {this.inputKeys[e.key] = true});
        window.addEventListener("keyup", (e) => {this.inputKeys[e.key] = false});
    }

    isKeyDown(key: string)
    {
        return this.inputKeys[key];
    }

    update() {

    }
}