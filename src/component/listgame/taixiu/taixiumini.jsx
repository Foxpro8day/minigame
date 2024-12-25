import React, { useState, useEffect } from "react";
import "./taixiumini.scss";
import {
  WinImg,
  LoseImg,
  TimeCircle,
  Aura,
  AuraButton,
  Deck,
  DeckTitle,
  XIcon,
  IIcon,
  Disc,
  Cloud,
  TaiIcon,
  XiuIcon,
  BetButton,
  GameNotication,
  Sf1,
  Sf2,
  Sf3,
  Sf4,
  Sf5,
  Sf6,
  Flower,
  Tree,
  Lantern,
  RedEvt,
} from "../../graphic/graphicTaiXiu";
import DiceRoller from "./flipDices";
import LogicDice from "./diceLogic";
import beginImg from "../../assets/begin.png";
import replayImg from "../../assets/replay.png";

const TaixiuMini = ({ title, onClose }) => {
  const [selectedBet, setSelectedBet] = useState(null); // "Tài" hoặc "Xỉu"
  const [countdown, setCountdown] = useState(11); // Đếm ngược thời gian
  const [gameStage, setGameStage] = useState("waiting"); // Trạng thái game: 'waiting', 'betting', 'rolling', 'finish'
  const [dice, setDice] = useState([Sf1, Sf1, Sf1]); // Lưu component xúc xắc
  const [result, setResult] = useState(null); // Kết quả game
  const [history, setHistory] = useState([Sf1, Sf1, Sf1]); // Lịch sử các ván
  const [discClass, setDiscClass] = useState(""); // Quản lý lớp CSS
  const [point, setPoint] = useState("");

  // Bảng ánh xạ số sang component
  const diceMap = {
    1: Sf1,
    2: Sf2,
    3: Sf3,
    4: Sf4,
    5: Sf5,
    6: Sf6,
  };

  // Hàm tính kết quả
  const rollDiceNumbers = () => {
    const numbers = [1, 2, 3].map(() => Math.floor(Math.random() * 6) + 1);
    const totalPoints = numbers.reduce((sum, value) => sum + value, 0);
    const result = getResult(totalPoints); // Tính Tài/Xỉu từ tổng điểm
    setResult(result); // Lưu kết quả "Tài" hoặc "Xỉu" vào state
    setPoint(totalPoints);
    console.log(
      "Xúc xắc:",
      numbers,
      "Tổng điểm:",
      totalPoints,
      "Kết quả:",
      result
    );
    return numbers;
  };

  const getResult = (totalPoints) => {
    if (totalPoints >= 3 && totalPoints <= 10) return "Xỉu";
    if (totalPoints >= 11 && totalPoints <= 18) return "Tài";
    return "";
  };

  const rollDice = () => {
    const numbers = rollDiceNumbers(); // Lấy mảng số xúc xắc và tính kết quả
    setDice(rollDiceComponents(numbers)); // Ánh xạ sang component và lưu vào state

    // Lưu kết quả vào lịch sử trước khi set mới
    setHistory(rollDiceComponents(numbers));

    return numbers;
  };

  const rollDiceComponents = (diceNumbers) => {
    return diceNumbers.map((number) => diceMap[number]); // Trả về component
  };

  // Xử lý khi chọn "Tài" hoặc "Xỉu"
  const handleBet = (bet) => {
    if (gameStage === "betting") {
      setSelectedBet(bet);
    }
  };

  // Xử lý khi bấm nút bắt đầu
  const startGame = () => {
    setGameStage("betting");
    setCountdown(11); // Thời gian cho phép chọn "Tài" hoặc "Xỉu"
  };

  // Cập nhật countdown và trạng thái game
  useEffect(() => {
    let timer;
    if (gameStage === "betting" || gameStage === "rolling") {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStage]);

  // Quản lý các giai đoạn game
  useEffect(() => {
    if (countdown === 0) {
      if (gameStage === "betting") {
        setGameStage("rolling");
        setCountdown(11); // Thời gian chờ để roll xúc xắc
      } else if (gameStage === "rolling") {
        rollDice();
        setGameStage("finish");
        setCountdown(11); // Thời gian chờ để hiển thị kết quả
      } else if (gameStage === "finish") {
        setGameStage("waiting"); // Quay lại trạng thái chờ bắt đầu ván mới
        setDice([dice[0], dice[1], dice[2]]);
        setCountdown(11); // Thời gian chờ giữa các ván cược
      }
    }
    if (gameStage === "rolling" && countdown === 9) {
      setDiscClass("disc-effect-out"); // Thêm lớp
    }
    if (gameStage === "rolling" && countdown === 5) {
      setDiscClass("disc-effect-in"); // Thêm lớp
    }
    if (gameStage === "rolling" && countdown === 1) {
      setDiscClass(""); // Thêm lớp
    }
    if (gameStage === "finish") {
      setDiscClass("disc-effect-out"); // Thêm lớp
    }
    if (gameStage === "waiting") {
      setDiscClass("disc-effect-in"); // Thêm lớp
    }
  }, [countdown, gameStage]);

  // Hàm hiển thị kết quả
  const renderResult = () => {
    if (gameStage === "finish") {
      if (selectedBet === null) {
        return <div className="result">Chúc mừng, bạn thắng! {result}</div>;
      }
      if (result === selectedBet) {
        return <div className="result">Chúc mừng, bạn thắng! {result}</div>;
      } else {
        return <div className="result">Rất tiếc, bạn thua! {result}</div>;
      }
    }
    return null;
  };

  const handlePlayAgain = () => {
    setDice([dice[0], dice[1], dice[2]]);
    setSelectedBet(null); // Đặt lại cược
    setResult(null); // Đặt lại kết quả
    setGameStage("waiting"); // Quay lại trạng thái waiting
    setCountdown(11); // Bắt đầu đếm ngược lại
  };

  return (
    <div className="modal-taixiu">
      <Deck />
      <DeckTitle />
      <Tree />
      <Lantern />
      <Flower />
      <Cloud />
      <RedEvt />
      {gameStage === "finish" &&
        (result === "Tài" ? <Aura right /> : <Aura left />)}
      <TaiIcon className={`taiIcon ${result === "Tài" ? "aura" : ""}`} />
      <XiuIcon className={`xiuIcon ${result === "Xỉu" ? "aura" : ""}`} />

      {gameStage === "betting" ||
      gameStage === "rolling" ||
      gameStage === "finish" ? (
        <div className="betting-options">
          <AuraButton
            right
            className={`${selectedBet === "Tài" ? "show" : "hidden"}`}
          />
          <AuraButton
            left
            className={`${selectedBet === "Xỉu" ? "show" : "hidden"}`}
          />
          <BetButton
            left
            className={`betIcon-xiu ${
              selectedBet === "Tài" ? "dimed" : "selectedBet"
            }`}
            onClick={() => handleBet("Xỉu")}
          />

          <BetButton
            right
            className={`betIcon-tai ${
              selectedBet === "Xỉu" ? "dimed" : "selectedBet"
            }`}
            onClick={() => handleBet("Tài")}
          />
        </div>
      ) : (
        <div className="betting-options">
          <BetButton left />
          <BetButton right />
        </div>
      )}

      <TimeCircle text={point} scale="1" bottom="120px" left="300px" />

      {countdown !== 11 && (
        <TimeCircle text={countdown} scale="2" bottom="40px" left="425px" />
      )}

      {gameStage === "waiting" && (
        <div className="begin-replay-img" onClick={startGame}>
          <img src={beginImg} />
        </div>
        // <BeginButton onClick={startGame} text="BẮT ĐẦU" />
      )}
      {gameStage === "finish" && (
        <div className="begin-replay-img" onClick={handlePlayAgain}>
          <img src={replayImg} />
        </div>
        // <BeginButton onClick={handlePlayAgain} text="CHƠI LẠI" />
      )}
      {gameStage === "rolling" && countdown <= 10 && countdown >= 6 && (
        <div className="diceArea">
          <LogicDice dice1={history[0]} dice2={history[1]} dice3={history[2]} />
        </div>
      )}
      {gameStage === "rolling" && countdown <= 5 && (
        <div className="dice-rolling-time">
          <DiceRoller x={200} y={500} />
          <DiceRoller x={100} y={420} />
          <DiceRoller x={150} y={350} />
        </div>
      )}
      {gameStage === "finish" || gameStage === "waiting" ? (
        <div className="diceArea">
          <LogicDice dice1={dice[0]} dice2={dice[1]} dice3={dice[2]} />
        </div>
      ) : (
        <></>
      )}
      <Disc className={discClass} />

      {gameStage === "betting" && countdown >= 3 && (
        <GameNotication
          text="BẮT ĐẦU ĐẶT CƯỢC"
          style={{ top: "100px", left: "300px", scale: "1.8" }}
        />
      )}

      {gameStage === "betting" && countdown < 3 && (
        <GameNotication
          text="KHÓA CƯỢC"
          style={{ top: "100px", left: "300px", scale: "1.8" }}
        />
      )}
      {gameStage === "finish" &&
        (result === selectedBet ? <WinImg /> : <LoseImg />)}

      <IIcon />
      <XIcon onClick={onClose} />
    </div>
  );
};

export default TaixiuMini;
