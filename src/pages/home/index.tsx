import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import { Phrase } from "../../components/l10n";
import { Planets } from "./planets";
import "./style.scss";

export const Home = observer(() => {
  const ref = useRef<HTMLElement>(null);

  const [starCount, setStarCount] = useState(
    Math.max(768, Math.min(window.innerWidth, document.documentElement.clientWidth))
  );

  useEffect(() => {
    if (ref.current) {
      const { scrollWidth, clientWidth } = ref.current;
      if (scrollWidth !== clientWidth) {
        ref.current.scrollTo({ left: scrollWidth / 2 - clientWidth / 2 });
      }
    }

    window.addEventListener("resize", updateStarCount);

    return () => {
      window.removeEventListener("resize", updateStarCount);
    };
  }, []);

  /** Update Star Count */
  const updateStarCount = () => {
    const count = Math.max(768, Math.min(window.innerWidth, document.documentElement.clientWidth));

    if (starCount !== count) setStarCount(count);
  };

  const stars = Array.from({ length: starCount }).map((_, i) => (
    <div
      key={`mobile-${i}`}
      className="star"
      style={{ left: `${i}px`, top: `${Math.round(Math.random() * 640)}px` }}
    />
  ));

  return (
    <div className="p-home">
      <div className="page">
        <h1>
          <Phrase>home.hello</Phrase>
        </h1>
      </div>
      <section className="space" ref={ref}>
        <div className="stars">{stars}</div>
        <Planets />
      </section>
      <div className="page" />
    </div>
  );
});
