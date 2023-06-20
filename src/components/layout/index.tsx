import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../header";
import { Footer } from "../footer";
import { l10n } from "../../core/l10n";
import { observer } from "mobx-react";
import { EXISTING_LANGUAGES, Language } from "../../interfaces/Language";

/**
 * Main app layout with `Header` and `Footer` sandwiching displayed `Route`.
 *
 * Handles url language routing in `useEffect`.
 */
export const Layout = observer(() => {
  const { language: ll } = l10n;
  const { language: pl} = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pl && ll && pl !== ll) {
      navigate({
        pathname: EXISTING_LANGUAGES.includes(pl as Language) ? pathname.replace(pl, ll) : "/" + ll + pathname,
        search: location.search
      });
    }
  }, [ll, pl]);

  return (
    <>
      <Header headline="Mike Brucker" />
			{ll ? <Outlet /> : undefined}
			<div className="flex-grow" />
      <Footer />
    </>
  );
});
