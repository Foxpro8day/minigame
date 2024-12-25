import "./minigame.scss";
import { useState, useRef, useEffect } from "react";
import TaixiuMini from "../listgame/taixiu/taixiumini";
import useIsMobile from "../utils/useIsMobile";
import {
  LogoPopup,
  TaixiuLogo,
  XocdiaLogo,
  BaucuaLogo,
  ComingSoonLogo,
} from "../graphic/popupGraphic";

const Minigame = () => {
  const isMobile = useIsMobile();
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

  const calculateCenterPosition = (width, height) => {
    const centerX = window.innerWidth / 2 - width / 2;
    const centerY = window.innerHeight / 2 - height / 2;

    return { x: centerX, y: centerY };
  };
  useEffect(() => {
    const modalSize = { width: 890, height: 540 };
    const centerPos = calculateCenterPosition(
      modalSize.width,
      modalSize.height
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

  // tính năng chạm kéo thả
  const handleTouchStart = (e, setPosition, currentPosition) => {
    const touch = e.touches[0]; // Lấy tọa độ touch đầu tiên
    startCoords.current = { x: touch.clientX, y: touch.clientY };
    isDragging.current = false;

    const offsetX = touch.clientX - currentPosition.x;
    const offsetY = touch.clientY - currentPosition.y;

    disableScroll(); // Chặn cuộn khi bắt đầu kéo

    const moveHandler = (moveEvent) => {
      const moveTouch = moveEvent.touches[0];
      const dx = moveTouch.clientX - startCoords.current.x;
      const dy = moveTouch.clientY - startCoords.current.y;

      // Ngưỡng phân biệt tap và drag
      const dragThreshold = 10;

      if (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold) {
        isDragging.current = true;
        const newX = moveTouch.clientX - offsetX;
        const newY = moveTouch.clientY - offsetY;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleTouchEnd = (endEvent) => {
      const touch = endEvent.changedTouches[0];
      const dx = touch.clientX - startCoords.current.x;
      const dy = touch.clientY - startCoords.current.y;
      enableScroll(); // Bật lại cuộn khi kết thúc kéo

      // Kiểm tra tap khi di chuyển rất ít
      const dragThreshold = 10;

      if (Math.abs(dx) < dragThreshold && Math.abs(dy) < dragThreshold) {
        console.log("Tap detected!");
        handleTap();
      }

      document.removeEventListener("touchmove", moveHandler);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", moveHandler, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };
  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  // Xử lý khi chạm (tap)
  const handleTap = () => {
    setActiveSource("popup");
  };

  const handleTapTaiXiu = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isMobile ? (
        <>
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
            <LogoPopup
              scale="0.2"
              onMouseDown={(e) =>
                handleMouseDown(e, setPositionPopup, positionPopup)
              }
              onTouchStart={(e) =>
                handleTouchStart(e, setPositionPopup, positionPopup)
              }
            />
            <div className="button-close">
              <i className="fa-solid fa-x"></i>
            </div>
            <li style={{ "--i": 0 }}>
              <TaixiuLogo
                scale="0.3"
                onClick={handleGameControl}
                onTouchEnd={(e) => handleTapTaiXiu()}
              />
            </li>
            <li style={{ "--i": 1 }}>
              <XocdiaLogo scale="0.3" />
            </li>
            <li style={{ "--i": 2 }}>
              <BaucuaLogo scale="0.3" />
            </li>
            <li style={{ "--i": 3 }}>
              <ComingSoonLogo scale="0.3" transform="rotate(180deg)" />
            </li>
            <li style={{ "--i": 4 }}>
              <ComingSoonLogo scale="0.3" transform="rotate(120deg)" />
            </li>
            <li style={{ "--i": 5 }}>
              <ComingSoonLogo scale="0.3" transform="rotate(60deg)" />
            </li>
          </div>

          {isModalOpen && (
            <div className="game-container">
              <div
                className="game-wrapper"
                style={{
                  positionPopup: "fixed",
                  left: positionTaixiu.x,
                  top: positionTaixiu.y,
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
      ) : (
        <>
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
            <LogoPopup
              onMouseDown={(e) =>
                handleMouseDown(e, setPositionPopup, positionPopup)
              }
            />
            <div className="button-close">
              <i className="fa-solid fa-x"></i>
            </div>
            <li style={{ "--i": 0 }}>
              <TaixiuLogo onClick={handleGameControl} />
            </li>
            <li style={{ "--i": 1 }}>
              <XocdiaLogo />
            </li>
            <li style={{ "--i": 2 }}>
              <BaucuaLogo />
            </li>
            <li style={{ "--i": 3 }}>
              <ComingSoonLogo transform="rotate(180deg)" />
            </li>
            <li style={{ "--i": 4 }}>
              <ComingSoonLogo transform="rotate(120deg)" />
            </li>
            <li style={{ "--i": 5 }}>
              <ComingSoonLogo transform="rotate(60deg)" />
            </li>
          </div>

          {isModalOpen && (
            <div className="game-container">
              <div
                className="game-wrapper"
                style={{
                  positionPopup: "fixed",
                  left: positionTaixiu.x,
                  top: positionTaixiu.y,
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
      )}
    </>
  );
};

export default Minigame;
