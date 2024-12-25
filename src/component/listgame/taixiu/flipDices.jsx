import React, { useEffect, useState } from "react";
import "./diceLogic.scss";
import {
  Sf1,
  SfRolling1,
  SfRolling2,
  SfRolling3,
  SfRolling4,
} from "../../graphic/graphicTaiXiu";
import "./flipDices.scss";

const DiceRoller = ({ x, y }) => {
  const [currentImage, setCurrentImage] = useState("SfRolling1");
  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentImage("SfRolling1"), 0), // 0% (Bắt đầu)
      setTimeout(() => setCurrentImage("SfRolling3"), 100), // 40%
      setTimeout(() => setCurrentImage("SfRolling4"), 300), // 60%
      setTimeout(() => setCurrentImage("SfRolling1"), 500), // 60%
      setTimeout(() => setCurrentImage("SfRolling2"), 700), // 60%
      setTimeout(() => setCurrentImage("SfRolling3"), 900), // 60%
      setTimeout(() => setCurrentImage("SfRolling4"), 1100), // 80%
      setTimeout(() => setCurrentImage("SfRolling1"), 1300), // 80%
      setTimeout(() => setCurrentImage(null), 1500),
    ];
    return () => timers.forEach((timers) => clearTimeout(timers));
  }, []);

  return (
    <div>
      <div
        className="diceTest-container goUpEffect"
        style={{ top: x, left: y }}
      >
        <div className="diceTest rolling">
          {currentImage === "SfRolling1" && <SfRolling1 />}
          {currentImage === "SfRolling2" && <SfRolling2 />}
          {currentImage === "SfRolling3" && <SfRolling3 />}
          {currentImage === "SfRolling4" && <SfRolling4 />}
        </div>
      </div>
    </div>
  );
};

export default DiceRoller;
