import { classNames } from "../../helpers/Helper";
import { IStep } from "../../interfaces/Recipe";
import { Phrase } from "../l10n";
import "./style.scss";

interface Props {
  className?: string;
  step?: IStep;
  index: number;
}

/** Recipe step block */
export const Step = ({ className, step: s, index }: Props) => {
  if (!s) return null;

  const { img, step } = s;
  const steps = typeof step === "string" ? [step] : step;
  const classes = classNames({
    [className ?? ""]: true,
    "c-recipes-detail-step": true,
  });

  return (
    <div className={classes}>
      <h6>
        <Phrase>archive.recipes.step</Phrase> {index}
      </h6>
      {img ? <img src={img.src} alt={img.alt} /> : undefined}
      <ol>
        {steps.map((s, i) => (
          <li key={`step-${index}-${i}`}>
            <p>{s}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};
