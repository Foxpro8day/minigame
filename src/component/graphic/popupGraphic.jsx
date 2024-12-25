import MiniGamePopup from "../assets/8day-Minigame-Icon.png";
import "./popupGraphic.scss";

// const logoXocdia = { x: 245, y: 270, width: 137, height: 110 };
// const logoBaucua = { x: 65, y: 275, width: 145, height: 110 };
// const comingSoon = { x: 252, y: 8, width: 135, height: 100 };

//// Main popup
// Main logo
const LogoPopup = (props) => {
  const logoPopup = { x: 6, y: 12, width: 248, height: 246 };

  return (
    <div
      className={`logoPopup-icon mng-toggle `}
      style={{
        backgroundImage: `url(${MiniGamePopup})`,
        backgroundPosition: `-${logoPopup.x}px -${logoPopup.y}px`,
        width: `${logoPopup.width}px`,
        height: `${logoPopup.height}px`,
        scale: props.scale,
      }}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onTouchEnd={props.onTouchEnd}
      onTouchStart={props.onTouchStart}
      onTouchMove={props.onTouchMove}
    ></div>
  );
};

const TaixiuLogo = (props) => {
  const logoTaixiu = { x: 260, y: 125, width: 120, height: 110 };

  return (
    <div
      className="taixiu-logo"
      style={{
        scale: props.scale,
        backgroundImage: `url(${MiniGamePopup})`,
        backgroundPosition: `-${logoTaixiu.x}px -${logoTaixiu.y}px`,
        width: `${logoTaixiu.width}px`,
        height: `${logoTaixiu.height}px`,
      }}
      onClick={props.onClick}
    ></div>
  );
};

const XocdiaLogo = (props) => {
  const logoXocdia = { x: 245, y: 270, width: 137, height: 110 };

  return (
    <div
      className="xocdia-logo"
      style={{
        scale: props.scale,
        backgroundImage: `url(${MiniGamePopup})`,
        backgroundPosition: `-${logoXocdia.x}px -${logoXocdia.y}px`,
        width: `${logoXocdia.width}px`,
        height: `${logoXocdia.height}px`,
        transform: "rotate(-60deg)",
      }}
    ></div>
  );
};

const BaucuaLogo = (props) => {
  const logoBaucua = { x: 65, y: 275, width: 145, height: 110 };

  return (
    <div
      className="baucua-logo"
      style={{
        scale: props.scale,
        backgroundImage: `url(${MiniGamePopup})`,
        backgroundPosition: `-${logoBaucua.x}px -${logoBaucua.y}px`,
        width: `${logoBaucua.width}px`,
        height: `${logoBaucua.height}px`,
        transform: "rotate(-120deg)",
      }}
    ></div>
  );
};

const ComingSoonLogo = (props) => {
  const comingSoon = { x: 252, y: 8, width: 135, height: 100 };

  return (
    <div
      style={{
        scale: props.scale,
        backgroundImage: `url(${MiniGamePopup})`,
        backgroundPosition: `-${comingSoon.x}px -${comingSoon.y}px`,
        width: `${comingSoon.width}px`,
        height: `${comingSoon.height}px`,
        transform: props.transform,
      }}
    ></div>
  );
};

export { LogoPopup, TaixiuLogo, XocdiaLogo, BaucuaLogo, ComingSoonLogo };
