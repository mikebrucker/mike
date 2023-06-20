import React, { useEffect } from "react";
import "./style.scss";
import { Link, useNavigate, useOutlet, useParams } from "react-router-dom";
import { Phrase } from "../../../components/l10n";
import { recipes } from "./recipes";

interface RouteParams {
  language?: string;
  recipeId?: string;
}

/** Recipe list page` */
export const Recipes = () => {
  const params: RouteParams = useParams();
  const { recipeId } = params;
  const navigate = useNavigate();

  // navigate back to lists if no recipe
  useEffect(() => {
    if (recipeId && !recipes[recipeId]) {
      navigate("");
    }
  }, [recipeId]);

  const outlet = useOutlet();

  const hasRecipe = Boolean(recipeId && recipes[recipeId]);

  return (
    <>
      {hasRecipe && outlet ? (
        <div className="p-recipes-nav">
          <div>
            <Link to="">Back to Recipes</Link>
          </div>
        </div>
      ) : undefined}
      <div className="page p-recipes">
        {!outlet ? (
          <>
            <h4><Phrase>recipes.header1</Phrase></h4>
            <div className="p-recipes-list">
              <ul>
                {Object.entries(recipes)?.map(([k, v]) => (
                  <Link key={k} to={k}>
                    <li>{v.title ?? k}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </>
        ) : undefined}
        {hasRecipe ? outlet : undefined}
      </div>
    </>
  );
};
