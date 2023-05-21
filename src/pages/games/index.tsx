import React from "react";
import { Link, useOutlet } from "react-router-dom";
import { Phrase } from "../../components/l10n";
import "./style.scss";

interface Props {
  gameList: Array<string>;
}

/** Stupid games list */
export const Games = ({ gameList }: Props) => {
  const outlet = useOutlet();

  return (
    <>
      {outlet ? (
        <div className="p-games-nav">
          <div>
            <Link to=""><Phrase>games.back</Phrase></Link>
          </div>
        </div>
      ) : undefined}
      <div className="page p-games">
        {!outlet ? <h4><Phrase>games.header1</Phrase></h4> : undefined}
        {!outlet ? (
          <div className="p-games-list">
            {gameList.map(game => (
              <Link key={game} to={game}>
                <div className="game-card">
                  <h6><Phrase>games.{game}.title</Phrase></h6>
                  <div><Phrase>games.{game}.info</Phrase></div>
                </div>
              </Link>
            ))}
          </div>
        ) : undefined}
        {outlet}
      </div>
    </>
  );
};
