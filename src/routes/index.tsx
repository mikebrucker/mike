import { Navigate, Outlet, RouteObject } from "react-router-dom";
import { Pages, Subheader, SubheaderArchive, SubheaderTools } from "../components/header";
import { Layout } from "../components/layout";
import { StaticFileDownload } from "../components/staticFileDownload";
import { l10n } from "../core/l10n";
import { DEFAULT_LANGUAGE } from "../interfaces/language";
import { About } from "../pages/about";
import { Games } from "../pages/archive/games";
import { Popups } from "../pages/archive/games/popups";
import { RPS } from "../pages/archive/games/rps";
import { Recipes } from "../pages/archive/recipes";
import { RecipeDetail } from "../pages/archive/recipes/recipeDetail";
import { Contact } from "../pages/contact";
import { Home } from "../pages/home";
import { QrCodeGenerator } from "../pages/tools/qrcode";

/**	Create Redirect route to go up a level or specific path */
const redirectRoute = (pathname = ""): RouteObject => {
  return {
    path: "*",
    element: <Navigate to={{ pathname, search: location.search }} replace />,
  };
};

/** Parent route requires an outlet for unknown child to route redirect up */
const addRedirectUpRouteToChildren = (routes: Array<RouteObject>) => {
  return routes.map(r => {
    if (!r.children && !r.index) r.children = [];
    if (r.children) {
      addRedirectUpRouteToChildren(r.children);
      r.children.push(redirectRoute());
    }
    return r;
  });
};

const games = {
  rps: <RPS />,
  popups: <Popups />,
};
const gameList = Object.keys(games);

/**
 * Creates as many child routes as needed from a Dictionary
 * @param routes Dictionary<JSX.Element | null>
 */
const childRouteCollection = (routes: Dictionary<JSX.Element | null>): Array<RouteObject> => {
  return Object.entries(routes ?? {}).map(([path, element]) => ({ path, element }));
};

/**
 * Dictionary of files to download
 * @param files Dictionary -> { path: filename.ext }
 */
const downloads = (files: Dictionary<string>): Array<RouteObject> => {
  return Object.entries(files ?? {}).map(([path, file]) => ({
    path,
    element: <StaticFileDownload file={file} />,
    index: true,
  }));
};

export const routes = addRedirectUpRouteToChildren([
  {
    path: ":language",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: Pages.about, element: <About /> },
      { path: Pages.contact, element: <Contact /> },
      {
        path: Subheader.archive,
        element: <Outlet />,
        children: [
          {
            path: SubheaderArchive.recipes,
            element: <Recipes />,
            children: [{ path: ":recipeId", element: <RecipeDetail /> }],
          },
          {
            path: SubheaderArchive.games,
            element: <Games gameList={gameList} />,
            children: childRouteCollection(games),
          },
        ],
      },
      {
        path: Subheader.tools,
        element: <Outlet />,
        children: [{ path: SubheaderTools.qrcode, element: <QrCodeGenerator /> }],
      },
      ...downloads({ resume: "Brucker_Mike-Resume.pdf" }),
    ],
  },
  redirectRoute(`/${l10n.language ?? DEFAULT_LANGUAGE}`),
]);
