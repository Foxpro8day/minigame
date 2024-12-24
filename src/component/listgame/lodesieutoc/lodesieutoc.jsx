// Lô Đề Siêu Tốc với React - 4 Đài
import React, { useState, useEffect } from "react";

// Hàm tạo số ngẫu nhiên với độ dài tuỳ chỉnh
const generateRandomNumber = (length) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(min + Math.random() * (max - min)).toString();
};

// Cấu trúc các giải
const PRIZE_STRUCTURE = {
  "Giải 8": { count: 1, length: 2 },
  "Giải 7": { count: 1, length: 3 },
  "Giải 6": { count: 3, length: 4 },
  "Giải 5": { count: 1, length: 5 },
  "Giải 4": { count: 7, length: 5 },
  "Giải 3": { count: 2, length: 5 },
  "Giải 2": { count: 1, length: 5 },
  "Giải 1": { count: 1, length: 5 },
  "Giải Đặc Biệt": { count: 1, length: 6 },
};

// Hàm tạo danh sách các đài
const generateLotteryStations = () => {
  const stations = [];
  for (let i = 0; i < 4; i++) {
    const station = {};
    for (const [prize, { count, length }] of Object.entries(PRIZE_STRUCTURE)) {
      station[prize] = Array.from({ length: count }, () =>
        generateRandomNumber(length)
      );
    }
    stations.push(station);
  }
  return stations;
};

const LotteryGame = () => {
  const [lotteryStations, setLotteryStations] = useState([]);
  const [betNumber, setBetNumber] = useState("");
  const [betResult, setBetResult] = useState(null);
  const [stage, setStage] = useState("start");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && stage !== "start") {
      handleNextStage();
    }
  }, [countdown]);

  const handleNextStage = () => {
    if (stage === "start") {
      setStage("betting");
      setCountdown(10);
    } else if (stage === "betting") {
      setStage("locked");
      setCountdown(10);
    } else if (stage === "locked") {
      startLottery();
    } else if (stage === "result") {
      resetGame();
    }
  };

  const startLottery = () => {
    const stations = generateLotteryStations();
    setLotteryStations(stations);
    checkBetResult(stations);
    setStage("result");
  };

  const checkBetResult = (stations) => {
    for (let i = 0; i < stations.length; i++) {
      for (const [prize, numbers] of Object.entries(stations[i])) {
        if (numbers.includes(betNumber)) {
          setBetResult({ station: i + 1, prize });
          return;
        }
      }
    }
    setBetResult(null);
  };

  const resetGame = () => {
    setStage("start");
    setBetNumber("");
    setBetResult(null);
    setLotteryStations([]);
  };

  return (
    <div className="lottery-container">
      <h1>Lô Đề Siêu Tốc</h1>

      {stage === "start" && (
        <button onClick={() => handleNextStage()}>Bắt Đầu</button>
      )}

      {stage === "betting" && (
        <>
          <p>Bắt đầu đặt cược! Bạn có {countdown} giây để đặt số.</p>
          <label>Nhập số bạn muốn đặt cược:</label>
          <input
            type="text"
            maxLength={6}
            value={betNumber}
            onChange={(e) => setBetNumber(e.target.value)}
            placeholder="Nhập số..."
            disabled={countdown === 0}
          />
        </>
      )}

      {stage === "locked" && (
        <p>Khoá cược! Quay số sẽ bắt đầu sau {countdown} giây.</p>
      )}

      {stage === "result" && (
        <>
          {betResult ? (
            <p className="result-message">
              Chúc mừng! Số {betNumber} đã trúng {betResult.prize} tại Đài{" "}
              {betResult.station}.
            </p>
          ) : (
            <p className="result-message">
              Không trúng số {betNumber}. Thử lại nhé!
            </p>
          )}
          <button onClick={resetGame}>Chơi Lại</button>
        </>
      )}

      <div className="lottery-grid">
        <div className="prize-header">
          {Object.keys(PRIZE_STRUCTURE).map((prize) => (
            <div key={prize} className="prize-title">
              {prize}
            </div>
          ))}
        </div>
        {lotteryStations.map((station, index) => (
          <div key={index} className="station-column">
            <h2>Đài {index + 1}</h2>
            {Object.entries(station).map(([prize, numbers]) => (
              <ul key={prize} className="prize-category">
                {numbers.map((number, i) => (
                  <li key={i} className="lottery-number">
                    {number}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LotteryGame;
