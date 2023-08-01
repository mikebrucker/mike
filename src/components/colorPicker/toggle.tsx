import { classNames } from "../../helpers/helper";
import "./style.scss";

interface Props {
  cssClasses?: string;
  /** Hex value rgba "#12ab34ff" */
  currentColor?: string;
  toggleOpen: () => void;
}

/** Select a custom color */
export const ColorPickerToggle = ({ cssClasses, currentColor, toggleOpen }: Props) => {
  const className = classNames({
    "c-color-picker-toggle": true,
    [cssClasses ?? ""]: Boolean(cssClasses),
  });

  return (
    <div className={className}>
      <div className="c-color-picker-toggle-container" onClick={toggleOpen}>
        <div
          className="c-color-picker-toggle-container-dot"
          style={{ backgroundColor: currentColor }}
        />
      </div>
    </div>
  );
};
