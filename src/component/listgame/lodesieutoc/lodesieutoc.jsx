// Lô Đề Siêu Tốc với React - 4 Đài
import React, { useState, useEffect } from "react";
import "./lodesieutoc.scss";

// Hàm tạo số ngẫu nhiên với độ dài tuỳ chỉnh
const generateRandomNumber = (length) => {
  const max = Math.pow(10, length) - 1; // max vẫn giữ nguyên
  const randomNumber = Math.floor(Math.random() * (max + 1)); // Từ 0 đến max
  return randomNumber.toString().padStart(length, "0");
};

// Cấu trúc các giải MB
const PRIZE_STRUCTURE = {
  g7: { count: 4, length: 2 },
  g6: { count: 3, length: 3 },
  g5: { count: 6, length: 4 },
  g4: { count: 4, length: 4 },
  g3: { count: 6, length: 5 },
  g2: { count: 2, length: 5 },
  g1: { count: 1, length: 5 },
  gdb: { count: 1, length: 6 },
};

// Hàm tạo giải trúng thưởng
const generateLotteryStations = () => {
  const stations = [];
  const station = {}; // Tạo 1 đài duy nhất
  for (const [prize, { count, length }] of Object.entries(PRIZE_STRUCTURE)) {
    station[prize] = Array.from({ length: count }, () =>
      generateRandomNumber(length)
    );
  }
  stations.push(station);

  return stations;
};

const betOptions = {
  baolo: ["baolo2", "baolo3"],
  xien: ["xien2", "xien3", "xien4"],
  lotruot: ["truot4", "truot8", "truot10"],
  dauduoi: ["dau", "duoi"],
  danhde: ["dedau", "dedacbiet"],
  bacang: ["3cang"],
};

