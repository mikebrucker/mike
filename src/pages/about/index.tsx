import React from "react";
import "./style.scss";
import { useOutlet } from "react-router-dom";
import { Phrase } from "../../components/l10n";

export const About = () => {
  const outlet = useOutlet();

  return outlet ? outlet : (
    <div className="page p-about">
      <div>
        <h4><Phrase>about.header1</Phrase></h4>
      </div>
      <div>
        <Phrase>about.text1</Phrase>
      </div>
    </div>
  );
};
