import "./minigame.scss";
import spriteImage from "../assets/popupminigame.png";
import { useState, useRef } from "react";

const Minigame = () => {
  const logoPopup = { x: 0, y: 400, width: 123, height: 123 };
  const logoTaixiu = { x: 400, y: 0, width: 83, height: 76 };

  const [position, setPosition] = useState({
    x: logoPopup.x,
    y: logoPopup.y,
  });
  const isDragging = useRef(false);
  const startCoords = useRef({ x: 0, y: 0 });

  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = (e) => {
    startCoords.current = { x: e.clientX, y: e.clientY };
    isDragging.current = false;

    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;

    const moveHandler = (moveEvent) => {
      const dx = moveEvent.clientX - startCoords.current.x;
      const dy = moveEvent.clientY - startCoords.current.y;

      if (Math.sqrt(dx * dx + dy * dy) > 5) {
        isDragging.current = true;
        const newX = moveEvent.clientX - offsetX;
        const newY = moveEvent.clientY - offsetY;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = (upEvent) => {
      if (!isDragging.current) {
        handleMainMenu();
      }

      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMainMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div
        className={`logoPopup-container ${isActive ? "active" : ""}`}
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div
          className={`logoPopup-icon mng-toggle `}
          style={{
            backgroundImage: `url(${spriteImage})`,
            backgroundPosition: `-${logoPopup.x}px -${logoPopup.y}px`,
            width: `${logoPopup.width}px`,
            height: `${logoPopup.height}px`,
          }}
        ></div>
        <div className="button-close">
          <i className="fa-solid fa-x"></i>
        </div>
        {[...Array(6)].map((_, i) => (
          <li key={i} style={{ "--i": i }}>
            <a href="#">
              <div
                style={{
                  backgroundImage: `url(${spriteImage})`,
                  backgroundPosition: `-${logoTaixiu.x}px -${logoTaixiu.y}px`,
                  width: `${logoTaixiu.width}px`,
                  height: `${logoTaixiu.height}px`,
                  transform: `rotate(${i * 60 - 180}deg)`,
                }}
              ></div>
            </a>
          </li>
        ))}
      </div>
    </>
  );
};

export default Minigame;
