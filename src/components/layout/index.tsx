import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../header";
import { Footer } from "../footer";
import { LANGUAGE_CODES, l10n, Language } from "../../core/l10n";
import { observer } from "mobx-react";

/**
 * Main app layout with `Header` and `Footer` sandwiching displayed `Route`.
 *
 * Handles url language routing in `useEffect`.
 */
export const Layout = observer(() => {
  const { language: pl} = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { language: ll } = l10n;

  useEffect(() => {
    if (pl && ll && pl !== ll) {
      navigate(LANGUAGE_CODES.includes(pl as Language) ? pathname.replace(pl, ll) : "/" + ll + pathname);
    }
  }, [ll, pl]);

  return (
    <>
      <Header />
			{ll ? <Outlet /> : undefined}
			<div className="flex-grow" />
      <Footer />
    </>
  );
});
