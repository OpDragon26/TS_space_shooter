export default function (v: number, min: number, max: number)
{
    if (v > max)
        return max
    if (v < min)
        return min
    return v
}