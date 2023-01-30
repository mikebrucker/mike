import React from "react";
import { classNames } from "../../helpers/Helper";
import { Phrase } from "../l10n";
import "./style.scss";

interface Props {
	className?: string;
	step?: {
		img?: { src: string; alt: string };
		step: string | Array<string>;
	};
	index: number;
}

/** Recipe step block */
export const Step = ({ className, step: s, index }: Props) => {
	if (!s) return null;

	const { img, step } = s;
	const steps = typeof step === "string" ? [step] : step;
	const classes = classNames({
		[className ?? ""]: true,
		"c-recipes-detail-step": true
	});

  return (
    <div className={classes}>
			<h3><Phrase>recipes.step</Phrase> {index}</h3>
      {img ? <img src={img.src} alt={img.alt} /> : undefined}
			<ol>{steps.map(s => <li><p>{s}</p></li>)}</ol>
    </div>
  );
};
