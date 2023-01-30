import React from "react";
import "./style.scss";
import { useOutlet, useParams } from "react-router-dom";
import { Phrase } from "../../components/l10n";
import { recipes } from "./recipes";

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
    <div className="p-recipe-detail">
      <h4>{title ?? <Phrase>recipes.header1</Phrase>}</h4>
      <h6>{subtitle}</h6>
      <div className="p-recipes-detail-steps">
        {steps?.length ?? 0 > 0 ? (
          <ol>
            {steps?.map((s, i) => (
              <>
                <li key={`${i}-${s.img}`}>
                  {(typeof s.step == "string" ? [s.step] : s.step).map(s => <p>{s}</p>)}
                </li>
                {s.img ? <div><img src={s.img} alt={`step ${i + 1}`} /></div> : undefined}
              </>
            ))}
          </ol>
        ) : undefined}
      </div>
    </div>
  );
};
