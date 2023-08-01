import { useEffect, useState } from "react";
import {
  convertHexToRgb,
  convertHslToRgb,
  convertHsvToRgb,
  convertRgbToHex,
  convertRgbToHsl,
  isValidHexColor,
  minMax,
} from "../../helpers/colors";
import { classNames } from "../../helpers/helper";
import { HSL, SV } from "../../interfaces/colors";
import { Input } from "../input";
import { Phrase } from "../l10n";
import { ColorPickerSaturationValueChart } from "./chart";
import { ColorPickerHueSlider } from "./hueSlider";
import "./style.scss";

interface Props {
  isOpen?: boolean;
  cssClasses?: string;
  /** Hex value rgba "#12ab34ff" */
  currentColor: string;
  title?: string;
  setColor: (hex: string) => void;
  close?: () => void;
}

/** Select a custom color */
export const ColorPicker = ({
  isOpen,
  cssClasses,
  currentColor,
  title,
  setColor,
  close,
}: Props) => {
  const [hsl, setHsl] = useState<HSL>();
  const [inputHex, setInputHex] = useState("");
  const [inputRgb, setInputRgb] = useState("");
  const [inputHsl, setInputHsl] = useState("");

  useEffect(() => {
    if (currentColor !== inputHex) {
      setAll(currentColor);
    }
  }, [currentColor]);

  /** Set all inputs and hsl for sub components */
  const setAll = (hex: string) => {
    const newRgb = convertHexToRgb(hex) ?? { r: 0, g: 0, b: 0 };
    const newHsl = convertRgbToHsl(newRgb);
    setHsl(newHsl);
    setInputHex(currentColor);
    setInputRgb(Object.values(newRgb).join(","));
    setInputHsl(Object.values(newHsl).join(","));
  };

  /** Handle Set Hue */
  const handleSetHue = (h: number) => {
    if (!hsl) return;
    const newHsl = { ...hsl, h };
    setColor(convertRgbToHex(convertHslToRgb(newHsl)));
  };

  /** Handle Set Saturation Value */
  const handleSetSaturationValue = ({ s, v }: SV) => {
    const hsv = { h: hsl?.h ?? 0, s, v };
    setColor(convertRgbToHex(convertHsvToRgb(hsv)));
  };

  /** Manually change hex color code */
  const handleInputHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const hex = value.slice(0, 7);
    setInputHex(hex);
    if (isValidHexColor(hex)) setColor(hex);
  };

  /** Manually change rgb color code */
  const handleInputRgb = (rgbString: string) => {
    setInputRgb(rgbString);
    const [red, gre, blu] = rgbString.split(",").map(x => parseInt(x));
    if ([red, gre, blu].every(c => typeof c === "number" && !isNaN(c))) {
      const r = minMax(Math.round(red));
      const g = minMax(Math.round(gre));
      const b = minMax(Math.round(blu));
      const rgb = { r, g, b };
      const hex = convertRgbToHex(rgb);
      if (isValidHexColor(hex)) {
        setColor(hex);
      }
    }
  };

  /** Manually change hsl color code */
  const handleInputHsl = (hslString: string) => {
    setInputHsl(hslString);
    if (hslString.includes(".")) return;
    const [hue, sat, lig] = hslString.split(",").map(x => parseInt(x));
    if ([hue, sat, lig].every(c => typeof c === "number" && !isNaN(c))) {
      const h = minMax(Math.round(hue), 360);
      const s = minMax(Math.round(sat));
      const l = minMax(Math.round(lig));
      const hsl = { h, s, l };
      const hex = convertRgbToHex(convertHslToRgb(hsl));
      if (isValidHexColor(hex)) {
        setColor(hex);
      }
    }
  };

  const className = classNames({
    "c-color-picker": true,
    [cssClasses ?? ""]: Boolean(cssClasses),
  });

  return isOpen && currentColor ? (
    <aside className={className}>
      <div className="c-color-picker-background" onClick={close} />
      <div className="c-color-picker-content" style={{ backgroundColor: currentColor }}>
        <div className="c-color-picker-content-container">
          <h5>
            <Phrase>{title}</Phrase>
          </h5>
          <ColorPickerSaturationValueChart
            hue={hsl?.h ?? 0}
            setSaturationValue={handleSetSaturationValue}
            currentColor={currentColor}
          />
          <ColorPickerHueSlider setHue={handleSetHue} hue={hsl?.h ?? 0} />
          <section className="c-color-picker-inputs">
            <Input
              name="hex"
              value={inputHex}
              type="text"
              label="tools.qrcode.input.colorPicker.hex.title"
              desc="tools.qrcode.input.colorPicker.hex.desc"
              onChange={handleInputHexChange}
            />
            <Input
              name="rgb"
              value={inputRgb}
              type="text"
              label="tools.qrcode.input.colorPicker.rgb.title"
              desc="tools.qrcode.input.colorPicker.rgb.desc"
              onChange={e => handleInputRgb(e.currentTarget.value)}
            />
            <Input
              name="rgb"
              value={inputHsl}
              type="text"
              label="tools.qrcode.input.colorPicker.hsl.title"
              desc="tools.qrcode.input.colorPicker.hsl.desc"
              onChange={e => handleInputHsl(e.currentTarget.value)}
            />
          </section>
        </div>
      </div>
    </aside>
  ) : null;
};
