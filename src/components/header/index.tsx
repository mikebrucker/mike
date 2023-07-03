import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { globals } from "../../core/globals";
import { l10n } from "../../core/l10n";
import { classNames } from "../../helpers/Helper";
import { Language } from "../../interfaces/Language";
import { Phrase } from "../l10n";
import { Languages } from "./languages";
import { NavAccordion } from "./navAccordion";
import "./style.scss";

export enum Pages {
  about = "about",
  contact = "contact",
}
export enum Subheader {
  archive = "archive",
  tools = "tools",
  language = "language",
}
export enum SubheaderArchive {
  recipes = "recipes",
  games = "games",
}
export enum SubheaderTools {
  qrcode = "qrcode",
}
interface Props {
  headline: string;
}

export const Header = observer(({ headline }: Props) => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);
  const [isOpenSubheader, setIsOpenSubheader] = useState<boolean>(false);
  const [openSubheader, setOpenSubheader] = useState<Subheader>();

  const { pathname } = useLocation();

  useEffect(() => {
    window.addEventListener("resize", closeAll);
    return () => window.removeEventListener("resize", closeAll);
  }, []);

  /** Close all subheaders and menus */
  const closeAll = () => {
    if (isOpenSubheader) toggleSubheader(undefined);
    if (isOpenMobileMenu) toggleMobileMenu(false);
  };

  /** Toggle mobile menu open */
  const toggleMobileMenu = (toggle: boolean) => {
    globals.setPauseAnimation(toggle, !toggle ? 1000 : 0);
    setIsOpenMobileMenu(toggle);
  };

  /** Toggle the open subheader */
  const toggleSubheader = (subheader?: Subheader) => {
    setIsOpenSubheader(!isOpenSubheader);
    if (subheader && subheader !== openSubheader) {
      setTimeout(
        () => {
          setOpenSubheader(Subheader[subheader]);
          setIsOpenSubheader(openSubheader !== subheader);
        },
        !openSubheader || isOpenMobileMenu ? 0 : 618
      );
    } else {
      setTimeout(
        () => {
          setOpenSubheader(undefined);
        },
        isOpenMobileMenu ? 0 : 618
      );
    }
  };

  /** Toggle current language */
  const toggleLanguage = (lang: Language) => {
    if (lang !== l10n.language) l10n.setLanguage(lang);
    if (openSubheader) toggleSubheader(undefined);
  };

  /** Close menus on `NavLink` click */
  const onClickNavLink = () => {
    if (isOpenMobileMenu) toggleMobileMenu(false);
    if (openSubheader) toggleSubheader(undefined);
  };

  /** Render `NavLink` */
  const renderNavLink = (key: string, page: string, parentRoute?: string) => {
    const to = [parentRoute, page].filter(Boolean).join("/");
    return (
      <NavLink
        key={`${key}-${parentRoute ?? "route"}-${page}`}
        to={to}
        className="nav-link"
        data-title={l10n.getPhrase(["nav", page])}
        onClick={onClickNavLink}
      >
        <div className="title">
          <Phrase>nav.{page}</Phrase>
        </div>
      </NavLink>
    );
  };

  /** Render Pseudo `NavLink` */
  const renderPseudoNavLink = (page: Subheader, mobile = false) => {
    return (
      <React.Fragment key={`${page}-${mobile ? "mobile" : "desktop"}`}>
        <div className={pseudoNavLinkClass(page)} onClick={() => toggleSubheader(page)}>
          <div className="title">
            <Phrase>nav.{page}</Phrase>
          </div>
          {mobile ? (
            <NavAccordion subheader={page} openSubheader={openSubheader} marginTopDiff={12}>
              {subheaders[page]}
            </NavAccordion>
          ) : undefined}
        </div>
      </React.Fragment>
    );
  };

  const pages = Object.values(Pages);
  const subheaders: Record<Subheader, JSX.Element> = {
    [Subheader.archive]: (
      <>
        {Object.values(SubheaderArchive).map(sh =>
          renderNavLink(Subheader.archive, sh, Subheader.archive)
        )}
      </>
    ),
    [Subheader.tools]: (
      <>
        {Object.values(SubheaderTools).map(sh =>
          renderNavLink(Subheader.tools, sh, Subheader.tools)
        )}
      </>
    ),
    [Subheader.language]: <Languages toggleLanguage={toggleLanguage} />,
  };
  const subheaderPageMap: Record<Exclude<Subheader, Subheader.language>, Array<string>> = {
    [Subheader.archive]: Object.keys(SubheaderArchive),
    [Subheader.tools]: Object.keys(SubheaderTools),
  };

  /** Add active class for Pseudo NavLink */
  const subheaderHasActivePage = (subheader: Subheader) => {
    return (subheaderPageMap[subheader as Exclude<Subheader, Subheader.language>] ?? [])
      .reduce((arr, cur) => {
        arr.push([subheader, cur].join("/"));
        return arr;
      }, [] as Array<string>)
      .some(route => pathname.includes(route));
  };

  const menuClass = isOpenMobileMenu ? "is-open" : "is-closed";
  const navMobileBackgroundClass = classNames({
    "c-header-nav-mobile-background": true,
    [menuClass]: true,
  });
  const navMobileLinksClass = classNames({
    "c-header-nav-mobile-links": true,
    [menuClass]: true,
  });
  const menuIconClass = classNames({
    "menu-icon": true,
    [menuClass]: true,
  });
  /** Classname for a pseudo nav link */
  const pseudoNavLinkClass = (subheader: Subheader) =>
    classNames({
      dropdown: true,
      "nav-link": true,
      active: (isOpenSubheader && openSubheader === subheader) || subheaderHasActivePage(subheader),
    });
  const desktopSubheaderClass = classNames({
    "c-header-subheader-desktop": true,
    "is-open": isOpenSubheader,
    "is-closed": !isOpenSubheader,
  });

  return (
    <nav className="c-header">
      <div className="c-header-nav">
        <NavLink end className="c-header-nav-title" to="">
          {headline}
        </NavLink>
        <div className="flex-grow" />
        <div className="c-header-nav-mobile">
          <div className={navMobileBackgroundClass} onClick={() => setIsOpenMobileMenu(false)} />
          <div className={navMobileLinksClass}>
            <NavLink end className="nav-link" onClick={() => toggleMobileMenu(false)} to="">
              <div className="title">{headline}</div>
            </NavLink>
            {pages.map(page => renderNavLink("mobile", page))}
            {Object.keys(subheaders).map(sh => renderPseudoNavLink(sh, true))}
          </div>
          <div className="menu" onClick={() => toggleMobileMenu(!isOpenMobileMenu)}>
            <div className={menuIconClass}>
              <div className="menu-icon-line top" />
              <div className="menu-icon-line mid" />
              <div className="menu-icon-line bot" />
            </div>
          </div>
        </div>
        <div className="c-header-nav-desktop">
          {pages.map(page => renderNavLink("desktop", page))}
          {Object.keys(subheaders).map(sh => renderPseudoNavLink(sh))}
        </div>
      </div>
      <div className={desktopSubheaderClass}>
        {openSubheader ? subheaders[openSubheader] : undefined}
      </div>
    </nav>
  );
});
