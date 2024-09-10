export const rgbToDecimal = (rgb: any) => ({
    r: rgb.r / 255,
    g: rgb.g / 255,
    b: rgb.b / 255,
    a: rgb.a / 255,
});

export const decimalToRgb = (decimal: any) => ({
    r: Math.round(decimal.r * 255),
    g: Math.round(decimal.g * 255),
    b: Math.round(decimal.b * 255),
    a: Math.round(decimal.a * 255)
});
