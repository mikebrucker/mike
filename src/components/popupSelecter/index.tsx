import { classNames } from "../../helpers/Helper";
import "./style.scss";

interface Props {
  isOpen?: boolean;
  cssClasses?: string;
  selections?: Dictionary<string>;
  selected?: string;
  select: (selection: string) => void;
  close?: () => void;
}

/** Popup selector options with single selection */
export const PopupSelecter = ({
  isOpen,
  cssClasses,
  selections,
  selected,
  select,
  close,
}: Props) => {
  if (!isOpen || !selections) return null;

  const className = classNames({
    "c-popup-selecter": true,
    [cssClasses ?? ""]: Boolean(cssClasses),
  });

  return (
    <aside className={className}>
      <div className="c-popup-selecter-background" onClick={close} />
      <div className="c-popup-selecter-content">
        {Object.keys(selections).map(s => {
          const optionClass = classNames({ selected: selected === s });
          return (
            <option key={s} className={optionClass} onClick={() => select(s)}>
              {selections[s]}
            </option>
          );
        })}
      </div>
    </aside>
  );
};
