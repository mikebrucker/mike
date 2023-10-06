import { useState } from "react";
import mantis_toboggan from "../../../assets/mantis_togoggan.png";
import { Phrase } from "../../../components/l10n";
import "./style.scss";

/** Popup game where ya gotta click close all popups */
export const Popups = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-games-popups">
      <h2>Popups</h2>
      <img src={mantis_toboggan} alt="Mantis Toboggan" />
      <div className="p-games-popups-caption">
        <div>
          <div>
            <Phrase>Share this with your friends!</Phrase>
          </div>
          <div>
            <Phrase>It's a computer virus!</Phrase>
          </div>
        </div>
        <button>Start</button>
      </div>
    </div>
  );
};
