import "./baucua.scss";
import { useState, useEffect } from "react";

const BaucuaMini = () => {
  const [selectedBet, setSelectedBet] = useState(null); // Con vật mà người chơi chọn cược
  const [countdown, setCountdown] = useState(10); // Đếm ngược thời gian
  const [gameStage, setGameStage] = useState("waiting"); // Trạng thái game: 'waiting', 'betting', 'rolling', 'finish'
  const [dice, setDice] = useState(["", "", ""]); // 3 viên xúc xắc với kết quả là các biểu tượng
  const [result, setResult] = useState([]); // Kết quả cuối cùng

  const symbols = ["Bầu", "Cua", "Tôm", "Cá", "Gà", "Nai"];

  // Hàm tung xúc xắc (random)
  const rollDice = () => {
    return [0, 1, 2].map(
      () => symbols[Math.floor(Math.random() * symbols.length)]
    );
  };

  // Xử lý khi chọn con vật để cược
  const handleBet = (bet) => {
    if (gameStage === "betting") {
      setSelectedBet(bet);
    }
  };

  // Xử lý khi bấm nút bắt đầu
  const startGame = () => {
    setGameStage("betting");
    setCountdown(10); // Thời gian cho phép chọn cược
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
        setCountdown(5); // Thời gian chờ để lắc xúc xắc
      } else if (gameStage === "rolling") {
        const rolledDice = rollDice();
        setDice(rolledDice);
        setResult(rolledDice);
        setGameStage("finish");
        setCountdown(10); // Thời gian chờ để hiển thị kết quả
      }
    }
  }, [countdown, gameStage]);

  const handlePlayAgain = () => {
    setDice(["", "", ""]);
    setSelectedBet(null); // Đặt lại cược
    setResult([]); // Đặt lại kết quả
    setGameStage("waiting"); // Quay lại trạng thái waiting
    setCountdown(10); // Bắt đầu đếm ngược lại
  };

  return (
    <div className="baucua">
      <h1>Game Bầu Cua</h1>
      {gameStage === "waiting" && (
        <button onClick={startGame}>Bắt đầu chơi</button>
      )}

      {gameStage === "betting" && (
        <div className="betting-options">
          <h3>Chọn con vật để cược:</h3>
          <div className="symbols">
            {symbols.map((symbol) => (
              <button
                key={symbol}
                onClick={() => handleBet(symbol)}
                disabled={selectedBet === symbol}
              >
                {symbol}
              </button>
            ))}
          </div>
          <p>Bạn đã chọn: {selectedBet || "Chưa chọn"}</p>
          <p>Thời gian còn lại: {countdown} giây</p>
        </div>
      )}

      {gameStage === "rolling" && (
        <div>
          <p>Đang lắc xúc xắc...</p>
          <p>Thời gian còn lại: {countdown} giây</p>
        </div>
      )}

      {gameStage === "finish" && (
        <div>
          <h3>Kết quả:</h3>
          <p>Xúc xắc: {dice.join(", ")}</p>
          <p>
            {selectedBet
              ? result.includes(selectedBet)
                ? `Bạn thắng! (${
                    result.filter((item) => item === selectedBet).length
                  } lần xuất hiện)`
                : "Bạn thua!"
              : "Bạn không chọn cược!"}
          </p>
          <button onClick={handlePlayAgain}>Chơi lại</button>
        </div>
      )}
    </div>
  );
};

export default BaucuaMini;
