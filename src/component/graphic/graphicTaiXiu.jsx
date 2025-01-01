import "./graphicTaiXiu.scss";
import taixiuImg from "../assets/taixiu8day.png";
import diceImg from "../assets/xucxac.png";
import AuraImg from "../assets/aura.png";
import auraButton from "../assets/aurabutton.png";
import timeCircleImg from "../assets/popupminigame.png";
import winImg from "../assets/win.png";
import loseImg from "../assets/lose.png";

//// Main tài xỉu
// Bàn chơi
const Deck = (props) => {
  const taixiuDeck = { x: 0, y: 0, width: 890, height: 540 };

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${taixiuImg})`,
        backgroundPosition: `-${taixiuDeck.x}px -${taixiuDeck.y}px`,
        width: `${taixiuDeck.width}px`,
        height: `${taixiuDeck.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// tiêu đề bàn chơi
const DeckTitle = () => {
  const deckTitle = { x: 250, y: 545, width: 360, height: 85 };

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "265px",
        backgroundImage: `url(${taixiuImg})`,
        backgroundPosition: `-${deckTitle.x}px -${deckTitle.y}px`,
        width: `${deckTitle.width}px`,
        height: `${deckTitle.height}px`,
      }}
    ></div>
  );
};
// Biểu tượng chữ x
const XIcon = (props) => {
  const xIcon = { x: 1340, y: 150, width: 50, height: 50 };

  return (
    <div
      onClick={props.onClick}
      className="closeIcon"
      style={{
        position: "absolute",
        top: "78px",
        right: "19px",
        backgroundImage: `url(${taixiuImg})`,
        backgroundPosition: `-${xIcon.x}px -${xIcon.y}px`,
        width: `${xIcon.width}px`,
        height: `${xIcon.height}px`,
      }}
    ></div>
  );
};
// Biểu tượng chữ i
const IIcon = (props) => {
  const iIcon = { x: 1343, y: 208, width: 38, height: 43 };

  return (
    <div
      onClick={props.onClick}
      className="iIcon"
      style={{
        position: "absolute",
        top: "25px",
        right: "128px",
        backgroundImage: `url(${taixiuImg})`,
        backgroundPosition: `-${iIcon.x}px -${iIcon.y}px`,
        width: `${iIcon.width}px`,
        height: `${iIcon.height}px`,
      }}
    ></div>
  );
};
// Đĩa che xúc xắc
const Disc = ({ className }) => {
  const discIcon = { x: 914, y: 140, width: 294, height: 294 };

  return (
    <div
      className={`disc ${className}`}
      style={{
        position: "absolute",
        top: "143px",
        right: "292px",
        backgroundImage: `url(${taixiuImg})`,
        backgroundPosition: `-${discIcon.x}px -${discIcon.y}px`,
        width: `${discIcon.width}px`,
        height: `${discIcon.height}px`,
      }}
    ></div>
  );
};
// Đám mây
const Cloud = () => {
  const cloudIcon = { x: 883, y: 468, width: 186, height: 84 };

  return (
    <div
      className="cloudIcon"
      style={{
        position: "absolute",
        bottom: "0px",
        right: "8px",
        backgroundImage: `url(${taixiuImg})`,
        backgroundPosition: `-${cloudIcon.x}px -${cloudIcon.y}px`,
        width: `${cloudIcon.width}px`,
        height: `${cloudIcon.height}px`,
      }}
    ></div>
  );
};
// Icon tài
const TaiIcon = (props) => {
  const taiIcon = { x: 909, y: 0, width: 170, height: 130 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        top: "140px",
        right: "100px",
        backgroundImage: `url(${taixiuImg})`,
        backgroundPosition: `-${taiIcon.x}px -${taiIcon.y}px`,
        width: `${taiIcon.width}px`,
        height: `${taiIcon.height}px`,
      }}
    ></div>
  );
};
// Aura  tài xỉu
const Aura = (props) => {
  const auraIcon = { x: 0, y: 0, width: 600, height: 590 };
  const positionStyle = props.left
    ? { left: "-120px" }
    : props.right
    ? { left: "410px" }
    : {};

  return (
    <div
      className="aura-img"
      style={{
        position: "absolute",
        top: "-90px",
        ...positionStyle,
        backgroundImage: `url(${AuraImg})`,
        backgroundPosition: `-${auraIcon.x}px -${auraIcon.y}px`,
        width: `${auraIcon.width}px`,
        height: `${auraIcon.height}px`,
        scale: "0.8",
      }}
    ></div>
  );
};
// Aura button cược
const AuraButton = (props) => {
  const auraIcon = { x: 300, y: 400, width: 260, height: 260 };
  const positionStyle = props.left
    ? { left: "50px" }
    : props.right
    ? { right: "40px" }
    : {};

  return (
    <div
      className={`aura-img ${props.className}`}
      style={{
        position: "absolute",
        top: "270px",
        ...positionStyle,
        backgroundImage: `url(${auraButton})`,
        backgroundPosition: `-${auraIcon.x}px -${auraIcon.y}px`,
        width: `${auraIcon.width}px`,
        height: `${auraIcon.height}px`,
        scale: ".5",
      }}
    ></div>
  );
};
// Icon xỉu
const XiuIcon = (props) => {
  const xiuIcon = { x: 1120, y: 0, width: 170, height: 130 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        top: "140px",
        left: "100px",
        backgroundImage: `url(${taixiuImg})`,
        backgroundPosition: `-${xiuIcon.x}px -${xiuIcon.y}px`,
        width: `${xiuIcon.width}px`,
        height: `${xiuIcon.height}px`,
      }}
    ></div>
  );
};
// Nút đặt cược
const BetButton = (props) => {
  const betArea = { x: 895, y: 590, width: 150, height: 33 };
  const positionStyle = props.left
    ? { left: "105px" }
    : props.right
    ? { right: "100px" }
    : {};

  return (
    <div
      className={`betIcon ${props.className}`}
      onClick={props.onClick}
      style={{
        position: "absolute",
        bottom: "127px",
        ...positionStyle,
        backgroundImage: `url(${taixiuImg})`,
        backgroundPosition: `-${betArea.x}px -${betArea.y}px`,
        width: `${betArea.width}px`,
        height: `${betArea.height}px`,
      }}
    ></div>
  );
};
// Bắt đầu trò chơi
const BeginButton = (props) => {
  const beginArea = { x: 0, y: 545, width: 235, height: 85 };

  return (
    <>
      <div
        className="begin"
        style={{
          position: "absolute",
          bottom: "40px",
          left: "310px",
          backgroundImage: `url(${taixiuImg})`,
          backgroundPosition: `-${beginArea.x}px -${beginArea.y}px`,
          width: `${beginArea.width}px`,
          height: `${beginArea.height}px`,
          ...props.style,
        }}
        onClick={props.onClick}
      >
        <div className="begin-text">{props.text}</div>
      </div>
    </>
  );
};
// Thông báo trò chơi
const GameNotication = (props) => {
  const beginArea = { x: 0, y: 545, width: 235, height: 85 };

  return (
    <>
      <div
        className="game-note"
        style={{
          position: "absolute",
          bottom: "40px",
          left: "310px",
          backgroundImage: `url(${taixiuImg})`,
          backgroundPosition: `-${beginArea.x}px -${beginArea.y}px`,
          width: `${beginArea.width}px`,
          height: `${beginArea.height}px`,
          ...props.style,
        }}
        onClick={props.onClick}
      >
        <div className="note-text">{props.text}</div>
      </div>
    </>
  );
};
// Khung thời gian
const TimeCircle = (props) => {
  const timeCircle = { x: 400, y: 430, width: 45, height: 45 };

  return (
    <>
      <div
        className="game-note"
        style={{
          position: "absolute",
          bottom: props.bottom,
          left: props.left,
          backgroundImage: `url(${timeCircleImg})`,
          backgroundPosition: `-${timeCircle.x}px -${timeCircle.y}px`,
          width: `${timeCircle.width}px`,
          height: `${timeCircle.height}px`,
          scale: props.scale,
        }}
      >
        <div className="countdown">{props.text}</div>
      </div>
    </>
  );
};
const LoseImg = () => {
  return (
    <div className="win">
      <img src={loseImg} />
    </div>
  );
};
const WinImg = () => {
  return (
    <div className="win">
      <img src={winImg} />
    </div>
  );
};

