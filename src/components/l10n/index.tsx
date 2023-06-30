import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { l10n } from "../../core/l10n";

interface Props {
  children?: string | Array<string>;
}

/** Element to take a key to display l10n phrase */
export const Phrase = observer(({ children }: Props) => {
  const [translation, setTranslation] = useState<Array<JSX.Element | string> | string>("");

  /** Format to text to not have bold and italic markers */
  const format = (text: string) => {
    if (!text.includes("%%")) return text;

    return text.split("%%").filter(Boolean).map((fragment, i) => {
      if (!fragment.includes("##")) return fragment;

      if (fragment.startsWith("i##")) {
        return <span key={i} className="italic">{fragment.slice(3)}</span>;
      } else if (fragment.startsWith("b##")) {
        return <span key={i} className="bold">{fragment.slice(3)}</span>;
      } else if (fragment.startsWith("ib##") || fragment.startsWith("bi##")) {
        return <span key={i} className="italic bold">{fragment.slice(4)}</span>;
      } else if (fragment.startsWith("c##")) {
        return <code key={i}>{fragment.slice(3)}</code>;
      }

      return fragment;
    });
  };

  useEffect(() => {
    let keys: Array<string> = [];

    if (typeof children === "string") {
      keys = children.split(".");
    } else if (Array.isArray(children)) {
      keys = (children as Array<string>).join("").split(".");
    }

    const phrase = l10n.getPhrase(keys);

    const translation = typeof phrase === "string" ? (
      format(phrase)
    ) : Array.isArray(phrase) ? (
      phrase.map(p => format(p)).map(q => <p>{q}</p>)
    ) : undefined;

    setTranslation(translation ?? keys.join("."));
  }, [l10n.language, children]);

  return children && l10n.language ? <>{translation}</> : null;
});
