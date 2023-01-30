import React, { useState } from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";
import { l10n } from "../../core/l10n";
import { Phrase } from "../l10n";
import { globals } from "../../core/globals";
import { Languages } from "./languages";
import { Language } from "../../interfaces/Language";

type Subheader = "language" | undefined;

export const Header = observer(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openSubheader, setOpenSubheader] = useState<Subheader>();

  const toggleMenu = (toggle: boolean) => {
    globals.setPauseAnimation(toggle, !toggle ? 1000 : 0);
    setIsOpen(toggle);
  };

  const toggleSubheader = (subheader?: Subheader) => {
    setOpenSubheader(subheader !== openSubheader ? subheader : undefined);
  };

  const toggleLanguage = (lang: Language) => {
    if (lang !== l10n.language) l10n.setLanguage(lang);
    if (openSubheader) toggleSubheader();
  };

  const pages = ["recipes", "games", "about", "contact"];

  const menuClass = isOpen ? " is-open" : " is-closed";
  const languageSubheaderClass = openSubheader === "language" ? " is-open" : " is-closed";

  const headline = "Mike Brucker";

  return (
    <nav className="c-header">
      <div className="c-header-nav">
        <NavLink className="c-header-nav-title" to="">{headline}</NavLink>
        <div className="flex-grow" />
        <div className="c-header-nav-mobile">
          <div className={`c-header-nav-mobile-background${menuClass}`} onClick={() => setIsOpen(false)} />
          <div className={`c-header-nav-mobile-links${menuClass}`}>
            <NavLink end className="nav-link" onClick={() => toggleMenu(false)} to="">{headline}</NavLink>
            {pages.map(page => (
              <NavLink
                key={`mobile-${page}`} to={page}
                className="nav-link"
                data-title={l10n.getPhrase(["nav", page])}
                onClick={() => toggleMenu(false)}
              >
                <Phrase>nav.{page}</Phrase>
              </NavLink>
            ))}
            <Languages toggleLanguage={toggleLanguage} />
          </div>
          <div className="menu" onClick={() => toggleMenu(!isOpen)}>
            <div className={`menu-icon${menuClass}`}>
              <div className="menu-icon-line top" />
              <div className="menu-icon-line mid" />
              <div className="menu-icon-line bot" />
            </div>
          </div>
        </div>
        <div className="c-header-nav-desktop">
          {pages.map(page => (
            <NavLink
              key={`desktop-${page}`} to={page}
              className="nav-link"
              onClick={() => toggleMenu(false)}
              data-title={l10n.getPhrase(["nav", page])}
            >
              <Phrase>nav.{page}</Phrase>
            </NavLink>
          ))}
          <div className={`dropdown nav-link${openSubheader === "language" ? " active" : ""}`} onClick={() => toggleSubheader("language")}>
            <Phrase>nav.languages</Phrase>
          </div>
        </div>
      </div>
      <div className={`c-header-subheader${languageSubheaderClass}`}>
        <Languages toggleLanguage={toggleLanguage} />
      </div>
    </nav>
  );
});
