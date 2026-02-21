export default class HighScore
{
    private bestScore: number
    private newBest: boolean = false

    constructor(def: number = 0) {
        this.bestScore = def
    }

    add(score: number)
    {
        this.newBest = false
        if (this.bestScore < score)
        {
            this.bestScore = score
            this.newBest = true
        }
    }

    get AllTimeBest() {
        return this.bestScore
    }

    get IsNewBest() {
        return this.newBest
    }
}