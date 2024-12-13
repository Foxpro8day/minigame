import "./xocdiamini.scss";
import { useState, useEffect } from "react";
const XocdiaMini = () => {
  const [selectedBet, setSelectedBet] = useState(null); // "Tài" hoặc "Xỉu"
  const [countdown, setCountdown] = useState(10); // Đếm ngược thời gian
  const [gameStage, setGameStage] = useState("waiting"); // Trạng thái game: 'waiting', 'betting', 'rolling', 'finish'
  const [dice, setDice] = useState([1, 1, 1, 1]); // 4 xu, mỗi xu có 2 mặt: xấp/ngửa
  const [result, setResult] = useState(null); // Kết quả game

  // Hàm random xu
  const flipCoins = () => {
    return [1, 2, 3, 4].map(() => (Math.random() < 0.5 ? 0 : 1)); // 0: xấp, 1: ngửa
  };

  // Hàm tính kết quả
  const getResult = (coins) => {
    const totalPoints = coins.reduce((acc, value) => acc + value, 0);
    return totalPoints % 2 === 0 ? "Chẵn" : "Lẻ";
  };

  // Xử lý khi chọn "Chẵn" hoặc "Lẻ"
  const handleBet = (bet) => {
    if (gameStage === "betting") {
      setSelectedBet(bet);
    }
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
        setDice(flippedCoins);
        const finalResult = getResult(flippedCoins);
        setResult(finalResult);
        setGameStage("finish");
        setCountdown(10); // Thời gian chờ để hiển thị kết quả
      }
    }
  }, [countdown, gameStage]);

  const handlePlayAgain = () => {
    setDice([1, 1, 1, 1]);
    setSelectedBet(null); // Đặt lại cược
    setResult(null); // Đặt lại kết quả
    setGameStage("waiting"); // Quay lại trạng thái waiting
    setCountdown(10); // Bắt đầu đếm ngược lại
  };

  return (
    <>
      <div className="xocdia-mini">
        <h1>Xóc Đĩa Mini</h1>
        <div className="game-stage">
          <div className="countdown">Thời gian còn lại: {countdown} giây</div>

          {gameStage === "waiting" && (
            <div className="message">Nhấn "Bắt đầu" để bắt đầu ván cược</div>
          )}
          {gameStage === "waiting" && (
            <button onClick={startGame}>Bắt đầu chơi</button>
          )}
        </div>
        {gameStage === "betting" && (
          <div className="betting-options">
            <button
              onClick={() => handleBet("Chẵn")}
              disabled={selectedBet !== null || countdown === 0}
            >
              Chẵn
            </button>
            <button
              onClick={() => handleBet("Lẻ")}
              disabled={selectedBet !== null || countdown === 0}
            >
              Lẻ
            </button>
            {selectedBet ? (
              <p>Bạn đã chọn: {selectedBet}</p>
            ) : (
              <p>Bạn chọn bên nào?</p>
            )}

            <p>Thời gian còn lại: {countdown} giây</p>
          </div>
        )}

        {gameStage === "rolling" && (
          <div>
            <p>Đang tung đồng xu...</p>
            {selectedBet ? (
              <p>Bạn đã chọn: {selectedBet}</p>
            ) : (
              <p>Tại sao bạn không chọn???</p>
            )}

            <p>Thời gian còn lại: {countdown} giây</p>
          </div>
        )}
        {gameStage === "finish" && (
          <div>
            <h3>Kết quả:</h3>
            <p>Xu: {dice.join(", ")}</p>
            <p>Kết quả: {result}</p>
            {selectedBet ? (
              <p>
                {selectedBet === result
                  ? "Chúc mừng, bạn thắng, tiếp tục chuỗi thắng nào!"
                  : "Thua rồi, ván sau sẽ thắng!"}
              </p>
            ) : (
              <p>Bạn không chọn cược!</p>
            )}
            <button onClick={handlePlayAgain}>Chơi lại nào</button>
          </div>
        )}
      </div>
    </>
  );
};

export default XocdiaMini;
