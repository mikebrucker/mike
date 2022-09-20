import React from "react";
import { useOutlet } from "react-router-dom";
import { Phrase } from "../../components/l10n";
import "./style.scss"

interface Props {
  prop?: string;
}

export const Recipes = (props: Props) => {
  const outlet = useOutlet();

  return outlet ? outlet : (
    <div className="page p-recipes">
      <h4><Phrase>recipes.header1</Phrase></h4>
      <h6>Boiled Water</h6>
      <div className="p-recipes-instructions">
        <ol>
          <li>Pour water into pot.</li>
          <li>Put pot on stovetop burner.</li>
          <li>Heat on high until boiled.</li>
        </ol>
      </div>
    </div>
  );
};