const LotteryGame = () => {
  const [stage, setStage] = useState("waiting");
  const [countdown, setCountdown] = useState(0);
  const [selectedChanel, setSelectedChanel] = useState("baolo");
  const [selectedType, setSelectedType] = useState("baolo2");
  const [stations, setStations] = useState(null);
  // giai thuong
  const [hais27, setHais27] = useState([]);
  const [bas23, setBas23] = useState([]);
  const [motHcDb, setMotHcDb] = useState(null);
  const [motHdvDb, setMotHdvDb] = useState(null);
  const [haisg7, setHaisg7] = useState([]);
  const [haiscDB, setHaiscDB] = useState(null);
  const [baDB, setBaDB] = useState(null);

  const [ticket, setTicket] = useState([
    { chanel: "baolo", type: "baolo2", numbers: [] },
  ]);
  const [selectedGroup, setSelectedGroup] = useState(0); // Mặc định là 0

  // Sinh danh sách số từ 0-10
  const generateNumbers = () => {
    return Array.from({ length: 10 }, (_, i) => i.toString().padStart(1, "0"));
  };

  // Sinh danh sách số từ 00-99
  const generateNumbers2 = () => {
    return Array.from({ length: 100 }, (_, i) => i.toString().padStart(2, "0"));
  };

  // Hàm tạo số theo nhóm (000-099, 100-199, ...)
  const generateNumbers3 = (group) => {
    return Array.from({ length: 100 }, (_, i) =>
      (group * 100 + i).toString().padStart(3, "0")
    );
  };

  // Kiểm tra vé trúng
  const checkBetResult = (
    ticket,
    stations,
    hais27,
    bas23,
    motHcDb,
    motHdvDb
  ) => {
    const winningResults = [];

    ticket.forEach(({ chanel, type, numbers }) => {
      numbers.forEach((num) => {
        let isWinner = false;

        if (["baolo2", "xien2", "xien3", "xien4"].includes(type)) {
          if (hais27.includes(num)) {
            isWinner = true;
          }
        }

        if (["truot4", "truot8", "truot10"].includes(type)) {
          if (!hais27.includes(num)) {
            isWinner = true;
          }
        }

        if (["baolo3", "3cang"].includes(type)) {
          if (bas23.includes(num)) {
            isWinner = true;
          }
        }

        if (type === "dau" && motHcDb === num) {
          isWinner = true;
        }

        if (type === "duoi" && motHdvDb === num) {
          isWinner = true;
        }

        if (type === "dedau") {
          const g7Results = stations.flatMap((station) => station.g7 || []);
          if (g7Results.includes(num)) {
            isWinner = true;
          }
        }

        if (type === "dedacbiet") {
          const dbResults = stations.flatMap((station) => station.gdb || []);
          if (dbResults.some((db) => db.slice(-1) === num)) {
            isWinner = true;
          }
        }

        if (isWinner) {
          winningResults.push({ chanel, type, number: num });
        }
      });
    });

    return winningResults;
  };

  // Hàm cập nhật vé khi chọn số
  const handleUpdateTicket = (chanel, type, number) => {
    setTicket((prev) => {
      const updatedTickets = [...prev];
      const existingIndex = updatedTickets.findIndex(
        (item) => item.chanel === chanel && item.type === type
      );

      if (existingIndex !== -1) {
        const updatedItem = { ...updatedTickets[existingIndex] };
        const isSelected = updatedItem.numbers.includes(number);

        // Thêm hoặc xóa số đã chọn
        updatedItem.numbers = isSelected
          ? updatedItem.numbers.filter((n) => n !== number)
          : [...updatedItem.numbers, number];

        // Nếu không có số nào, xóa vé
        if (updatedItem.numbers.length === 0) {
          updatedTickets.splice(existingIndex, 1);
        } else {
          updatedTickets[existingIndex] = updatedItem;
        }
      } else {
        updatedTickets.push({
          chanel,
          type,
          numbers: [number],
        });
      }
      return updatedTickets;
    });
  };

  // Khi thay đổi chanel
  const handleChangeChanel = (newChanel) => {
    const defaultType = betOptions[newChanel][0];
    setSelectedChanel(newChanel);
    setSelectedType(defaultType);

    // Kiểm tra nếu chưa có vé thì tạo mới với số trống
    const existingTicket = ticket.find(
      (t) => t.chanel === newChanel && t.type === defaultType
    );
    if (!existingTicket) {
      setTicket((prev) => [
        ...prev,
        { chanel: newChanel, type: defaultType, numbers: [] },
      ]);
    }
  };

  // Khi thay đổi kiểu cược (type)
  const handleTypeChange = (newType) => {
    setSelectedType(newType);

    // Tạo vé mới nếu chưa tồn tại
    const existingTicket = ticket.find(
      (t) => t.chanel === selectedChanel && t.type === newType
    );
    if (!existingTicket) {
      setTicket((prev) => [
        ...prev,
        { chanel: selectedChanel, type: newType, numbers: [] },
      ]);
    }
  };

  // Chọn số dựa trên điều kiện chanel và type
  const getNumbers = () => {
    if (
      (selectedChanel === "baolo" && selectedType === "baolo3") ||
      (selectedChanel === "bacang" && selectedType === "3cang")
    ) {
      return generateNumbers3(selectedGroup);
    }
    if (
      selectedChanel === "dauduoi" &&
      (selectedType === "dau" || selectedType === "duoi")
    ) {
      return generateNumbers();
    }
    return generateNumbers2();
  };

  // Xuất thông tin cược ra console
  const exportTicketsInfo = () => {
    console.log("Danh sách vé cược:", ticket);
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && stage !== "waiting") {
      handleNextStage();
    }
  }, [countdown]);

  const handleNextStage = () => {
    if (stage === "start") {
      setStage("locked");
      setCountdown(10);
    } else if (stage === "locked") {
      startRolling();
      setCountdown(10);
    } else if (stage === "result") {
      const winningResults = checkBetResult(
        ticket,
        stations,
        hais27,
        bas23,
        motHcDb,
        motHdvDb
      );
      console.log(winningResults); // Hiển thị danh sách các vé trúng
      resetGame();
    }
  };

  const startRolling = () => {
    handleGenerateResults();
    setStage("result");
  };

  const resetGame = () => {
    setStage("waiting");
  };

  // Hàm quay số
  const handleGenerateResults = () => {
    const newStations = generateLotteryStations();
    setStations(newStations);

    // Trích xuất các giá trị từ stations

    const specialPrize = newStations[0]?.gdb?.[0];
    const giai7 = newStations.g7;

    const allNumbers2Digits = newStations.flatMap((station) => [
      ...(station.g7 || []),
      ...(station.g6 || []),
      ...(station.g5 || []),
      ...(station.g4 || []),
      ...(station.g3 || []),
      ...(station.g2 || []),
      ...(station.g1 || []),
      ...(station.gdb || []),
    ]);
    const lastTwoDigits = allNumbers2Digits.map((num) => num.slice(-2));
    setHais27(lastTwoDigits); // 2 chữ số cuối của tất cả các giải

    const allNumbers3Digits = newStations.flatMap((station) => [
      ...(station.g6 || []),
      ...(station.g5 || []),
      ...(station.g4 || []),
      ...(station.g3 || []),
      ...(station.g2 || []),
      ...(station.g1 || []),
      ...(station.gdb || []),
    ]);

    const lastThreeDigits = allNumbers3Digits.map((num) => num.slice(-3));
    setBas23(lastThreeDigits); // 2 chữ số cuối của tất cả các giải

    if (specialPrize) {
      setMotHcDb(specialPrize.charAt(4)); // Nếu tồn tại, mới gọi charAt
      setMotHdvDb(specialPrize.charAt(5)); // Chữ số hàng đơn vị giải đặc biệt
      setHaiscDB(specialPrize.slice(-2)); // 2 chữ số cuối giải đặc biệt
      setBaDB(specialPrize.slice(-3)); // 3 chữ số cuối giải đặc biệt
    } else {
      setMotHcDb(""); // Nếu không tồn tại, trả về giá trị mặc định
    }
    setHaisg7(giai7); // 4 giải 7
  };

  useEffect(() => {
    console.log("hais27 cập nhật:", hais27);
  }, [hais27]);

  return (
    <div className="lottery-container">
      <h1>Lô Đề Siêu Tốc</h1>
      <label>Chọn kiểu đánh:</label>
      <select
        value={selectedChanel}
        onChange={(e) => handleChangeChanel(e.target.value)}
      >
        {Object.keys(betOptions).map((chanel) => (
          <option key={chanel} value={chanel}>
            {chanel}
          </option>
        ))}
      </select>

      {/* Dropdown chọn type cho chanel */}
      <label>Chọn kiểu cược:</label>
      <select
        value={selectedType}
        onChange={(e) => handleTypeChange(e.target.value)}
      >
        {betOptions[selectedChanel]?.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* Hiển thị số từ 00 - 99 hoặc 000 - 999 */}
      <div className="number-grid">
        {getNumbers().map((num) => {
          const isSelected = ticket.some(
            (bet) =>
              bet.chanel === selectedChanel &&
              bet.type === selectedType && // Luôn sử dụng selectedType mới nhất
              bet.numbers.includes(num)
          );

          return (
            <div
              key={num}
              className={`grid-item ${isSelected ? "selected" : ""}`}
              onClick={() =>
                handleUpdateTicket(selectedChanel, selectedType, num)
              }
            >
              {num}
            </div>
          );
        })}
      </div>

      {/* Chọn nhóm số (000-099, 100-199) */}
      {(selectedChanel === "baolo" && selectedType === "baolo3") ||
      (selectedChanel === "bacang" && selectedType === "3cang") ? (
        <div className="number-header">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className={`grid ${selectedGroup === i ? "active" : ""}`}
              onClick={() => setSelectedGroup(i)}
            >
              {i}
            </div>
          ))}
        </div>
      ) : null}

      {/* Nút xuất thông tin */}
      <button onClick={exportTicketsInfo}>Xuất Thông Tin Cược</button>
      {/* Hiển thị số đã chọn */}
      <p>
        Vé hiện tại:{" "}
        {ticket
          .filter(
            (bet) => bet.chanel === selectedChanel && bet.type === selectedType
          )
          .map((bet) => bet.numbers.join(", "))
          .join(", ") || "Chưa có số nào"}
      </p>

      <div className="game-actions">
        <button
          onClick={() => {
            setStage("start");
            setCountdown(10);
          }}
          disabled={stage !== "waiting"}
        >
          Bắt Đầu Trò Chơi
        </button>
      </div>
      <div>{countdown}</div>
      {/* Hiển thị kết quả xổ số */}
      {stations && (
        <div className="result-container">
          <h2>Kết Quả Xổ Số</h2>
          {stations && (
            <div className="result-summary">
              <h2>Kết Quả Trích Xuất</h2>
              <p>
                <strong>Hais27:</strong> {hais27.join(", ")}
              </p>
              <p>
                <strong>Bas23:</strong> {bas23.join(", ")}
              </p>
              <p>
                <strong>Hàng Chục Giải ĐB:</strong> {motHcDb}
              </p>
              <p>
                <strong>Hàng Đơn Vị Giải ĐB:</strong> {motHdvDb}
              </p>
              {/* <p>
                <strong>Giải 7 (4 số):</strong> {haisg7.join(", ")}
              </p> */}
              <p>
                <strong>2 số cuối Giải ĐB:</strong> {haiscDB}
              </p>
              <p>
                <strong>3 số cuối Giải ĐB:</strong> {baDB}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LotteryGame;
