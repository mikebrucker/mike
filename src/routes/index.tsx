import * as React from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { Layout } from "../components/layout";
import { About } from "../pages/about";
import { Contact } from "../pages/contact";
import { Games } from "../pages/games";
import { RPS } from "../pages/games/rps";
import { Home } from "../pages/home";
import { Recipes } from "../pages/recipes";
import { l10n, DEFAULT_LANGUAGE } from "../core/l10n";

export function BrowserRoutes() {
	const redirectUpRoute: RouteObject = { path: "*", element: <Navigate to="" replace /> }

	const addRedirectUpRouteToChildren = (routes: Array<RouteObject>) => {
		return routes.map(r => {
			if (r.children) {
				addRedirectUpRouteToChildren(r.children);
				r.children.push(redirectUpRoute);
			}
			return r;
		})
	}

  const routes = useRoutes(addRedirectUpRouteToChildren([
		{ path: ":language", element: <Layout />, children:
			[
				{ index: true, element: <Home /> },
				{ path: "about", element: <About />, children: [] },
				{ path: "contact", element: <Contact />, children: [] },
				{ path: "recipes", element: <Recipes />, children: [] },
				{ path: "games", element: <Games />, children:
					[
						{ path: "rps", element: <RPS />, children: [] },
					]
				},
			]
		},
		{ path: "*", element: <Navigate to={`/${l10n.language ?? DEFAULT_LANGUAGE}`} replace /> }
  ]));

  return routes;
}