//// Dices
const Sf1 = ({ style }) => {
  const sf1 = { x: 1, y: 24, width: 77, height: 77 };
  return (
    <div
      className="sf1"
      style={{
        position: "absolute",
        ...style,
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sf1.x}px -${sf1.y}px`,
        width: `${sf1.width}px`,
        height: `${sf1.height}px`,
      }}
    ></div>
  );
};

const Sf2 = ({ style }) => {
  const sf2 = { x: 1, y: 104, width: 76, height: 77 };

  return (
    <div
      className="sf2"
      style={{
        position: "absolute",
        ...style,
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sf2.x}px -${sf2.y}px`,
        width: `${sf2.width}px`,
        height: `${sf2.height}px`,
      }}
    ></div>
  );
};

const Sf3 = ({ style }) => {
  const sf3 = { x: 1, y: 184, width: 76, height: 77 };

  return (
    <div
      className="sf3"
      style={{
        position: "absolute",
        ...style,
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sf3.x}px -${sf3.y}px`,
        width: `${sf3.width}px`,
        height: `${sf3.height}px`,
      }}
    ></div>
  );
};

const Sf4 = ({ style }) => {
  const sf4 = { x: 1, y: 264, width: 76, height: 77 };

  return (
    <div
      className="sf4"
      style={{
        position: "absolute",
        ...style,
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sf4.x}px -${sf4.y}px`,
        width: `${sf4.width}px`,
        height: `${sf4.height}px`,
      }}
    ></div>
  );
};

