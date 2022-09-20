import React, { useEffect, useState } from "react";
import "./style.scss"
import { useOutlet } from "react-router-dom";
import { observer } from "mobx-react";
import { DigitalLetters } from "../../components/digitalLetters";
import { Phrase } from "../../components/l10n";
import { l10n } from "../../core/l10n";
import rock from "../../assets/rock.svg";
import paper from "../../assets/paper.svg";
import scissors from "../../assets/scissors.svg";
import { Dictionary } from "../../interfaces/Dictionary";

enum ArrowKeysEn {
  ArrowLeft = 0,
  ArrowDown = 1,
  ArrowRight = 2,
  ArrowUp = 3,
  a = 0,
  s = 1,
  d = 2,
  w = 3
}

enum ArrowKeysDe {
  ArrowLeft = 2,
  ArrowDown = 0,
  ArrowRight = 1,
  ArrowUp = 3,
  a = 2,
  s = 0,
  d = 1,
  w = 3
}

enum Weapon {
  rock,
  paper,
  scissors,
  select,
}

interface Props {
  props?: string;
}

interface ButtonsProps {
  choseWeapon: boolean;
  playerWeapon: Weapon;
  chooseWeapon: (n: Weapon) => void;
}

/**
 * Keyboard styled buttons.
 * `observer` component separated
 */
const Buttons = observer(({ choseWeapon, playerWeapon, chooseWeapon}: ButtonsProps) => {
  return (
    <>
      {[0, 1, 2].sort(a => a === Weapon.scissors && l10n.language === "de" ? -1 : 0).map(n => (
        <button
          key={`choose-${Weapon[n]}`}
          className={choseWeapon && playerWeapon === n ? "clicked" : ""}
          onClick={() => chooseWeapon(n)}
        >
          <Phrase>games.rps.{Weapon[n]}</Phrase>
        </button>
      ))}
    </>
  );
});

