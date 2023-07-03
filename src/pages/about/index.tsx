import { useOutlet } from "react-router-dom";
import troyMclure from "../../assets/troy_mclure.png";
import { Phrase } from "../../components/l10n";
import "./style.scss";

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
