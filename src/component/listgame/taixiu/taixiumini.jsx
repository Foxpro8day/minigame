import React, { useState, useEffect } from "react";
import "./taixiumini.scss";

const TaixiuMini = () => {
  const [selectedBet, setSelectedBet] = useState(null); // "Tài" hoặc "Xỉu"
  const [countdown, setCountdown] = useState(10); // Đếm ngược thời gian
  const [gameStage, setGameStage] = useState("waiting"); // Trạng thái game: 'waiting', 'betting', 'rolling', 'finish'
  const [dice, setDice] = useState([0, 0, 0]); // 3 viên xúc xắc
  const [result, setResult] = useState(null); // Kết quả game

  // Hàm random xúc xắc
    const rollDice = () => {
        const rDice = [1, 2, 3].map(() => Math.floor(Math.random() * 6) + 1);
        console.log(rDice)
    return rDice
  };

  // Hàm tính kết quả
    const getResult = (totalPoints) => {
      console.log(totalPoints)
    if (totalPoints >= 3 && totalPoints <= 10) return "Xỉu";
    if (totalPoints >= 11 && totalPoints <= 18) return "Tài";
    return "";
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
    setCountdown(10); // Thời gian cho phép chọn "Tài" hoặc "Xỉu"
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
        const rolledDice = rollDice();
        setDice(rolledDice);
        const totalPoints = rolledDice.reduce((acc, value) => acc + value, 0);
        const finalResult = getResult(totalPoints);
        setResult(finalResult);
        setGameStage("finish");
        setCountdown(10); // Thời gian chờ để hiển thị kết quả
      } else if (gameStage === "finish") {
        setGameStage("waiting"); // Quay lại trạng thái chờ bắt đầu ván mới
        setCountdown(10); // Thời gian chờ giữa các ván cược
      }
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
    setDice([0, 0, 0]);
    setSelectedBet(null); // Đặt lại cược
    setResult(null); // Đặt lại kết quả
    setGameStage("waiting"); // Quay lại trạng thái waiting
    setCountdown(10); // Bắt đầu đếm ngược lại
  };

  return (
    <div className="minigame">
      <h1>Mini Game Tài Xỉu</h1>
      <div className="countdown">Thời gian còn lại: {countdown} giây</div>

      {gameStage === "waiting" && (
        <div className="message">Nhấn "Bắt đầu" để bắt đầu ván cược</div>
      )}

      {gameStage === "betting" && (
        <div className="betting-options">
          <button
            onClick={() => handleBet("Tài")}
            disabled={selectedBet !== null || countdown === 0}
          >
            Tài
          </button>
          <button
            onClick={() => handleBet("Xỉu")}
            disabled={selectedBet !== null || countdown === 0}
          >
            Xỉu
          </button>
          {selectedBet ? <p>Bạn đã chọn: {selectedBet}</p> : <p>Bạn chọn bên nào?</p>}
        </div>
      )}

      {gameStage === "rolling" && (
        <div className="dice">
          <div className="dice-item">{dice[0]}</div>
          <div className="dice-item">{dice[1]}</div>
          <div className="dice-item">{dice[2]}</div>
        </div>
      )}

      {gameStage === "finish" && (
        <>
          <div className="dice">
            <div className="dice-item">{dice[0]}</div>
            <div className="dice-item">{dice[1]}</div>
            <div className="dice-item">{dice[2]}</div>
            <div className="tong-diem">
              {dice[0] + dice[1] + dice[2]} Điểm - {result}
            </div>
          </div>
          {selectedBet === null ? (
            <div className="result">Người chơi không chọn cược!</div>
          ) : result === selectedBet ? (
            <div className="result">Chúc mừng, bạn thắng, tiếp tục chuỗi thắng nào!</div>
          ) : (
            <div className="result">Thua rồi, ván sau sẽ thắng!</div>
          )}
        </>
      )}

      {gameStage === "waiting" && (
        <button onClick={startGame} disabled={countdown !== 10}>
          Bắt đầu
        </button>
      )}

      {gameStage === "rolling" && (
        <>
          {selectedBet ? (
            <p>Bạn đã chọn: {selectedBet}</p>
          ) : (
            <p>Tại sao bạn không chọn?</p>
          )}
          <div className="dice-message">Đang quay xúc xắc...</div>
        </>
      )}

      {gameStage === "finish" && (
        <div className="play-again">
          <button onClick={handlePlayAgain}>Chơi lại nào</button>
        </div>
      )}
    </div>
  );
};

export default TaixiuMini;
