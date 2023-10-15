import { classNames } from "../../helpers/helper";
import "./style.scss";

interface Props {
  isOpen?: boolean;
  cssClasses?: string;
  selections?: Dictionary<string>;
  selected?: string;
  useCssBackground?: boolean;
  select?: (selection: string) => void;
  selectDict?: (selection: Dictionary<string>) => void;
  close?: () => void;
}

/** Popup selector options with single selection */
export const PopupSelector = ({
  isOpen,
  cssClasses,
  selections,
  selected,
  select,
  close,
  useCssBackground,
}: Props) => {
  if (!isOpen || !selections) return null;

  const className = classNames({
    "c-popup-selector": true,
    "c-popup-css-colors": useCssBackground,
    [cssClasses ?? ""]: Boolean(cssClasses),
  });

  return (
    <aside className={className}>
      <div className="c-popup-selector-background" onClick={close} />
      <div className="c-popup-selector-content">
        {Object.keys(selections).map(s => {
          const optionClass = classNames({
            selected: !useCssBackground ? selected === s : selected === selections[s],
          });
          return (
            <option
              style={
                !useCssBackground ? undefined : { backgroundColor: s, border: `6px outset ${s}` }
              }
              key={s}
              className={optionClass}
              onClick={() => select?.(s)}
            >
              {!useCssBackground
                ? selections[s]
                : s
                    .split("")
                    .map((c, i) => (i === 0 || c !== c.toUpperCase() ? c : ` ${c}`))
                    .join("")}
            </option>
          );
        })}
      </div>
    </aside>
  );
};
