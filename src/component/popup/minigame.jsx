import "./minigame.scss";
import spriteImage from "../assets/popupminigame.png";
import { useState, useRef } from "react";
const Minigame = () => {
  const logoPopup = { x: 0, y: 400, width: 123, height: 123 };
  const [position, setPosition] = useState({
    x: logoPopup.x,
    y: logoPopup.y,
  });
  const isDragging = useRef(false);

  const handleMouseDown = (e) => {
    // Lưu lại vị trí bắt đầu kéo
    isDragging.current = true;
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;
    const moveHandler = (moveEvent) => {
      if (isDragging.current) {
        // Tính toán vị trí mới khi di chuyển chuột
        const newX = moveEvent.clientX - offsetX;
        const newY = moveEvent.clientY - offsetY;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      // Dừng kéo khi thả chuột
      isDragging.current = false;
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <div
        className="logoPopup-container"
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div
          className="logoPopup-icon"
          style={{
            backgroundImage: `url(${spriteImage})`,
            backgroundPosition: `-${logoPopup.x}px -${logoPopup.y}px`,
            width: `${logoPopup.width}px`,
            height: `${logoPopup.height}px`,
          }}
        ></div>
      </div>
    </>
  );
};

export default Minigame;
