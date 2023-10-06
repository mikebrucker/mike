import { observer } from "mobx-react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { l10n } from "../../core/l10n";
import { booleanJoin } from "../../helpers/helper";
import { EXISTING_LANGUAGES, Language } from "../../interfaces/language";
import { Footer } from "../footer";
import { Header, pathNames } from "../header";

/**
 * Main app layout with `Header` and `Footer` sandwiching displayed `Route`.
 *
 * Handles url language routing in `useEffect`.
 */
export const Layout = observer(() => {
  const { language: ll } = l10n;
  const { language: pl } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    pathname
      .split("/")
      .reverse()
      .find(path => {
        if (pathNames[path]) {
          document.title = booleanJoin(
            " | ",
            "Mike Brucker",
            l10n.getString(["document", pathNames[path]]) ?? pathNames[path]
          );
        }
        return Boolean(pathNames[path]);
      });
  }, [pathname]);

  useEffect(() => {
    if (pl && ll && pl !== ll) {
      navigate({
        pathname: EXISTING_LANGUAGES.includes(pl as Language)
          ? pathname.replace(pl, ll)
          : "/" + ll + pathname,
        search: location.search,
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
