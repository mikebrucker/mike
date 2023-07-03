import { useOutlet } from "react-router-dom";
import { Phrase } from "../../components/l10n";
import "./style.scss";

/** Contact Page */
export const Contact = () => {
  const outlet = useOutlet();

  return outlet ? (
    outlet
  ) : (
    <div className="page p-contact">
      <div>
        <h4>
          <Phrase>contact.header1</Phrase>
        </h4>
      </div>
      <div>
        <Phrase>contact.error1</Phrase>
      </div>
      <div>
        <Phrase>contact.error2</Phrase>
      </div>
      <div>
        <Phrase>contact.error3</Phrase>
      </div>
      <div>
        <Phrase>contact.error4</Phrase>
      </div>
      <div>
        <Phrase>contact.error5</Phrase>
      </div>
    </div>
  );
};
