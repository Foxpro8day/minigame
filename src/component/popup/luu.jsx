import "./minigame.scss";
import { useState, useRef, useEffect } from "react";
import TaixiuMini from "../listgame/taixiu/taixiumini";
import LotteryGame from "../listgame/lodesieutoc/lodesieutoc";
import MiniGamePopup from "../assets/8day-Minigame-Icon.png";

const Minigame = () => {
  const logoPopup = { x: 6, y: 12, width: 248, height: 246 };
  const logoTaixiu = { x: 260, y: 125, width: 120, height: 110 };
  const logoXocdia = { x: 245, y: 270, width: 137, height: 110 };
  const logoBaucua = { x: 65, y: 275, width: 145, height: 110 };
  const comingSoon = { x: 252, y: 8, width: 135, height: 100 };

  const [positionPopup, setPositionPopup] = useState({
    x: 0,
    y: 0,
  });
  const [positionTaixiu, setPositionTaixiu] = useState({
    x: 0,
    y: 0,
  });

  const isDragging = useRef(false);
  const startCoords = useRef({ x: 0, y: 0 });

  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSource, setActiveSource] = useState("");

  const calculateCenterPositionVW = (widthVW, heightVW) => {
    const width = (window.innerWidth * parseFloat(widthVW)) / 100;
    const height = (window.innerWidth * parseFloat(heightVW)) / 100;

    const centerX = window.innerWidth / 2 - width / 2;
    const centerY = window.innerHeight / 2 - height / 2;

    return { x: centerX, y: centerY };
  };

  useEffect(() => {
    const modalSize = { widthVW: "30vw", heightVW: "20vw" };
    const centerPos = calculateCenterPositionVW(
      modalSize.widthVW,
      modalSize.heightVW
    );
    setPositionTaixiu(centerPos);
  }, []);

  const handleMouseDown = (e, setPosition, currentPosition) => {
    startCoords.current = { x: e.clientX, y: e.clientY };
    isDragging.current = false;

    const offsetX = e.clientX - currentPosition.x;
    const offsetY = e.clientY - currentPosition.y;

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
  const handleGameControl = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <LotteryGame />
      <div
        className={`logoPopup-container ${
          isModalOpen
            ? "hidden"
            : isActive && activeSource === "popup"
            ? "active"
            : ""
        }`}
        style={{
          positionPopup: "absolute",
          left: `${positionPopup.x}px`,
          top: `${positionPopup.y}px`,
        }}
        onClick={() => setActiveSource("popup")}
      >
        <div
          className={`logoPopup-icon mng-toggle `}
          style={{
            backgroundImage: `url(${MiniGamePopup})`,
            backgroundPosition: `-${logoPopup.x}px -${logoPopup.y}px`,
            width: `${logoPopup.width}px`,
            height: `${logoPopup.height}px`,
          }}
          onMouseDown={(e) =>
            handleMouseDown(e, setPositionPopup, positionPopup)
          }
        ></div>
        <div className="button-close">
          <i className="fa-solid fa-x"></i>
        </div>
        <li style={{ "--i": 0 }}>
          <div
            className="taixiu-logo"
            style={{
              backgroundImage: `url(${MiniGamePopup})`,
              backgroundPosition: `-${logoTaixiu.x}px -${logoTaixiu.y}px`,
              width: `${logoTaixiu.width}px`,
              height: `${logoTaixiu.height}px`,
            }}
            onClick={handleGameControl}
          ></div>
        </li>
        <li style={{ "--i": 1 }}>
          <div
            className="xocdia-logo"
            style={{
              backgroundImage: `url(${MiniGamePopup})`,
              backgroundPosition: `-${logoXocdia.x}px -${logoXocdia.y}px`,
              width: `${logoXocdia.width}px`,
              height: `${logoXocdia.height}px`,
              transform: "rotate(-60deg)",
            }}
          ></div>
        </li>
        <li style={{ "--i": 2 }}>
          <div
            className="baucua-logo"
            style={{
              backgroundImage: `url(${MiniGamePopup})`,
              backgroundPosition: `-${logoBaucua.x}px -${logoBaucua.y}px`,
              width: `${logoBaucua.width}px`,
              height: `${logoBaucua.height}px`,
              transform: "rotate(-120deg)",
            }}
          ></div>
        </li>
        <li style={{ "--i": 3 }}>
          <div
            style={{
              backgroundImage: `url(${MiniGamePopup})`,
              backgroundPosition: `-${comingSoon.x}px -${comingSoon.y}px`,
              width: `${comingSoon.width}px`,
              height: `${comingSoon.height}px`,
              transform: "rotate(180deg)",
            }}
          ></div>
        </li>
        <li style={{ "--i": 4 }}>
          <div
            style={{
              backgroundImage: `url(${MiniGamePopup})`,
              backgroundPosition: `-${comingSoon.x}px -${comingSoon.y}px`,
              width: `${comingSoon.width}px`,
              height: `${comingSoon.height}px`,
              transform: "rotate(120deg)",
            }}
          ></div>
        </li>
        <li style={{ "--i": 5 }}>
          <div
            style={{
              backgroundImage: `url(${MiniGamePopup})`,
              backgroundPosition: `-${comingSoon.x}px -${comingSoon.y}px`,
              width: `${comingSoon.width}px`,
              height: `${comingSoon.height}px`,
              transform: "rotate(60deg)",
            }}
          ></div>
        </li>
      </div>

      {isModalOpen && (
        <div className="game-container">
          <div
            className="game-wrapper"
            style={{
              positionPopup: "fixed",
              left: `${positionTaixiu.x}px`,
              top: `${positionTaixiu.y}px`,
            }}
            onMouseDown={(e) =>
              handleMouseDown(e, setPositionTaixiu, positionTaixiu)
            }
            onClick={() => setActiveSource("modal")}
          >
            <TaixiuMini title="" onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Minigame;
