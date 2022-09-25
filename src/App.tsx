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
import { Layout } from "./components/layout";
import { DEFAULT_LANGUAGE, l10n } from "./core/l10n";

const App = () => {
  /**
   * Parent route requires an outlet for unknown child to route redirect up
   */
  const addRedirectUpRouteToChildren = (routes: Array<RouteObject>) => {
		return routes.map(r => {
			if (r.children) {
				addRedirectUpRouteToChildren(r.children);
				r.children.push({ path: "*", element: <Navigate to="" replace /> });
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
				{ path: "recipes", element: <Recipes />, children:
					[
						{ path: ":recipeId", element: <RecipeDetail />, children: []}
					]
				},
				{ path: "games", element: <Games />, children:
					[
						{ path: "rps", element: <RPS />, children: [] },
					]
				},
			]
		},
		{ path: "*", element: <Navigate to={`/${l10n.language ?? DEFAULT_LANGUAGE}`} replace /> }
  ]));

  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