export const RPS = (props: Props) => {
  const icons: Dictionary<string> = { rock, paper, scissors }

  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [ties, setTies] = useState(0);
  const [loading, setLoading] = useState(false);

  const [playerWeapon, setPlayerWeapon] = useState<Weapon>(3);
  const [computerWeapon, setComputerWeapon] = useState<Weapon>(3);

  const [playerHistory, setPlayerHistory] = useState<Array<Weapon>>([]);
  const [computerHistory, setComputerHistory] = useState<Array<Weapon>>([]);

  const [choseWeapon, setChoseWeapon] = useState(false);
  const [didReset, setDidReset] = useState(false);

  useEffect(() => {
    if (choseWeapon) {
      setTimeout(() => {
        setChoseWeapon(false);
      }, 333);
    }
  }, [choseWeapon]);

  useEffect(() => {
    if (didReset) {
      setTimeout(() => {
        setDidReset(false);
      }, 333);
    }
  }, [didReset]);

  useEffect(() => {
    window.addEventListener("keyup", onKeyPress);

    return () => {
      window.removeEventListener("keyup", onKeyPress);
    }
  }, [playerWins, computerWins, ties]);

  const onKeyPress = (e: KeyboardEvent) => {
    if (!loading) {
      const n = l10n.language === "de" ? (
        ArrowKeysDe[e.key as keyof typeof ArrowKeysDe] as unknown as Weapon
      ) : (
        ArrowKeysEn[e.key as keyof typeof ArrowKeysEn] as unknown as Weapon
      );

      if (typeof n !== "number") return;

      if (n > 2) {
        setDidReset(true);
        reset();
      } else {
        setChoseWeapon(true);
        chooseWeapon(n);
      }
    }
  }

  const reset = () => {
    if (!loading) {
      setLoading(true);
      setPlayerWins(0);
      setComputerWins(0);
      setTies(0);
      setPlayerWeapon(3);
      setComputerWeapon(3);
      setPlayerHistory([]);
      setComputerHistory([]);
      setLoading(false);
    }
  }

  const getRandomWeapon = (): number => {
    const x = parseInt(window.crypto.getRandomValues(new Uint32Array(1))[0].toString().charAt(4));
    if (x < 3) return x;
    return getRandomWeapon();
  }

  const chooseWeapon = (player: Weapon) => {
    if (loading) return;
    setLoading(true);
    const computer = getRandomWeapon();

    setComputerWeapon(computer);
    setPlayerWeapon(player);

    setComputerHistory(h => [computer, ...(h.slice(0, h.length > 9 ? h.length - 1 : undefined))]);
    setPlayerHistory(h => [player, ...(h.slice(0, h.length > 9 ? h.length - 1 : undefined))]);

    if (player === computer) {
      setTies(ties + 1);
    } else {
      let didPlayerWin = false;
      if (player === Weapon.rock) {
        didPlayerWin = computer === Weapon.scissors;
      } else {
        didPlayerWin = player - computer === 1;
      }
      if (didPlayerWin) {
        setPlayerWins(playerWins + 1);
      } else {
        setComputerWins(computerWins + 1);
      }
    }

    setLoading(false);
  }

  const longestWord = (a?: Array<string>) => (a ?? []).reduce((l, w) => w.length > l.length ? w : l, "").length;
  const padWord = (w: string, l: number, e = 0, c = " ") =>{
    const d = l - w.length;
    const m = d % 2;
    const t = Math.floor(d / 2) + e;
    return Array(t).fill(" ").join("") + w + Array(t + m).fill(" ");
  }
  const titleArr = l10n.getString("games.rps.title")?.split(" ");
  const titleWidth = longestWord(titleArr);
  const title = titleArr?.map(w => padWord(w, titleWidth, titleWidth % 2)).map(w => <DigitalLetters word={w} />);

  const outlet = useOutlet();

  return outlet ? outlet : (
    <div className="p-games-rps">
      <div className="p-games-rps-content">
        <div className="scoreboard">
          <div className="scoreboard-title">{title}</div>
          <div className="scoreboard-info">
            <div><Phrase>games.rps.player</Phrase><DigitalLetters num={playerWins} /></div>
            <div><DigitalLetters num={computerWins} /> <Phrase>games.rps.computer</Phrase></div>
          </div>
          <div className="scoreboard-info">
            <div><Phrase>games.rps.ties</Phrase> <DigitalLetters num={ties} /></div>
            <div><DigitalLetters num={playerWins + computerWins + ties} /> <Phrase>games.rps.matches</Phrase></div>
          </div>
          <div className="battlefield">
            <div className="player">
              <div><Phrase>games.rps.player</Phrase></div>
              <div className="weapon"><Phrase>games.rps.{Weapon[playerWeapon]}</Phrase></div>
              {playerWeapon < 3 ? <img src={icons[Weapon[playerWeapon]]} />: undefined}
            </div>
            <div className="computer">
              <div><Phrase>games.rps.computer</Phrase></div>
              <div className="weapon"><Phrase>games.rps.{Weapon[computerWeapon]}</Phrase></div>
              {computerWeapon < 3 ? <img src={icons[Weapon[computerWeapon]]} />: undefined}
            </div>
          </div>
        </div>
        <div className="buttons">
          <div>
            <button className={didReset && playerWeapon === undefined ? "clicked" : ""} onClick={reset}>
              <Phrase>games.rps.reset</Phrase>
            </button>
          </div>
          <Buttons chooseWeapon={chooseWeapon} choseWeapon={choseWeapon} playerWeapon={playerWeapon} />
        </div>
      </div>
      <div className="history">
        {playerHistory.length > 1 ? <div className="history-player">
          {playerHistory.slice(1).map(h => <div><img src={icons[Weapon[h]]} /></div>)}
        </div> : undefined}
        {computerHistory.length > 1 ? <div className="history-computer">
          {computerHistory.slice(1).map(h => <div><img src={icons[Weapon[h]]} /></div>)}
        </div> : undefined}
      </div>
    </div>
  );
};
