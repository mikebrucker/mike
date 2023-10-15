import { useEffect, useState } from "react";
import {
  convertHexToRgb,
  convertHslToHsv,
  convertHsvToHsl,
  convertHsvToRgb,
  convertRgbToHex,
  convertRgbToHsv,
  isValidHexColor,
  isValidHslColor,
  isValidHsvColor,
  isValidRgbColor,
  minMax,
} from "../../helpers/colors";
import { classNames } from "../../helpers/helper";
import { CssColorNames, HSL, HSV, SV } from "../../interfaces/colors";
import { Input } from "../input";
import { Phrase } from "../l10n";
import { PopupSelector } from "../popupSelector";
import { ColorPickerSaturationValueChart } from "./chart";
import { ColorPickerHueSlider } from "./hueSlider";
import "./style.scss";

interface Props {
  isOpen?: boolean;
  cssClasses?: string;
  title?: string;
  /** Hex value rgba "#12ab34ff" */
  masterColor: HSV;
  setMasterColor: (hsv: HSV) => void;
  close?: () => void;
}

/** Select a custom color */
export const ColorPicker = ({
  isOpen,
  cssClasses,
  title,
  masterColor,
  setMasterColor,
  close,
}: Props) => {
  const [hsl, setHsl] = useState<HSL>();
  const [inputHex, setInputHex] = useState("");
  const [inputRgb, setInputRgb] = useState("");
  const [inputHsl, setInputHsl] = useState("");
  const [inputHsv, setInputHsv] = useState("");
  const [inputCssColorNameHex, setInputCssColorNameHex] = useState("");

  const [cssSelectorsOpen, setCssSelectorsOpen] = useState(false);

  useEffect(() => {
    setColors(masterColor);
  }, [JSON.stringify(masterColor)]);

  // TODO set colors in a different way as css color names convert slightly off
  /** Set all inputs and hsl for sub components */
  const setColors = (hsv: HSV) => {
    const newRgb = convertHsvToRgb(hsv);
    const newHsl = convertHsvToHsl(hsv);
    setHsl(newHsl);
    setInputHex(convertRgbToHex(newRgb));
    setInputRgb(Object.values(newRgb).join(","));
    setInputHsl(Object.values(newHsl).join(","));
    setInputHsv(
      Object.values(hsv)
        .map(n => Math.round(n))
        .join(",")
    );
  };

  /** Handle Set Hue */
  const handleSetHue = (h: number) => {
    if (hsl) setMasterColor(convertHslToHsv({ ...hsl, h }));
  };

  /** Handle Set Saturation Value */
  const handleSetSaturationValue = ({ s, v }: SV) => {
    setMasterColor({ h: hsl?.h ?? 0, s, v });
  };

  /** Manually change hex color code */
  const handleInputHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const hex = value.slice(0, 7);
    setInputHex(hex);
    if (isValidHexColor(hex)) setMasterColor(convertRgbToHsv(convertHexToRgb(hex)!));
  };

  /** Manually change rgb color code */
  const handleInputRgb = (rgbString: string) => {
    setInputRgb(rgbString);
    const [red, gre, blu] = rgbString.split(",").map(x => parseInt(x));
    if ([red, gre, blu].every(c => typeof c === "number" && !isNaN(c))) {
      const r = minMax(Math.round(red));
      const g = minMax(Math.round(gre));
      const b = minMax(Math.round(blu));
      if (isValidRgbColor({ r: red, g: gre, b: blu })) setMasterColor(convertRgbToHsv({ r, g, b }));
    }
  };

  /** Manually change hsl color code */
  const handleInputHsl = (hslString: string) => {
    setInputHsl(hslString);
    if (hslString.includes(".")) return;
    const [hue, sat, lig] = hslString.split(",").map(x => parseInt(x));
    if ([hue, sat, lig].every(c => typeof c === "number" && !isNaN(c))) {
      const h = minMax(Math.round(hue), 360);
      const s = minMax(Math.round(sat), 100);
      const l = minMax(Math.round(lig), 50);
      if (isValidHslColor({ h: hue, s: sat, l: lig })) setMasterColor(convertHslToHsv({ h, s, l }));
    }
  };

  /** Manually change hsl color code */
  const handleInputHsv = (hsvString: string) => {
    setInputHsv(hsvString);
    if (hsvString.includes(".")) return;
    const [hue, sat, val] = hsvString.split(",").map(x => parseInt(x));
    if ([hue, sat, val].every(c => typeof c === "number" && !isNaN(c))) {
      const h = minMax(Math.round(hue), 360);
      const s = minMax(Math.round(sat), 100);
      const v = minMax(Math.round(val), 100);
      if (isValidHsvColor({ h: hue, s: sat, v: val })) setMasterColor({ h, s, v });
    }
  };

  /** Use standard css named colors */
  const selectCssColorNameHex = (colorNameHex: string) => {
    setMasterColor(convertRgbToHsv(convertHexToRgb(colorNameHex)!));
    setInputHex(colorNameHex);
    setInputCssColorNameHex(colorNameHex);
    setCssSelectorsOpen(false);
  };

  const className = classNames({
    "c-color-picker": true,
    [cssClasses ?? ""]: Boolean(cssClasses),
  });
  const backgroundColor = convertRgbToHex(convertHsvToRgb(masterColor));

  return isOpen ? (
    <aside className={className}>
      <div className="c-color-picker-background" onClick={close} />
      <div className="c-color-picker-content" style={{ backgroundColor }}>
        <div className="c-color-picker-content-container">
          <h5>
            <Phrase>{title}</Phrase>
          </h5>
          <ColorPickerSaturationValueChart
            setSaturationValue={handleSetSaturationValue}
            masterColor={masterColor}
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
              name="hsl"
              value={inputHsl}
              type="text"
              label="tools.qrcode.input.colorPicker.hsl.title"
              desc="tools.qrcode.input.colorPicker.hsl.desc"
              onChange={e => handleInputHsl(e.currentTarget.value)}
            />
            <Input
              name="hsv"
              value={inputHsv}
              type="text"
              label="tools.qrcode.input.colorPicker.hsv.title"
              desc="tools.qrcode.input.colorPicker.hsv.desc"
              onChange={e => handleInputHsv(e.currentTarget.value)}
            />
            <Input
              name="cssColor"
              value={inputCssColorNameHex}
              type="text"
              label="tools.qrcode.input.colorPicker.cssColor.title"
              desc="tools.qrcode.input.colorPicker.cssColor.desc"
              onClick={() => setCssSelectorsOpen(!cssSelectorsOpen)}
            />
          </section>
        </div>
      </div>
      <PopupSelector
        cssClasses="c-color-picker-css-selector"
        isOpen={cssSelectorsOpen}
        selections={CssColorNames}
        selected={inputCssColorNameHex}
        select={hex => selectCssColorNameHex(hex)}
        useCssBackground={true}
        close={() => setCssSelectorsOpen(false)}
      />
    </aside>
  ) : null;
};
