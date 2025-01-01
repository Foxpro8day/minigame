import "./xocdiamini.scss";
import { useState, useEffect } from "react";
import {
  XdTable,
  XdTime,
  XdDisc,
  XdBowl,
  XdChan,
  XdLe,
  XdX,
  XdI,
  XdChat,
  XdChanAura,
  XdLeAura,
  XdAura4Red,
  XdAura3Red,
  XdAura3White,
  XdAura4White,
  XdLantern,
  XdMai,
  Xdbanhchung,
  XdCanhdao,
  Xd12,
  XdWin,
  XdLose,
  XdBegin,
  XdReplay,
  XdXudo,
  XdXutrang,
} from "../../graphic/graphicXocDia";
import CoinLogic from "./coinLogic";

const XocdiaMini = ({ title, onClose }) => {
  const [countdown, setCountdown] = useState(10); // Đếm ngược thời gian
  const [gameStage, setGameStage] = useState("firstTime"); // Trạng thái game: 'waiting', 'betting', 'rolling', 'finish'
  const [chip, setChip] = useState([0, 1, 0, 1]);
  const [result1, setResult1] = useState(null); // Kết quả game 1
  const [result2, setResult2] = useState(null); // Kết quả game 2
  const [history, setHistory] = useState([
    XdXudo,
    XdXutrang,
    XdXudo,
    XdXutrang,
  ]); // Lịch sử các ván
  const [discClass, setDiscClass] = useState(""); // Quản lý lớp CSS
  const [point, setPoint] = useState("");
  const [selectedBet1, setSelectedBet1] = useState(null); // Chẵn hoặc Lẻ
  const [selectedBet2, setSelectedBet2] = useState(null); // Đỏ/Trắng 3 hoặc 4

  // conversation
  const conversation = (num) => {
    switch (num) {
      case 1:
        return "Bắt đầu đặt cược";
      case 2:
        return "Hết giờ đặt cược";
      case 3:
        return "Ban đã cược Chẵn";
      case 4:
        return "Ban đã cược Lẻ!";
      case 5:
        return "Chúc mừng, Winner";
      case 6:
        return "May mắn lần sau";
      default:
        return "";
    }
  };

  // Hàm xử lý chọn Chẵn/Lẻ
  const handleBet1 = (bet) => {
    if (gameStage === "betting") {
      setSelectedBet1(bet);
      console.log(`Bạn đã chọn cược 1: ${bet}`);
    }
  };

  // Hàm xử lý chọn Đỏ/Trắng 3 hoặc 4
  const handleBet2 = (bet) => {
    if (gameStage === "betting") {
      setSelectedBet2(bet);
      console.log(`Bạn đã chọn cược 2: ${bet}`);
    }
  };

  // Xuất console khi cả hai cược hoàn tất
  useEffect(() => {
    if (selectedBet1 && selectedBet2) {
      console.log(`Vé cược hoàn chỉnh: (${selectedBet1}, ${selectedBet2})`);
    }
  }, [selectedBet1, selectedBet2]);

  // Bảng ánh xạ số sang component
  const diceMap = {
    0: XdXudo,
    1: XdXutrang,
  };
  // Hàm random xu
  const flipCoins = () => {
    return [1, 2, 3, 4].map(() => (Math.random() < 0.5 ? 0 : 1)); // 0: xấp, 1: ngửa
  };

  // Hàm tính kết quả
  const getResult = (coins) => {
    const totalPoints = coins.reduce((acc, value) => acc + value, 0);
    return totalPoints % 2 === 0 ? "XdChan" : "XdLe";
  };

  // Xử lý khi bấm nút bắt đầu
  const startGame = () => {
    setGameStage("betting");
    setCountdown(10); // Thời gian cho phép chọn "Chẵn" hoặc "lẻ"
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
        setCountdown(10); // Thời gian chờ để roll xúc xắc
      } else if (gameStage === "rolling") {
        const flippedCoins = flipCoins();
        const mappedHistory = flippedCoins.map((value) => diceMap[value]);
        const finalResult = getResult(flippedCoins);
        setChip(flippedCoins);
        setHistory(mappedHistory);
        setResult1(finalResult);
        setResult2(
          calcResult2(
            flippedCoins[0],
            flippedCoins[1],
            flippedCoins[2],
            flippedCoins[3]
          )
        );
        setGameStage("finish");
        setCountdown(10); // Thời gian chờ để hiển thị kết quả
      }
    }
  }, [countdown, gameStage]);

  const handlePlayAgain = () => {
    setSelectedBet1(null);
    setSelectedBet2(null);
    setResult1(null); // Đặt lại kết quả
    setGameStage("waiting"); // Quay lại trạng thái waiting
    setCountdown(10); // Bắt đầu đếm ngược lại
  };

  const getBowlClass = (stage) => {
    switch (stage) {
      case "firstTime":
      case "finish":
        return "xd-bowl-mo";
      case "betting":
      case "waiting":
        return "xd-bowl-dong";
      default:
        return "";
    }
  };

  // final result
  const calcResult2 = (chip1, chip2, chip3, chip4) => {
    const totalChip = chip1 + chip2 + chip3 + chip4;
    switch (totalChip) {
      case 0:
        return "Xd4Red";
      case 1:
        return "Xd3Red";
      case 2:
        return "XdDraw";
      case 3:
        return "Xd3White";
      case 4:
        return "Xd4White";
    }
  };

  const renderResultComponent1 = (result1) => {
    switch (result1) {
      case "XdChan":
        return <XdChanAura className="aura-blink" />;
      case "XdLe":
        return <XdLeAura className="aura-blink" />;
      default:
        return <></>;
    }
  };

  const renderResultComponent2 = (result2) => {
    switch (result2) {
      case "Xd4Red":
        return (
          <div className="xd-4-red">
            <XdAura4Red className="aura-blink" />
          </div>
        );
      case "Xd3Red":
        return (
          <div className="xd-3-red">
            <XdAura3Red className="aura-blink" />
          </div>
        );

      case "XdDraw":
        return <></>;
      case "Xd3White":
        return (
          <div className="xd-3-white">
            <XdAura3White className="aura-blink" />
          </div>
        );
      case "Xd4White":
        return (
          <div className="xd-4-white">
            <XdAura4White className="aura-blink" />
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <div className="modal-game">
        <XdTable />
        <XdTime />
        <Xd12 left />
        <Xd12 right />
        <div className="xd-countdown">{countdown}</div>
        <div className="bet-section1">
          <div onClick={() => handleBet1("XdChan")}>
            <XdChan
              className={`chanIcon ${
                gameStage === "finish" && result1 === "XdChan" && "aura"
              }`}
            />
            {(gameStage === "betting" ||
              gameStage === "rolling" ||
              gameStage === "finish") &&
            selectedBet1 === "XdChan" ? (
              <XdChanAura />
            ) : (
              <></>
            )}
          </div>
          <div onClick={() => handleBet1("XdLe")}>
            <XdLe
              className={`leIcon ${
                gameStage === "finish" && result1 === "Xdle" && "aura"
              }`}
            />
            {(gameStage === "betting" ||
              gameStage === "rolling" ||
              gameStage === "finish") &&
            selectedBet1 === "XdLe" ? (
              <XdLeAura />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="bet-section2">
          <div className="xd-4-red" onClick={() => handleBet2("Xd4Red")}>
            {(gameStage === "betting" ||
              gameStage === "rolling" ||
              gameStage === "finish") &&
            selectedBet2 === "Xd4Red" ? (
              <XdAura4Red />
            ) : (
              <></>
            )}
          </div>
          <div className="xd-3-red" onClick={() => handleBet2("Xd3Red")}>
            {(gameStage === "betting" ||
              gameStage === "rolling" ||
              gameStage === "finish") &&
            selectedBet2 === "Xd3Red" ? (
              <XdAura3Red />
            ) : (
              <></>
            )}
          </div>
          <div className="xd-3-white" onClick={() => handleBet2("Xd3White")}>
            {(gameStage === "betting" ||
              gameStage === "rolling" ||
              gameStage === "finish") &&
              (selectedBet2 === "Xd3White" ? <XdAura3White /> : <></>)}
          </div>
          <div className="xd-4-white" onClick={() => handleBet2("Xd4White")}>
            {(gameStage === "betting" ||
              gameStage === "rolling" ||
              gameStage === "finish") &&
            selectedBet2 === "Xd4White" ? (
              <XdAura4White />
            ) : (
              <></>
            )}
          </div>
        </div>
        {gameStage === "betting" && countdown <= 10 && countdown >= 8 && (
          <XdChat text={conversation(1)} />
        )}
        {gameStage === "betting" &&
          countdown <= 4 &&
          countdown >= 0 &&
          (selectedBet1 === "XdChan" ? (
            <XdChat text={conversation(3)} />
          ) : selectedBet1 === "XdLe" ? (
            <XdChat text={conversation(4)} />
          ) : (
            <XdChat text={conversation(2)} />
          ))}
        <div className={gameStage === "rolling" ? "bowl-disc" : ""}>
          <XdDisc className="xd-disc" />
          {(gameStage === "firstTime" ||
            (gameStage === "betting" && countdown >= 6)) && (
            <div className="chipArea">
              <CoinLogic
                coin1={history[0]}
                coin2={history[1]}
                coin3={history[2]}
                coin4={history[3]}
              />
            </div>
          )}
          {(gameStage === "finish" ||
            (gameStage === "waiting" && countdown >= 5)) && (
            <div className="chipArea">
              <CoinLogic
                coin1={history[0]}
                coin2={history[1]}
                coin3={history[2]}
                coin4={history[3]}
              />
            </div>
          )}
          <XdBowl className={getBowlClass(gameStage)} />
        </div>
        {console.log("selectedBet1", selectedBet1)}
        {console.log("selectedBet2", selectedBet2)}
        {console.log("result1", result1)}
        {console.log("result2", result2)}

        {gameStage === "finish" && renderResultComponent1(result1)}
        {gameStage === "finish" && renderResultComponent2(result2)}
        {gameStage === "finish" &&
          (selectedBet1 !== result1 && selectedBet2 !== result2 ? (
            <>
              <XdLose />
              <XdChat text={conversation(6)} />
            </>
          ) : (
            <>
              <XdWin />
              <XdChat text={conversation(5)} />
            </>
          ))}
        {(gameStage === "firstTime" || gameStage === "waiting") && (
          <div className="game-stage" onClick={startGame}>
            <XdBegin />
          </div>
        )}
        {gameStage === "finish" && (
          <div className="game-stage" onClick={handlePlayAgain}>
            <XdReplay />
          </div>
        )}
        <XdLantern />
        <XdX onClick={onClose} />
        <XdI />
        <XdMai />
        <Xdbanhchung />
        <XdCanhdao />
      </div>
    </>
  );
};

export default XocdiaMini;
