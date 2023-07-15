import { useEffect, useState } from "react";
import {
  convertHexToRgb,
  convertHslToRgb,
  convertHsvToHsl,
  convertRgbToHex,
  convertRgbToHsl,
  isValidHexColor,
  minMax,
} from "../../helpers/Colors";
import { classNames } from "../../helpers/Helper";
import { HSL, SV } from "../../interfaces/Colors";
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
  const [inputHex, setInputHex] = useState(currentColor);
  const [inputRgb, setInputRgb] = useState("");
  const [inputHsl, setInputHsl] = useState("");

  useEffect(() => {
    if (hsl) {
      setColor(convertRgbToHex(convertHslToRgb(hsl)));
    }
  }, [hsl]);

  useEffect(() => {
    const rgb = convertHexToRgb(currentColor);
    if (rgb) setHsl(convertRgbToHsl(rgb));
    initInputs();
  }, []);

  useEffect(() => {
    if (currentColor !== inputHex) {
      initInputs();
    }
  }, [currentColor]);

  /** Initialize input texts */
  const initInputs = () => {
    setInputHex(currentColor);
    const rgb = convertHexToRgb(currentColor);
    if (rgb) {
      setInputRgb(Object.values(rgb).join());
      setInputHsl(
        Object.values(convertRgbToHsl(rgb))
          .map(n => Math.round(n))
          .join()
      );
    }
  };

  /** Handle Set Hue */
  const handleSetHue = (h: number) => {
    setHsl(huSaLi => (huSaLi ? { ...huSaLi, h } : undefined));
  };

  /** Handle Set Saturation Value */
  const handleSetSaturationValue = ({ s, v }: SV) => {
    const convertedHsl = convertHsvToHsl({ h: hsl?.h ?? 0, s, v });
    setHsl(convertedHsl);
    setInputHsl(
      Object.values(convertedHsl)
        .map(n => Math.round(n))
        .join()
    );
  };

  /** Manually change hex color code */
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInputHex(value.slice(0, 7));
    if (isValidHexColor(value)) setColor(value);
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
      const h = minMax(Math.round(hue));
      const s = minMax(Math.round(sat));
      const l = minMax(Math.round(lig));
      const hsl = { h, s, l };
      const hex = convertRgbToHex(convertHslToRgb(hsl));
      if (isValidHexColor(hex)) {
        setHsl(hsl);
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
              onChange={handleHexChange}
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
