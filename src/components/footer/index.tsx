import React, { useState } from "react";
import "./style.scss";
import { observer } from "mobx-react";
import { l10n } from "../../core/l10n";

export const Footer = observer(() => {
  const [date, setDate] = useState(new Date());

  const onClick = () => {
    const d = date.getTime();
    const ms = Math.round(parseInt(window.crypto.getRandomValues(
      new Uint32Array(2)).join("").slice(0, Math.floor((Math.random() * 5) + 8)
    )));
    setDate(new Date(d - ms));
  }

  return (
    <div className="c-footer" onClick={onClick}>
      <div>
        <div>
          &copy; {new Intl.DateTimeFormat(l10n.language, { dateStyle: "full", timeStyle: "full"}).format(date)}
        </div>
        <div>&reg; Mike Brucker &trade;</div>
      </div>
    </div>
  );
});
