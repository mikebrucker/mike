import React from "react";
import "./App.scss";
import { Navigate, useRoutes, RouteObject } from "react-router-dom";

import { Home } from "./pages/home";
import { About } from "./pages/about";
import { Contact } from "./pages/contact";
import { Recipes } from "./pages/recipes";
import { RecipeDetail } from "./pages/recipes/recipeDetail";
import { Games } from "./pages/games";
import { RPS } from "./pages/games/rps";
import { StaticFileDownload } from "./components/staticFileDownload";

import { Layout } from "./components/layout";
import { l10n } from "./core/l10n";
import { DEFAULT_LANGUAGE } from "./interfaces/Language";

/** Nested routes here. Language logic is handled within the `Layout` */
const App = () => {
	/** Routes that do not exist redirect up to the last existing */
	const redirectRoute = (pathname = ""): RouteObject => {
		return {
			path: "*",
			element: <Navigate to={{ pathname, search: location.search }} replace />
		};
	};

  /** Parent route requires an outlet for unknown child to route redirect up */
  const addRedirectUpRouteToChildren = (routes: Array<RouteObject>) => {
		return routes.map(r => {
			// eslint-disable-next-line no-param-reassign
			if (!r.children && !r.index) r.children = [];
			if (r.children) {
				addRedirectUpRouteToChildren(r.children);
				r.children.push(redirectRoute());
			}
			return r;
		});
	};

  const routes = useRoutes(addRedirectUpRouteToChildren([
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
				{ path: "games", element: <Games />, children:
					[
						{ path: "rps", element: <RPS /> },
					]
				},
				{ path: "resume", element: <StaticFileDownload file="Brucker_Mike-Resume.pdf" />, index: true },
				{ path: "ferchau_assignment", element: <StaticFileDownload file="ferchau_assignment.7z" />, index: true },
			]
		},
		redirectRoute(`/${l10n.language ?? DEFAULT_LANGUAGE}`)
  ]));

  return (
    <div className="App">
      {routes}
    </div>
  );
};

export default App;
