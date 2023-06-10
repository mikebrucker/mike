import { RouteObject, Navigate } from "react-router-dom";
import { Layout } from "../components/layout";
import { StaticFileDownload } from "../components/staticFileDownload";
import { l10n } from "../core/l10n";
import { DEFAULT_LANGUAGE } from "../interfaces/Language";
import { About } from "../pages/about";
import { Contact } from "../pages/contact";
import { Games } from "../pages/games";
import { RPS } from "../pages/games/rps";
import { Home } from "../pages/home";
import { Recipes } from "../pages/recipes";
import { RecipeDetail } from "../pages/recipes/recipeDetail";
import { Popups } from "../pages/games/popups";
import { QrCodeGenerator } from "../pages/qrcode";

/**	Create Redirect route to go up a level or specific path */
const redirectRoute = (pathname = ""): RouteObject => {
	return {
		path: "*",
		element: <Navigate to={{ pathname, search: location.search }} replace />
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
	popups: <Popups />
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
	return Object.entries(files ?? {}).map(([path, file]) =>
		({ path, element: <StaticFileDownload file={file} />, index: true }));
};

export const routes = addRedirectUpRouteToChildren([
	{ path: ":language", element: <Layout />, children:
		[
			{ index: true, element: <Home /> },
			{ path: "about", element: <About /> },
			{ path: "contact", element: <Contact /> },
			{ path: "recipes", element: <Recipes />, children:
				[
					{ path: ":recipeId", element: <RecipeDetail /> }
				]
			},
			{ path: "games", element: <Games gameList={gameList}/>, children: childRouteCollection(games) },
			{ path: "qrcode", element: <QrCodeGenerator /> },
			...downloads({ resume: "Brucker_Mike-Resume.pdf"}),
		]
	},
	redirectRoute(`/${l10n.language ?? DEFAULT_LANGUAGE}`)
]);