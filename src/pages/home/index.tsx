import React, { useEffect, useState } from "react";
import "./style.scss";
import { observer } from "mobx-react";
import { Phrase } from "../../components/l10n";
import { Planets } from "./planets";

export const Home = observer(() => {
  const [starCount, setStarCount] = useState(Math.max(
    768,
    Math.min(window.innerWidth, document.documentElement.clientWidth)
  ));

  useEffect(() => {
    window.addEventListener("resize", updateStarCount);

    return () => {
      window.removeEventListener("resize", updateStarCount);
    };
  }, []);

  const updateStarCount = () => {
    const count = Math.max(
      768,
      Math.min(window.innerWidth, document.documentElement.clientWidth)
    );

    if (starCount !== count) setStarCount(count);
  };

  const stars = Array.from({ length: starCount }).map((_, i) => (
      <div
        key={`mobile-${i}`}
        className="star"
        style={{ left: `${i}px`, top: `${Math.round(Math.random() * 640)}px` }}
      />
    )
  );

  return (
    <div className="p-home">
      <div className="page">
        <h1><Phrase>home.hello</Phrase></h1>
      </div>
      <section className="space">
        <div className="stars">{stars}</div>
        <Planets />
      </section>
      <div className="page" />
    </div>
  );
});
