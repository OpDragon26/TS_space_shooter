export const fontStyle = {
    NORMAL: 0,
    BOLD: 1,
    ITALIC: 2,
    SMALL_CAPS: 3,
}

const fontStyles: string[] = ["", "bold ", "italic ", "small-caps "];
export function getStyleName(fs: number)
{
    return fontStyles[fs];
}