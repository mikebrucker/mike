import React, { useEffect, useState } from "react";
import { convertHexToRgb, convertHslToHsv, convertRgbToHsl, minMax } from "../../helpers/Colors";
import { classNames } from "../../helpers/Helper";
import { SV } from "../../interfaces/Colors";
import "./style.scss";

interface Props {
  cssClasses?: string;
  /** Hue value 0-360 */
  hue: number;
  currentColor: string;
  setSaturationValue?: (sv: SV) => void;
  width?: number;
}

/** Select a custom color */
export const ColorPickerSaturationValueChart = ({
  cssClasses,
  hue,
  currentColor,
  setSaturationValue,
  width,
}: Props) => {
  const padding = 16;
  const chartWidth = width || 256;
  const backgroundColor = `hsl(${hue},100%,50%)`;
  const chartWidthStyle = { width: chartWidth, height: chartWidth };
  const chartStyle = { ...chartWidthStyle, backgroundColor };

  const [chartMouseDown, setChartMouseDown] = useState(false);
  const [sv, setSv] = useState<SV>({ s: 0, v: 0 });
  const [xy, setXy] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const rgb = convertHexToRgb(currentColor);
    if (rgb) {
      const hsl = convertRgbToHsl(rgb);
      const { s, v } = convertHslToHsv(hsl);
      setSv({ s, v });
      setXy({ x: chartWidth * (s / 100), y: chartWidth * ((100 - v) / 100) });
    }
  }, []);

  useEffect(() => {
    setSaturationValue?.(sv);
  }, [sv]);

  /** Chart click */
  const handleChartMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setChartMouseDown(true);
    handleChartMouseMove(e, true);
  };
  /** Chart mouse move */
  const handleChartMouseMove = (e: React.MouseEvent<HTMLDivElement>, force?: boolean) => {
    if (chartMouseDown || force) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - rect.left - padding, 0), chartWidth);
      const y = Math.min(Math.max(e.clientY - rect.top - padding, 0), chartWidth);
      setXy({ x, y });
      setSv({ s: 100 * (x / chartWidth), v: 100 * ((chartWidth - y) / chartWidth) });
    }
  };

  /** Chart click */
  const handleChartTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setChartMouseDown(true);
    handleChartTouchMove(e, true);
  };
  /** Chart mouse move */
  const handleChartTouchMove = (e: React.TouchEvent<HTMLDivElement>, force?: boolean) => {
    if (e.touches[0] && (chartMouseDown || force)) {
      const rect = e.currentTarget.getBoundingClientRect();
      const { clientX, clientY } = e.touches[0];
      const x = minMax(clientX - rect.left - padding, chartWidth);
      const y = minMax(clientY - rect.top - padding, chartWidth);
      setXy({ x, y });
      setSv({ s: 100 * (x / chartWidth), v: 100 * ((chartWidth - y) / chartWidth) });
    }
  };

  const className = classNames({
    "c-color-picker-chart": true,
    [cssClasses ?? ""]: Boolean(cssClasses),
  });

  return (
    <div
      className={className}
      onTouchStart={handleChartTouchStart}
      onTouchMove={handleChartTouchMove}
      onTouchEnd={() => setChartMouseDown(false)}
      onMouseMove={handleChartMouseMove}
      onMouseDown={handleChartMouseDown}
      onMouseUp={() => setChartMouseDown(false)}
      onMouseLeave={() => setChartMouseDown(false)}
      style={{ padding }}
    >
      <div
        className="c-color-picker-chart-pin"
        style={{ marginLeft: xy.x - 1, marginTop: xy.y + padding - 1 }}
      >
        <div>&#10012;</div>
      </div>
      <div className="c-color-picker-chart-color" style={chartStyle} />
      <div className="c-color-picker-chart-white" style={{ ...chartWidthStyle, top: padding }} />
      <div className="c-color-picker-chart-black" style={{ ...chartWidthStyle, top: padding }} />
    </div>
  );
};
