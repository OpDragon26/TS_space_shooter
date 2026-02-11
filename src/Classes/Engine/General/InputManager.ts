export default class InputManager {
    private inputKeys: Record<string, boolean> = {};

    constructor() {
        window.addEventListener("keydown", (e) => {this.inputKeys[e.key] = true});
        window.addEventListener("keyup", (e) => {this.inputKeys[e.key] = false});
    }

    isKeyDown(key: string)
    {
        return this.inputKeys[key];
    }
}