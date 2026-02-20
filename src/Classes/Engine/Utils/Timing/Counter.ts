export default class Counter {
    private readonly max: number;
    private count: number;

    private readonly positiveWeight: number;
    private readonly negativeWeight: number;

    constructor(seconds: number, start: number = 0, positiveWeight: number = 1, negativeWeight: number = 1) {
        this.max = seconds * 60
        this.count = start

        this.positiveWeight = positiveWeight
        this.negativeWeight = negativeWeight
    }

    update(state: boolean) {
        if (state)
            this.count = Math.min(this.count + this.positiveWeight, this.max)
        else
            this.count = Math.max(this.count - this.negativeWeight, 0)
    }

    get f()
    {
        return this.count / this.max;
    }
}