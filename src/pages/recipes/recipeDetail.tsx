import React, { useEffect, useState } from "react";
import { useLocation, useOutlet, useParams } from "react-router-dom";
import { Phrase } from "../../components/l10n";
import { firebaseStore } from "../../core/firebase";
import { Recipe } from "../../interfaces/Recipe";
import "./style.scss";

interface RouteParams {
  language?: string;
  recipeId?: string;
}

export const RecipeDetail = () => {
  const params: RouteParams = useParams();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    const route: string = Object
      .values(params)
      .reduce((acc: string, cur: string | undefined) => cur ? acc.replace(cur, "") : acc, pathname.replace(/[^a-z0-9]/gi, ""));

    loadRecipe(route, params.recipeId);
  }, [params.recipeId]);

  const loadRecipe = async (route?: string, id?: string) => {
    const loadedRecipe = await firebaseStore.getItem<Recipe>(route, id);
    setRecipe(loadedRecipe);
  };

  const outlet = useOutlet();

  return outlet ? outlet : (
    <div className="p-recipe-detail">
      <h4>{recipe?.title ?? <Phrase>recipes.header1</Phrase>}</h4>
      <h6>{recipe?.subtitle}</h6>
      <div className="p-recipes-detail-steps">
        <ol>
          {recipe?.steps?.map((s, i) => <li key={`${i}-${s.slice(0, 6)}`}>{s}</li>)}
        </ol>
      </div>
    </div>
  );
};
