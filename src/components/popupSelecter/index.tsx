import React from "react";
import "./style.scss";
import { classNames } from "../../helpers/Helper";

interface Props {
  isOpen?: boolean;
  cssClasses?: string;
  selections?: Dictionary<string>;
  selected?: string;
  select: (s: string) => void;
  close?: () => void;
}

/** Copy this component to get started */
export const PopupSelecter = ({ isOpen, cssClasses, selections, selected, select, close }: Props) => {
  if (!isOpen || !selections) return null;

  const className = classNames({
    "c-popup-selecter": true,
    [cssClasses ?? ""]: Boolean(cssClasses)
  });

  return (
    <aside className={className}>
      <div className="c-popup-selecter-background" onClick={close}/>
      <div className="c-popup-selecter-content">
        {Object.keys(selections).map(s => {
          const optionClass = classNames({ selected: selected === s });
          return <option key={s} className={optionClass} onClick={() => select(s)}>{selections[s]}</option>;
        })}
      </div>
    </aside>
  );
};
