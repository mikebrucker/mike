import React from "react";
import "./style.scss";
import { useOutlet } from "react-router-dom";
import { Phrase } from "../../components/l10n";
import troyMclure from "../../assets/troy_mclure.png";

/** About Page */
export const About = () => {
  const outlet = useOutlet();

  return outlet ? outlet : (
    <div className="page p-about">
      <div>
        <h4><Phrase>about.header1</Phrase></h4>
      </div>
      {["text1", "text2"].map(str => <p key={str}><Phrase>about.{str}</Phrase></p>)}
      <div><img src={troyMclure} alt="Troy McClure" /></div>
    </div>
  );
};
