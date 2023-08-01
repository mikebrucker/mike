import { HSL, HSV, RGB } from "../interfaces/Colors";

/** input: h in [0,360] and s,v in [0,100] - output: r,g,b in [0,255] */
export const convertHsvToRgb = (hsv: HSV): RGB => {
  const { h, s: s100, v: v100 } = hsv;
  const s = s100 / 100;
  const v = v100 / 100;
  /** f */
  const f = (n: number, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  const r = minMax(Math.round(f(5) * 255));
  const g = minMax(Math.round(f(3) * 255));
  const b = minMax(Math.round(f(1) * 255));
  return { r, g, b };
};

/** input: r,g,b in [0,255], out: h in [0,360) and s,v in [0,100]*/
export const convertRgbToHsv = (rgb: RGB): HSV => {
  const { r: r255, g: g255, b: b255 } = rgb;
  const r = r255 / 255;
  const g = g255 / 255;
  const b = b255 / 255;
  const y = Math.max(r, g, b);
  const c = y - Math.min(r, g, b);
  const x = c && (y == r ? (g - b) / c : y == g ? 2 + (b - r) / c : 4 + (r - g) / c);
  const h = Math.round(minMax(60 * (x < 0 ? x + 6 : x), 360));
  const s = Math.round(minMax(100 * (y && c / y), 100));
  const v = Math.round(minMax(100 * y, 100));
  return { h, s, v };
};

/** Convert Hsl To Hsv */
export function convertHslToHsv(hsl: HSL): HSV {
  const { h, s: hslS, l: hslL } = hsl;
  const hsv1 = (hslS * (hslL < 50 ? hslL : 100 - hslL)) / 100;
  const s = hsv1 === 0 ? 0 : ((2 * hsv1) / (hslL + hsv1)) * 100;
  const v = hslL + hsv1;
  return { h, s, v };
}
/** Convert Hsv To Hsl*/
export function convertHsvToHsl(hsv: HSV): HSL {
  const { h, s: hsvS, v: hsvV } = hsv;
  const hslL = ((200 - hsvS) * hsvV) / 100;
  const s =
    hslL === 0 || hslL === 200
      ? 0
      : ((hsvS * hsvV) / 100 / (hslL <= 100 ? hslL : 200 - hslL)) * 100;
  const l = (hslL * 5) / 10;
  return { h, s: Math.round(s), l: Math.round(l) };
}
/** `RGB` to `HSL` */
export const convertRgbToHsl = (rgb: RGB): HSL => {
  // Make r, g, and b fractions of 1
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;
  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100);
  l = +(l * 100);

  return { h, s: Math.round(s), l: Math.round(l) };
};

/** Convert HSL to RGB */
export const convertHslToRgb = (hsl: HSL): RGB => {
  const { h, s, l } = hsl;

  const hDecimal = h / 360;
  const sDecimal = s / 100;
  const lDecimal = l / 100;

  if (s === 0) {
    const gray = Math.floor(lDecimal * 255);
    return { r: gray, g: gray, b: gray };
  }

  /** Hue to RGB */
  const hueToRgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = lDecimal < 0.5 ? lDecimal * (1 + sDecimal) : lDecimal + sDecimal - lDecimal * sDecimal;
  const p = 2 * lDecimal - q;

  const r = hueToRgb(p, q, hDecimal + 0.333);
  const g = hueToRgb(p, q, hDecimal);
  const b = hueToRgb(p, q, hDecimal - 0.333);

  return { r: Math.floor(r * 255), g: Math.floor(g * 255), b: Math.floor(b * 255) };
};

/** Validate CSS hex color for rgb `#12ab34` or rgba `#12ab34ff` */
export const isValidHexColor = (color: string, rgba?: boolean): boolean => {
  return new RegExp(`^#([0-9a-fA-F]{${!rgba ? 6 : 8}})$`).test(color);
};

/**
 * Force Number in between min and max
 * @param max default 255
 * @param min default 0
 */
export const minMax = (n: number, max = 255, min = 0): number => Math.min(Math.max(n, min), max);

/** Convert RGB values to Hex */
export const convertRgbToHex = (rgb: RGB): string => {
  const { r, g, b } = rgb;
  const hex = {
    r: minMax(r).toString(16).padStart(2, "0"),
    g: minMax(g).toString(16).padStart(2, "0"),
    b: minMax(b).toString(16).padStart(2, "0"),
  };
  const x = "#" + Object.values(hex).join("");
  return x;
};

/** Convert Hex value to RGB */
export const convertHexToRgb = (hex: string): RGB | undefined => {
  if (!isValidHexColor(hex)) return;
  return {
    r: minMax(parseInt(hex.slice(1, 3), 16)),
    g: minMax(parseInt(hex.slice(3, 5), 16)),
    b: minMax(parseInt(hex.slice(5, 7), 16)),
  };
};
