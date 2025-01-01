import "./coinLogic.scss";
import { useEffect, useState } from "react";

const CoinLogic = ({ coin1, coin2, coin3, coin4 }) => {
  const containerSize = { width: 100, height: 70 };
  const squareSize = 20;

  const getRandomPosition = (size, containerSize) => {
    return Math.floor(Math.random() * (containerSize - size));
  };

  const isOverlapping = (square1, square2) => {
    return (
      square1.posX < square2.posX + square2.size &&
      square1.posX + square1.size > square2.posX &&
      square1.posY < square2.posY + square2.size &&
      square1.posY + square1.size > square2.posY
    );
  };

  const generatePositions = (squareSize, containerSize, count) => {
    const positions = [];
    let attempts = 0;
    const maxAttempts = 100;

    while (positions.length < count && attempts < maxAttempts) {
      const newSquare = {
        posX: getRandomPosition(squareSize, containerSize.width),
        posY: getRandomPosition(squareSize, containerSize.height),
        size: squareSize,
      };

      const hasOverlap = positions.some((square) =>
        isOverlapping(square, newSquare)
      );

      if (!hasOverlap) {
        positions.push(newSquare);
      }

      attempts++;
    }

    if (attempts >= maxAttempts) {
      console.warn("Không thể tạo đủ vị trí ngẫu nhiên mà không bị chồng lấn.");
      generatePositions(squareSize, containerSize, 4);
    }

    return positions;
  };
  const [squares, setSquares] = useState([]);

  useEffect(() => {
   
    const positions = generatePositions(squareSize, containerSize, 4);
    setSquares(positions);
  }, []);

  const components = [coin1, coin2, coin3, coin4];

  return (
    <>
      {squares.map(({ posX, posY }, index) => {
        const SquareComponent = components[index];
        return (
          <SquareComponent
            key={index}
            style={{
              left: `${posX}px`,
              top: `${posY}px`,
            }}
          />
        );
      })}
    </>
  );
};

export default CoinLogic;
