import { useOutlet, useParams } from "react-router-dom";
import { Phrase } from "../../../components/l10n";
import { Ingredient } from "../../../components/recipeDetails/ingredient";
import { Step } from "../../../components/recipeDetails/step";
import { IIngredient } from "../../../interfaces/Recipe";
import { recipes } from "./recipes";
import "./style.scss";

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
  const { title, desc, img, steps, ingredients } = recipe;
  const ings: Array<Array<IIngredient>> | undefined = !Array.isArray(ingredients?.[0]) ? (
    [ingredients as Array<IIngredient>]
  ) : ingredients as Array<Array<IIngredient>> | undefined;
  const outlet = useOutlet();

  return outlet ? outlet : (
    <div className="p-recipes-detail">
      <div className="p-recipes-detail-intro">
        <h4>{title ?? <Phrase>archive.recipes.header1</Phrase>}</h4>
        {desc ? <h6>{desc}</h6> : undefined}
      </div>
      <div className="p-recipes-detail-ingredients">
        {ings?.map(ing => (
          ing?.length > 0 ? (
            <ol>
              {ing.filter(Boolean).map(i => <Ingredient ingredient={i} />)}
            </ol>
          ) : undefined
        ))}
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
