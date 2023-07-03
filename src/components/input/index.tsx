import { classNames } from "../../helpers/Helper";
import { Phrase } from "../l10n";
import "./style.scss";

interface Props {
  className?: string;
  name: string;
  value?: string | number;
  type: "text" | "number";
  max?: number;
  min?: number;
  label?: string;
  desc?: string | JSX.Element;
  funcButton?: JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

/** `input` for text and number. Label can include an element for further customization */
export const Input = ({
  className,
  name,
  value,
  type,
  max,
  min,
  label,
  desc,
  funcButton,
  onChange,
  onClick,
}: Props) => {
  const classes = classNames({
    "c-input": true,
    className: Boolean(className),
  });

  const hasLabel = Boolean(label || desc || funcButton);

  return (
    <div className={classes}>
      {hasLabel ? (
        <div className="c-input-label">
          {label ? (
            <label htmlFor={name}>
              <Phrase>{label}</Phrase>
            </label>
          ) : undefined}
          {desc ? (
            typeof desc === "string" ? (
              <small>
                <Phrase>{desc}</Phrase>
              </small>
            ) : (
              desc
            )
          ) : undefined}
          {funcButton}
        </div>
      ) : undefined}
      <input
        name={name}
        type={type}
        value={value}
        max={max}
        min={min}
        readOnly={Boolean(onClick)}
        onChange={onChange && !onClick ? onChange : undefined}
        onClick={onClick}
      />
    </div>
  );
};
