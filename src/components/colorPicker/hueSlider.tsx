import React, { useEffect, useState } from "react";
import { minMax } from "../../helpers/colors";
import { classNames } from "../../helpers/helper";
import "./style.scss";

interface Props {
  cssClasses?: string;
  width?: number;
  hue: number;
  setHue: (hue: number) => void;
}

/** Select a custom color */
export const ColorPickerHueSlider = ({ cssClasses, hue, setHue, width }: Props) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [tagColor, setTagColor] = useState("#FF0000");
  const sliderWidth = width || 256;

  useEffect(() => {
    if (typeof hue === "number") {
      handleHueToSliderPosition(hue);
      setTagColor(`hsl(${hue}, 100%, 50%)`);
    }
  }, [hue]);

  /** Hue to slider position */
  const handleHueToSliderPosition = (h: number) => {
    // const rgb = convertHslToRgb({ h, s: 100, l: 50 });
    // const { r, g, b } = rgb;
    const positionOffset = -3;
    // const w = 256;
    // let offset = 0;
    // let factor = 0;

    // if (r === 255) {
    //   if (g) {
    //     factor = 0;
    //     offset = g;
    //   } else if (b) {
    //     factor = 5;
    //     offset = w - b;
    //   }
    // } else if (g === 255) {
    //   factor = 1;
    //   offset = w - r;
    //   if (b) {
    //     factor = 2;
    //     offset = b;
    //   }
    // } else if (b === 255) {
    //   factor = 3;
    //   offset = w - g;
    //   if (r) {
    //     factor = 4;
    //     offset = r;
    //   }
    // }

    // const position = ((w * factor + Math.min(offset, w)) / (w * 6)) * w;
    // setSliderPosition(position * (sliderWidth / w) + positionOffset);
    const p = (h / 360) * sliderWidth;
    setSliderPosition(p + positionOffset);
  };

  /** Handle Slider */
  const handleSlider = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickedPosX = Math.min(Math.max(e.clientX - rect.left, 0), sliderWidth);
    const clickedHue = Math.round((clickedPosX / sliderWidth) * 360);
    const h = minMax(clickedHue, 360, 0);
    // const width = 256;
    // const x = clickedPosX * (width / sliderWidth);
    // if (isNaN(x)) return;

    // const z = Math.round(x * 6);
    // const factor = Math.ceil(z / width);
    // let rgb: RGB = { r: 255, g: 0, b: 0 };
    // switch (factor) {
    //   case 0:
    //   case 1:
    //     rgb = { r: 255, g: minMax(z), b: 0 };
    //     break;
    //   case 2:
    //     rgb = { r: minMax(width * factor - z), g: 255, b: 0 };
    //     break;
    //   case 3:
    //     rgb = { r: 0, g: 255, b: minMax(width - (width * factor - z)) };
    //     break;
    //   case 4:
    //     rgb = { r: 0, g: minMax(width * factor - z), b: 255 };
    //     break;
    //   case 5:
    //     rgb = { r: minMax(width - (width * factor - z)), g: 0, b: 255 };
    //     break;
    //   case 6:
    //     rgb = { r: 255, g: 0, b: minMax(width * factor - z) };
    //     break;
    // }
    // const { h } = convertRgbToHsl(rgb);
    setHue(h);
  };

  const className = classNames({
    "c-color-picker-slider": true,
    [cssClasses ?? ""]: Boolean(cssClasses),
  });

  return (
    <div className={className} style={{ width: `${sliderWidth}px` }} onMouseUp={handleSlider}>
      <div
        className="c-color-picker-slider-tag"
        style={{ marginLeft: sliderPosition, background: tagColor }}
      />
    </div>
  );
};
