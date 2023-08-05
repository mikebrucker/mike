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
  const sliderWidth = width || 256;

  const [sliderPosition, setSliderPosition] = useState(0);
  const [sliderMouseDown, setSliderMouseDown] = useState(false);
  const [tagColor, setTagColor] = useState("#FF0000");

  useEffect(() => {
    if (typeof hue === "number") {
      handleHueToSliderPosition(hue);
      setTagColor(`hsl(${hue}, 100%, 50%)`);
    }
  }, [hue]);

  /** Hue to slider position */
  const handleHueToSliderPosition = (h: number) => {
    /** Here to account for width of slider tag. make it about half i guess */
    const positionOffset = -3;
    const p = (h / 360) * sliderWidth;
    setSliderPosition(p + positionOffset);
  };

  /** Slider click */
  const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setSliderMouseDown(true);
    handleSliderMousMove(e, true);
  };

  /** Chart mouse move */
  const handleSliderMousMove = (e: React.MouseEvent<HTMLDivElement>, force?: boolean) => {
    if (sliderMouseDown || force) {
      const rect = e.currentTarget.getBoundingClientRect();
      setSliderHue(e.clientX - rect.left);
    }
  };

  /** Slider click */
  const handleSliderTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setSliderMouseDown(true);
    handleSliderTouchMove(e, true);
  };

  /** Slider mouse move */
  const handleSliderTouchMove = (e: React.TouchEvent<HTMLDivElement>, force?: boolean) => {
    if (e.touches[0] && (sliderMouseDown || force)) {
      const rect = e.currentTarget.getBoundingClientRect();
      const { clientX } = e.touches[0];
      setSliderHue(clientX - rect.left);
    }
  };

  /** Set the hue from clicked position on slider */
  const setSliderHue = (xHue: number) => {
    const clickedPosX = minMax(xHue, sliderWidth);
    const clickedHue = Math.round((clickedPosX / sliderWidth) * 360);
    const h = minMax(clickedHue, 360, 0);
    setHue(h);
  };

  const className = classNames({
    "c-color-picker-slider": true,
    [cssClasses ?? ""]: Boolean(cssClasses),
  });

  return (
    <div
      className={className}
      style={{ width: `${sliderWidth}px` }}
      onTouchStart={handleSliderTouchStart}
      onTouchMove={handleSliderTouchMove}
      onTouchEnd={() => setSliderMouseDown(false)}
      onMouseMove={handleSliderMousMove}
      onMouseDown={handleSliderMouseDown}
      onMouseUp={() => setSliderMouseDown(false)}
      onMouseLeave={() => setSliderMouseDown(false)}
    >
      <div
        className="c-color-picker-slider-tag"
        style={{ marginLeft: sliderPosition, background: tagColor }}
      />
    </div>
  );
};
