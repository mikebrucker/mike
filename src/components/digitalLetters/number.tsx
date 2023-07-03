import { useEffect, useState } from "react";
import "./style.scss";

interface Props {
  num: number;
}

export type Num = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

const DIGITAL_NUMBER = {
  //    t,tL,tR, m,bL,bR, b
  0: [1, 1, 1, 0, 1, 1, 1],
  1: [0, 0, 1, 0, 0, 1, 0],
  2: [1, 0, 1, 1, 1, 0, 1],
  3: [1, 0, 1, 1, 0, 1, 1],
  4: [0, 1, 1, 1, 0, 1, 0],
  5: [1, 1, 0, 1, 0, 1, 1],
  6: [1, 1, 0, 1, 1, 1, 1],
  7: [1, 0, 1, 0, 0, 1, 0],
  8: [1, 1, 1, 1, 1, 1, 1],
  9: [1, 1, 1, 1, 0, 1, 1],
  blank: [0, 0, 0, 0, 0, 0, 0]
};

/**
 *
 */
export const DigitalNumber = ({ num }: Props) => {
  const [nums, setNums] = useState<Array<Num>>(["0"]);

  useEffect(() => {
    setNums(num.toString().padStart(2, "0").split("") as Array<Num>);
  }, [num]);


  return (
    <div className="c-digital">
      {nums.map((n, i) => {
        const numMap = DIGITAL_NUMBER[i === 0 && nums[0] === "0" ? "blank" : n];

        return (
          <div className="c-digital-number">
            <div key={Math.random()}>
              <div>
                <div className={`line line-h${numMap[0] ? " active" : ""}`} />
              </div>
              <div>
                <div className={`line line-v${numMap[1] ? " active" : ""}`} />
                <div className={`line line-v${numMap[2] ? " active" : ""}`} />
              </div>
              <div>
                <div className={`line line-h${numMap[3] ? " active" : ""}`} />
              </div>
              <div>
                <div className={`line line-v${numMap[4] ? " active" : ""}`} />
                <div className={`line line-v${numMap[5] ? " active" : ""}`} />
              </div>
              <div>
                <div className={`line line-h${numMap[6] ? " active" : ""}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
