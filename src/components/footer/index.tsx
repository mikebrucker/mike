import { observer } from "mobx-react";
import { useState } from "react";
import { l10n } from "../../core/l10n";
import "./style.scss";

export const Footer = observer(() => {
  const [date, setDate] = useState(new Date());

  /** Click the footer for a new copyright date */
  const onClick = () => {
    const d = date.getTime();
    const ms = Math.round(
      parseInt(
        window.crypto
          .getRandomValues(new Uint32Array(2))
          .join("")
          .slice(0, Math.floor(Math.random() * 5 + 8))
      )
    );
    setDate(new Date(d - ms));
  };

  return (
    <footer className="c-footer" onClick={onClick}>
      <div>
        <div>
          &copy;{" "}
          {new Intl.DateTimeFormat(l10n.language, { dateStyle: "full", timeStyle: "full" }).format(
            date
          )}
        </div>
        <div>&reg; Mike Brucker &trade;</div>
      </div>
    </footer>
  );
});
