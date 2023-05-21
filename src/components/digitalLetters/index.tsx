import React, { useEffect, useState } from "react";
import "./style.scss";

interface Props {
  word?: string;
  num?: number;
}

type LowerLetter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" |
  "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";

type Letter = LowerLetter | Uppercase<LowerLetter>;

type Num = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type Space = " " | "_";

/* eslint-disable quote-props */
/**
 * `Record` to format the digital number for a standard alarm clock
 */
const DIGITAL_NUMBER: Record<Num | " ", Array<1 | 0>> = {
  // "example-for-format": [
  //     1,
  //   1,  1,
  //     0,
  //   1,  1,
  //     1
  // ],
  //    t,tL,tR, m,bL,bR, b
  "0": [1, 1, 1, 0, 1, 1, 1],
  "1": [0, 0, 1, 0, 0, 1, 0],
  "2": [1, 0, 1, 1, 1, 0, 1],
  "3": [1, 0, 1, 1, 0, 1, 1],
  "4": [0, 1, 1, 1, 0, 1, 0],
  "5": [1, 1, 0, 1, 0, 1, 1],
  "6": [1, 1, 0, 1, 1, 1, 1],
  "7": [1, 0, 1, 0, 0, 1, 0],
  "8": [1, 1, 1, 1, 1, 1, 1],
  "9": [1, 1, 1, 1, 0, 1, 1],
  " ": [0, 0, 0, 0, 0, 0, 0]
};

/**
 * `Record` to format the digital letter. This has more bars than the standard digital number
 */
const DIGITAL_LETTER: Record<Uppercase<LowerLetter> | Num | Space, Array<1 | 0>> = {
  // "example-for-format": [
  //      1,    1,
  //   1, 0, 0, 1, 1,
  //      0,    0,
  //   1, 1, 0, 0, 1,
  //      1,    1
  // ],
  //   tL,tR,Lt,Lm,tm,Rm,Rt,mL,mR,Lb,Lm,bm,Rm,Rb,bL,bR,
  "0": [1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
  "1": [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  "2": [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
  "3": [1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1],
  "4": [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0],
  "5": [1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1],
  "6": [1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1],
  "7": [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  "8": [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
  "9": [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
  "A": [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
  "B": [1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1],
  "C": [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
  "D": [1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1],
  "E": [1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
  "F": [1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
  "G": [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1],
  "H": [0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
  "I": [1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
  "J": [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1],
  "K": [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
  "L": [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
  "M": [0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
  "N": [0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0],
  "O": [1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1],
  "P": [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  "Q": [1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1],
  "R": [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
  "S": [1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1],
  "T": [1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  "U": [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1],
  "V": [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  "W": [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0],
  "X": [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  "Y": [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  "Z": [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
  "_": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  " ": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};
/* eslint-enable quote-props */

export const DigitalLetters = ({ word, num }: Props) => {
  const [letters, setLetters] = useState<Array<Letter | Num>>([]);
  const [nums, setNums] = useState<Array<Num>>();

  useEffect(() => {
    if (word) return;
    setNums(num?.toString().padStart(2, "0").split("") as Array<Num>);
  }, [num]);

  useEffect(() => {
    setLetters(word?.split("") as Array<Letter & Num>);
  }, [word]);

  const digitizeNum = (n: Num, blank?: boolean) => {
    const numMap = DIGITAL_NUMBER[!blank ? n : " "].map(n => n ? " active" : "");

    return (
      <div key={n + Math.random()} className="c-digital-number">
        <div>
          <div className={`line line-h${numMap[0]}`} />
        </div>
        <div>
          <div className={`line line-v${numMap[1]}`} />
          <div className={`line line-v${numMap[2]}`} />
        </div>
        <div>
          <div className={`line line-h${numMap[3]}`} />
        </div>
        <div>
          <div className={`line line-v${numMap[4]}`} />
          <div className={`line line-v${numMap[5]}`} />
        </div>
        <div>
          <div className={`line line-h${numMap[6]}`} />
        </div>
      </div>
    );
  };

  const digitizeLetter = (letter: Letter | Num, i: number) => {
    const l = letter.toUpperCase() as Uppercase<LowerLetter> | Num;
    if (!(l in DIGITAL_LETTER)) return;
    const letterMap = DIGITAL_LETTER[l].map(n => n ? " active" : "");

    return (
      <div key={i + Math.random()} className="c-digital-letter">
        <div>
          <div className={`line line-h${letterMap[0]}`} />
          <div className={`line line-h${letterMap[1]}`} />
        </div>
        <div>
          <div className={`line line-v${letterMap[2]}`} />
          <div className={`line line-v angle-a${letterMap[3]}`} />
          <div className={`line line-v${letterMap[4]}`} />
          <div className={`line line-v angle-b${letterMap[5]}`} />
          <div className={`line line-v${letterMap[6]}`} />
        </div>
        <div>
          <div className={`line line-h${letterMap[7]}`} />
          <div className={`line line-h${letterMap[8]}`} />
        </div>
        <div>
          <div className={`line line-v${letterMap[9]}`} />
          <div className={`line line-v angle-b${letterMap[10]}`} />
          <div className={`line line-v${letterMap[11]}`} />
          <div className={`line line-v angle-a${letterMap[12]}`} />
          <div className={`line line-v${letterMap[13]}`} />
        </div>
        <div>
          <div className={`line line-h${letterMap[14]}`} />
          <div className={`line line-h${letterMap[15]}`} />
        </div>
      </div>
    );
  };

  return (
    <div className="c-digital">
      {nums?.map((n, i) => digitizeNum(n, i === 0 && nums[0] === "0")) ?? letters.map((n, i) => digitizeLetter(n, i))}
    </div>
  );
};
