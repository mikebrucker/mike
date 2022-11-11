import React from "react";
import { observer } from "mobx-react";
import { l10n } from "../../core/l10n";
import en from "../../assets/en.svg";
import de from "../../assets/de.svg";
import { AVAILABLE_LANGUAGES, Language } from "../../interfaces/Language";

interface Props {
  toggleLanguage: (l: Language) => void;
}

export const Languages = observer(({ toggleLanguage }: Props) => {
  const FLAGS = { en, de };

  return (
    <div className="languages">
      {AVAILABLE_LANGUAGES.map(lang => (
        <div
          key={lang}
          onClick={() => toggleLanguage(lang)}
          className={`flag ${lang}${lang === l10n.language ? " " : " not-"}selected`}
        >
          <img
            aria-label={l10n.getString(["languages", lang])}
            title={l10n.getString(["languages", lang])}
            className={lang === l10n.language ? "selected" : ""}
            src={FLAGS[lang]}
            alt={lang}
          />
        </div>
      ))}
    </div>
  );
});
