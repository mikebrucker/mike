import { useState } from "react";
import { classNames } from "../../helpers/helper";
import { IIngredient } from "../../interfaces/recipe";
import "./style.scss";

interface Props {
  className?: string;
  ingredient?: IIngredient;
}

type MeasurementType = "metric" | "imperial";

/** Recipe step block */
export const Ingredient = ({ className, ingredient }: Props) => {
  if (!ingredient) return null;

  const { name, amount } = ingredient;
  const [measurementType] = useState<MeasurementType>("metric");
  const measurement = ingredient[measurementType];
  // do some conversion later for amount in imperial
  const classes = classNames({
    [className ?? ""]: true,
    "c-recipes-detail-ingredient": true,
  });

  return (
    <div className={classes}>
      <h6>
        {amount} {measurement} {name}
      </h6>
    </div>
  );
};