const Sf5 = ({ style }) => {
  const sf5 = { x: 1, y: 344, width: 76, height: 77 };

  return (
    <div
      className="sf5"
      style={{
        position: "absolute",
        ...style,
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sf5.x}px -${sf5.y}px`,
        width: `${sf5.width}px`,
        height: `${sf5.height}px`,
      }}
    ></div>
  );
};

const Sf6 = ({ style }) => {
  const sf6 = { x: 79, y: 24, width: 76, height: 77 };

  return (
    <div
      className="sf6"
      style={{
        position: "absolute",
        ...style,
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sf6.x}px -${sf6.y}px`,
        width: `${sf6.width}px`,
        height: `${sf6.height}px`,
      }}
    ></div>
  );
};

const SfRolling1 = () => {
  const sfRolling1 = { x: 189, y: 7, width: 97, height: 84 };

  return (
    <div
      className="sfRolling1"
      style={{
        position: "absolute",
        top: "-35px",
        left: "-50px",
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sfRolling1.x}px -${sfRolling1.y}px`,
        width: `${sfRolling1.width}px`,
        height: `${sfRolling1.height}px`,
      }}
    ></div>
  );
};

const SfRolling2 = () => {
  const sfRolling2 = { x: 192, y: 111, width: 97, height: 84 };

  return (
    <div
      className="sfRolling2"
      style={{
        position: "absolute",
        top: "-35px",
        left: "-50px",
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sfRolling2.x}px -${sfRolling2.y}px`,
        width: `${sfRolling2.width}px`,
        height: `${sfRolling2.height}px`,
      }}
    ></div>
  );
};

const SfRolling3 = () => {
  const sfRolling3 = { x: 192, y: 201, width: 97, height: 84 };

  return (
    <div
      className="sfRolling3"
      style={{
        position: "absolute",
        top: "-35px",
        left: "-50px",
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sfRolling3.x}px -${sfRolling3.y}px`,
        width: `${sfRolling3.width}px`,
        height: `${sfRolling3.height}px`,
      }}
    ></div>
  );
};

const SfRolling4 = () => {
  const sfRolling4 = { x: 192, y: 291, width: 97, height: 84 };

  return (
    <div
      className="sfRolling4"
      style={{
        position: "absolute",
        top: "-35px",
        left: "-50px",
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sfRolling4.x}px -${sfRolling4.y}px`,
        width: `${sfRolling4.width}px`,
        height: `${sfRolling4.height}px`,
      }}
    ></div>
  );
};

//// Sprite decorate
// Hoa
const Flower = () => {
  const flower = { x: 1224, y: 137, width: 110, height: 110 };

  return (
    <div
      className="flower rotating-image"
      style={{
        position: "absolute",
        top: "0px",
        left: "10px",
        backgroundImage: `url(${taixiuImg})`,
        backgroundPosition: `-${flower.x}px -${flower.y}px`,
        width: `${flower.width}px`,
        height: `${flower.height}px`,
      }}
    ></div>
  );
};
// Lồng đèn
const Lantern = () => {
  const lantern = { x: 1100, y: 425, width: 108, height: 215 };

  return (
    <div
      className="lantern shaking-image"
      style={{
        position: "absolute",
        top: "80px",
        left: "-10px",
        backgroundImage: `url(${taixiuImg})`,
        backgroundPosition: `-${lantern.x}px -${lantern.y}px`,
        width: `${lantern.width}px`,
        height: `${lantern.height}px`,
      }}
    ></div>
  );
};
// Cành mai
const Tree = () => {
  const tree = { x: 1250, y: 325, width: 140, height: 290 };

  return (
    <div
      className="canhmai scaling-rotate-image"
      style={{
        position: "absolute",
        bottom: "60px",
        right: "-60px",
        backgroundImage: `url(${taixiuImg})`,
        backgroundPosition: `-${tree.x}px -${tree.y}px`,
        width: `${tree.width}px`,
        height: `${tree.height}px`,
      }}
    ></div>
  );
};
// Bao lì xì
const RedEvt = () => {
  const redEnt = { x: 1290, y: 0, width: 110, height: 130 };

  return (
    <div
      className="lixi scaling-image"
      style={{
        position: "absolute",
        bottom: "100px",
        left: "-60px",
        backgroundImage: `url(${taixiuImg})`,
        backgroundPosition: `-${redEnt.x}px -${redEnt.y}px`,
        width: `${redEnt.width}px`,
        height: `${redEnt.height}px`,
      }}
    ></div>
  );
};

export {
  WinImg,
  LoseImg,
  TimeCircle,
  Aura,
  AuraButton,
  Deck,
  DeckTitle,
  XIcon,
  IIcon,
  Disc,
  Cloud,
  TaiIcon,
  XiuIcon,
  BetButton,
  BeginButton,
  GameNotication,
  Sf1,
  Sf2,
  Sf3,
  Sf4,
  Sf5,
  Sf6,
  SfRolling1,
  SfRolling2,
  SfRolling3,
  SfRolling4,
  Flower,
  Tree,
  Lantern,
  RedEvt,
};
