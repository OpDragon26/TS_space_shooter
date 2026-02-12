export default class Counter {
    private readonly max: number;
    private count: number = 0;
    constructor(seconds: number) {
        this.max = seconds * 60
    }

    update(state: boolean) {
        if (state)
            this.count = Math.min(this.count + 1, this.max)
        else
            this.count = Math.max(this.count - 1, 0)
    }

    get f()
    {
        return this.count / this.max;
    }
}