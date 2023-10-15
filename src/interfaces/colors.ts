/** { r: 0-255, g: 0-255, b: 0-255 } */
export interface RGB {
  /** Red 0-255 */
  r: number;
  /** Green 0-255 */
  g: number;
  /** Blue 0-255 */
  b: number;
}

/** { h: 0-360, s: 0-100, l: 0-50 } */
export interface HSL {
  /** Hue 0-360 */
  h: number;
  /** Saturation 0-100 */
  s: number;
  /** Light 0-100 */
  l: number;
}
/** { s: 0-100, l: 0-50 } */
export type SL = Omit<HSL, "h">;

/** { h: 0-360, s: 0-100, v: 0-100 } */
export interface HSV {
  /** Hue 0-360 */
  h: number;
  /** Saturation 0-1 */
  s: number;
  /** Light 0-1 */
  v: number;
}
/** { s: 0-100, v: 0-100 } */
export type SV = Omit<HSV, "h">;

/** CSS names of colors */
export enum CssColorNames {
  IndianRed = "#cd5c5c",
  LightCoral = "#f08080",
  Salmon = "#fa8072",
  DarkSalmon = "#e9967a",
  LightSalmon = "#ffa07a",
  Crimson = "#dc143c",
  Red = "#ff0000",
  FireBrick = "#b22222",
  DarkRed = "#8b0000",
  Pink = "#ffc0cb",
  LightPink = "#ffb6c1",
  HotPink = "#ff69b4",
  DeepPink = "#ff1493",
  MediumVioletRed = "#c71585",
  PaleVioletRed = "#db7093",
  Coral = "#ff7f50",
  Tomato = "#ff6347",
  OrangeRed = "#ff4500",
  DarkOrange = "#ff8c00",
  Orange = "#ffa500",
  Gold = "#ffd700",
  Yellow = "#ffff00",
  LightYellow = "#ffffe0",
  LemonChiffon = "#fffacd",
  LightGoldenrodYellow = "#fafad2",
  PapayaWhip = "#ffefd5",
  Moccasin = "#ffe4b5",
  PeachPuff = "#ffdab9",
  PaleGoldenrod = "#eee8aa",
  Khaki = "#f0e68c",
  DarkKhaki = "#bdb76b",
  Lavender = "#e6e6fa",
  Thistle = "#d8bfd8",
  Plum = "#dda0dd",
  Violet = "#ee82ee",
  Orchid = "#da70d6",
  Fuchsia = "#ff00ff",
  Magenta = "#ff00ff",
  MediumOrchid = "#ba55d3",
  MediumPurple = "#9370db",
  BlueViolet = "#8a2be2",
  DarkViolet = "#9400d3",
  DarkOrchid = "#9932cc",
  DarkMagenta = "#8b008b",
  Purple = "#800080",
  RebeccaPurple = "#663399",
  Indigo = "#4b0082",
  MediumSlateBlue = "#7b68ee",
  SlateBlue = "#6a5acd",
  DarkSlateBlue = "#483d8b",
  GreenYellow = "#adff2f",
  Chartreuse = "#7fff00",
  LawnGreen = "#7cfc00",
  Lime = "#00ff00",
  LimeGreen = "#32cd32",
  PaleGreen = "#98fb98",
  LightGreen = "#90ee90",
  MediumSpringGreen = "#00fa9a",
  SpringGreen = "#00ff7f",
  MediumSeaGreen = "#3cb371",
  SeaGreen = "#2e8b57",
  ForestGreen = "#228b22",
  Green = "#008000",
  DarkGreen = "#006400",
  YellowGreen = "#9acd32",
  OliveDrab = "#6b8e23",
  Olive = "#808000",
  DarkOliveGreen = "#556b2f",
  MediumAquamarine = "#66cdaa",
  DarkSeaGreen = "#8fbc8f",
  LightSeaGreen = "#20b2aa",
  DarkCyan = "#008b8b",
  Teal = "#008080",
  Aqua = "#00ffff",
  Cyan = "#00ffff",
  LightCyan = "#e0ffff",
  PaleTurquoise = "#afeeee",
  Aquamarine = "#7fffd4",
  Turquoise = "#40e0d0",
  MediumTurquoise = "#48d1cc",
  DarkTurquoise = "#00ced1",
  CadetBlue = "#5f9ea0",
  SteelBlue = "#4682b4",
  LightSteelBlue = "#b0c4de",
  PowderBlue = "#b0e0e6",
  LightBlue = "#add8e6",
  SkyBlue = "#87ceeb",
  LightSkyBlue = "#87cefa",
  DeepSkyBlue = "#00bfff",
  DodgerBlue = "#1e90ff",
  CornflowerBlue = "#6495ed",
  RoyalBlue = "#4169e1",
  Blue = "#0000ff",
  MediumBlue = "#0000cd",
  DarkBlue = "#00008b",
  Navy = "#000080",
  MidnightBlue = "#191970",
  Cornsilk = "#fff8dc",
  BlanchedAlmond = "#ffebcd",
  Bisque = "#ffe4c4",
  NavajoWhite = "#ffdead",
  Wheat = "#f5deb3",
  BurlyWood = "#deb887",
  Tan = "#d2b48c",
  RosyBrown = "#bc8f8f",
  SandyBrown = "#f4a460",
  Goldenrod = "#daa520",
  DarkGoldenrod = "#b8860b",
  Peru = "#cd853f",
  Chocolate = "#d2691e",
  SaddleBrown = "#8b4513",
  Sienna = "#a0522d",
  Brown = "#a52a2a",
  Maroon = "#800000",
  White = "#ffffff",
  Snow = "#fffafa",
  Honeydew = "#f0fff0",
  MintCream = "#f5fffa",
  Azure = "#f0ffff",
  AliceBlue = "#f0f8ff",
  GhostWhite = "#f8f8ff",
  WhiteSmoke = "#f5f5f5",
  Seashell = "#fff5ee",
  Beige = "#f5f5dc",
  OldLace = "#fdf5e6",
  FloralWhite = "#fffaf0",
  Ivory = "#fffff0",
  AntiqueWhite = "#faebd7",
  Linen = "#faf0e6",
  LavenderBlush = "#fff0f5",
  MistyRose = "#ffe4e1",
  Gainsboro = "#dcdcdc",
  LightGray = "#d3d3d3",
  LightGrey = "#d3d3d3",
  Silver = "#c0c0c0",
  DarkGray = "#a9a9a9",
  DarkGrey = "#a9a9a9",
  Gray = "#808080",
  Grey = "#808080",
  DimGray = "#696969",
  DimGrey = "#696969",
  LightSlateGray = "#778899",
  LightSlateGrey = "#778899",
  SlateGray = "#708090",
  SlateGrey = "#708090",
  DarkSlateGray = "#2f4f4f",
  DarkSlateGrey = "#2f4f4f",
  Black = "#000000",
}
export type CssColorName = keyof typeof CssColorNames | "";
