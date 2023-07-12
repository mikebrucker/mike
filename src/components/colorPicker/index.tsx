import { useEffect, useState } from "react";
import {
  convertHexToRgb,
  convertHslToRgb,
  convertHsvToHsl,
  convertRgbToHex,
  convertRgbToHsl,
} from "../../helpers/Colors";
import { classNames } from "../../helpers/Helper";
import { HSL, SV } from "../../interfaces/Colors";
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

  useEffect(() => {
    if (hsl) setColor(convertRgbToHex(convertHslToRgb(hsl)));
  }, [hsl]);

  useEffect(() => {
    const rgb = convertHexToRgb(currentColor);
    if (rgb) setHsl(convertRgbToHsl(rgb));
  }, []);

  /** Handle Set Hue */
  const handleSetHue = (h: number) => {
    setHsl(huSaLi => (huSaLi ? { ...huSaLi, h } : undefined));
  };

  /** Handle Set Saturation Value */
  const handleSetSaturationValue = ({ s, v }: SV) => {
    const convertedHsl = convertHsvToHsl({ h: hsl?.h ?? 0, s, v });
    setHsl(convertedHsl);
  };

  const className = classNames({
    "c-color-picker": true,
    [cssClasses ?? ""]: Boolean(cssClasses),
  });

  return isOpen && currentColor ? (
    <aside className={className}>
      <div className="c-color-picker-background" onClick={close} />
      <div className="c-color-picker-content" style={{ backgroundColor: currentColor }}>
        <h5>
          <Phrase>{title}</Phrase>
        </h5>
        <ColorPickerSaturationValueChart
          hue={hsl?.h ?? 0}
          setSaturationValue={handleSetSaturationValue}
          currentColor={currentColor}
        />
        <ColorPickerHueSlider setHue={handleSetHue} hue={hsl?.h ?? 0} />
      </div>
    </aside>
  ) : null;
};
