import React from "react";
import "./style.scss";

interface Props {
  children?: React.ReactNode;
}

export const PokeButton = ({ children }: Props) => {
  return (
    <button className="c-poke-button" aria-label="button">
      <div />
      <div />
      <div>
        {children}
      </div>
    </button>
  );
};
