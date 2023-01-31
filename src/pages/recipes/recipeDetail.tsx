import React from "react";
import "./style.scss";
import { useOutlet, useParams } from "react-router-dom";
import { Phrase } from "../../components/l10n";
import { recipes } from "./recipes";
import { Step } from "../../components/recipeDetails/step";

interface RouteParams {
  language?: string;
  recipeId?: string;
}

/** Recipe detail page */
export const RecipeDetail = () => {
  const params: RouteParams = useParams();
  const { recipeId } = params;
  const recipe = recipes[recipeId ?? ""];
  if (!recipe) return null;
  const { title, subtitle, img, steps, ingredients } = recipe;

  const outlet = useOutlet();

  return outlet ? outlet : (
    <div className="p-recipes-detail">
      <div className="p-recipes-detail-intro">
        <h4>{title ?? <Phrase>recipes.header1</Phrase>}</h4>
        {subtitle ? <h6>{subtitle}</h6> : undefined}
      </div>
      <div className="p-recipes-detail-steps">
        {steps?.length ?? 0 > 0 ? (
          <ol>
            {steps?.map((s, i) => <li key={`step-${i}`}><Step step={s} index={i + 1} /></li>)}
          </ol>
        ) : undefined}
      </div>
    </div>
  );
};
