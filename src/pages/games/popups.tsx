import React, { useEffect, useState } from "react";
import "./style.scss";
import { useOutlet } from "react-router-dom";
import { l10n } from "../../core/l10n";

/** Popup game where ya gotta click close all popups */
export const Popups = () => {
  const [loading, setLoading] = useState(false);

  const outlet = useOutlet();

  return outlet ? outlet : (
    <div className="p-games-popups">
      <h2>Popups</h2>
      <h3>ToDo</h3>
    </div>
  );
};
