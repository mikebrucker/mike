import React, { useEffect, useState } from "react";
import { Link, useLocation, useOutlet, useParams } from "react-router-dom";
import { Phrase } from "../../components/l10n";
import { firebaseStore } from "../../core/firebase";
import { Recipe } from "../../interfaces/Recipe";
import "./style.scss"

interface RouteParams {
  language?: string;
  recipeId?: string;
}

export const Recipes = () => {
  const params: RouteParams = useParams();
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState<Array<Recipe>>();
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    const route: string = Object
      .values(params)
      .reduce((acc: string, cur: string | undefined) => cur ? acc.replace(cur, "") : acc, pathname.replace(/[^a-z0-9]/gi, ""));

    if (params.recipeId)
      loadRecipe(route, params.recipeId);
    else
      setRecipe(undefined);
      loadRecipes(route);
  }, [params.recipeId])

  const loadRecipe = async (route?: string, id?: string) => {
    const x = await firebaseStore.getItem<Recipe>(route, id);
    setRecipe(x);
  }

  const loadRecipes = async (route?: string) => {
    const x = await firebaseStore.getItems(route);
    setRecipes(x);
  }

  const outlet = useOutlet();

  return (
    <>
      {outlet ? (
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
                {recipes?.map(r => {
                  return (
                    <li key={r.id}>
                      <Link to={r.id}>{r.title ?? r.id}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </>
        ) : undefined}
        {outlet}
      </div>
    </>
  );
};
