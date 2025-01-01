import "./graphicXocDia.scss";
import xocdiaImg from "../assets/8day-Minigame-Xocdia-Main.png";
import otherImg1 from "../assets/begin.png"
import otherImg2 from "../assets/replay.png"
import otherImg3 from "../assets/win.png"
import otherImg4 from "../assets/lose.png"
import khungchatmini from "../assets/khungchatmini.png";

// Bàn chơi
const XdTable = (props) => {
  const xdDeck = { x: 0, y: 0, width: 1040, height: 590 };

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdDeck.x}px -${xdDeck.y}px`,
        width: `${xdDeck.width}px`,
        height: `${xdDeck.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// thời gian
const XdTime = (props) => {
  const xdTime = { x: 1465, y: 484, width: 90, height: 90 };

  return (
    <div
      style={{
        position: "absolute",
        top: "150px",
        left: "600px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdTime.x}px -${xdTime.y}px`,
        width: `${xdTime.width}px`,
        height: `${xdTime.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// đĩa
const XdDisc = (props) => {
  const xdDisc = { x: 1150, y: 700, width: 190, height: 125 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        top: "240px",
        left: "435px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdDisc.x}px -${xdDisc.y}px`,
        width: `${xdDisc.width}px`,
        height: `${xdDisc.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// bát
const XdBowl = (props) => {
  const xdBowl = { x: 1380, y: 625, width: 220, height: 200 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        top: "140px",
        left: "462px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdBowl.x}px -${xdBowl.y}px`,
        width: `${xdBowl.width}px`,
        height: `${xdBowl.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// logo chẵn
const XdChan = (props) => {
  const xdChan = { x: 820, y: 615, width: 190, height: 110 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        top: "190px",
        left: "135px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdChan.x}px -${xdChan.y}px`,
        width: `${xdChan.width}px`,
        height: `${xdChan.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// xd1:2
const Xd12 = (props) => {
  const xd12 = { x: 880, y: 750, width: 90, height: 50 };
  const positionStyle = props.left
    ? { left: "185px" }
    : props.right
    ? { right: "0px" }
    : {};
  return (
    <div
      style={{
        position: "absolute",
        top: "300px",
        ...positionStyle,
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xd12.x}px -${xd12.y}px`,
        width: `${xd12.width}px`,
        height: `${xd12.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// logo lẻ
const XdLe = (props) => {
  const xdLe = { x: 1020, y: 615, width: 100, height: 110 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        top: "190px",
        right: "0px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdLe.x}px -${xdLe.y}px`,
        width: `${xdLe.width}px`,
        height: `${xdLe.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// xu do
const XdXudo = ({style}) => {
  const xdXudo = { x: 1100, y: 515, width: 37, height: 28 };

  return (
    <div
      className="chipred"
      style={{
        position: "absolute",
        ...style,
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdXudo.x}px -${xdXudo.y}px`,
        width: `${xdXudo.width}px`,
        height: `${xdXudo.height}px`,
        // transform: "scale(.8)",
      }}
    ></div>
  );
}
//xu trang
const XdXutrang = ({style}) => {
  const xdXutrang = { x: 1067, y: 515, width: 37, height: 28 };

  return (
    <div
      className="chipwhite"
      style={{
        position: "absolute",
        ...style,
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdXutrang.x}px -${xdXutrang.y}px`,
        width: `${xdXutrang.width}px`,
        height: `${xdXutrang.height}px`,
        // transform: 'scale(.8)'
      }}
    ></div>
  );
};
// dấu thoát
const XdX = (props) => {
  const xdX = { x: 1085, y: 105, width: 80, height: 80 };

  return (
    <div
      onClick={props.onClick}
      style={{
        position: "absolute",
        top: "90px",
        right: "-150px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdX.x}px -${xdX.y}px`,
        width: `${xdX.width}px`,
        height: `${xdX.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// dấu info
const XdI = (props) => {
  const xdI = { x: 1170, y: 105, width: 80, height: 80 };

  return (
    <div
      style={{
        position: "absolute",
        top: "90px",
        left: "20px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdI.x}px -${xdI.y}px`,
        width: `${xdI.width}px`,
        height: `${xdI.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// phát sáng chẵn
const XdChanAura = (props) => {
  const xdChanAura = { x: 40, y: 610, width: 370, height: 240 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        top: "135px",
        left: "49px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdChanAura.x}px -${xdChanAura.y}px`,
        width: `${xdChanAura.width}px`,
        height: `${xdChanAura.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// phát sáng lẻ
const XdLeAura = (props) => {
  const xdLeAura = { x: 430, y: 610, width: 370, height: 240 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        top: "135px",
        right: "-125px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdLeAura.x}px -${xdLeAura.y}px`,
        width: `${xdLeAura.width}px`,
        height: `${xdLeAura.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// phát sáng 4 đỏ
const XdAura4Red = (props) => {
  const xdAura4Red = { x: 30, y: 864, width: 255, height: 200 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        top: "-25px",
        left: "-65px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdAura4Red.x}px -${xdAura4Red.y}px`,
        width: `${xdAura4Red.width}px`,
        height: `${xdAura4Red.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// phát sáng 3 đỏ
const XdAura3Red = (props) => {
  const xdAura3Red = { x: 300, y: 864, width: 255, height: 200 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        top: "-25px",
        left: "-52px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdAura3Red.x}px -${xdAura3Red.y}px`,
        width: `${xdAura3Red.width}px`,
        height: `${xdAura3Red.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// phát sáng 3 trắng
const XdAura3White = (props) => {
  const xdAura3White = { x: 300, y: 864, width: 255, height: 200 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        top: "-25px",
        left: "-52px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdAura3White.x}px -${xdAura3White.y}px`,
        width: `${xdAura3White.width}px`,
        height: `${xdAura3White.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// phát sáng 4 trắng
const XdAura4White = (props) => {
  const xdAura4White = { x: 810, y: 864, width: 255, height: 200 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        top: "-25px",
        left: "-44px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdAura4White.x}px -${xdAura4White.y}px`,
        width: `${xdAura4White.width}px`,
        height: `${xdAura4White.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// win
const XdWin = () => {
    return (
    <div className="xd-win">
      <img src={otherImg3} />
    </div>
  );
};
//lose
const XdLose = () => {
  return (
    <div className="xd-win">
      <img src={otherImg4} />
    </div>
  );
};
//bat dau
const XdBegin = () => {
  return (
    <div className="xd-begin">
      <img  src={otherImg1}/>
    </div>
  )
}
//choi lai
const XdReplay = () => {
  return (
    <div className="xd-begin">
      <img src={otherImg2} />
    </div>
  );
};
//khung chat
const XdChat = (props) => {
  return (
    <div className="xd-chat">
      <img src={khungchatmini} />
      <div className="xd-text">{props.text}</div>
    </div>
  );
}

// Sprites decorate
// lồng đèn
const XdLantern = (props) => {
  const xdLantern = { x: 1080, y: 200, width: 130, height: 160 };

  return (
    <div
      className="xd-lantern"
      style={{
        position: "absolute",
        top: "150px",
        left: "-70px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdLantern.x}px -${xdLantern.y}px`,
        width: `${xdLantern.width}px`,
        height: `${xdLantern.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};
// cành mai
const XdMai = (props) => {
  const xdMai = { x: 1088, y: 397, width: 205, height: 90 };

  return (
    <div
      className="xd-mai"
      style={{
        position: "absolute",
        top: "520px",
        left: "0px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdMai.x}px -${xdMai.y}px`,
        width: `${xdMai.width}px`,
        height: `${xdMai.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};

// Bánh chưng
const Xdbanhchung = (props) => {
  const xdbanhchung = { x: 1215, y: 230, width: 150, height: 120 };

  return (
    <div
      className="xd-banhchung"
      style={{
        position: "absolute",
        top: "520px",
        right: "-150px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdbanhchung.x}px -${xdbanhchung.y}px`,
        width: `${xdbanhchung.width}px`,
        height: `${xdbanhchung.height}px`,
        scale: props.scale,
      }}
    ></div>
  );
};

// cành đào
const XdCanhdao = (props) => {
  const xdCanhdao = { x: 1370, y: 225, width: 170, height: 255 };

  return (
    <div
      className="xd-canhdao"
      style={{
        position: "absolute",
        top: "280px",
        right: "-250px",
        backgroundImage: `url(${xocdiaImg})`,
        backgroundPosition: `-${xdCanhdao.x}px -${xdCanhdao.y}px`,
        width: `${xdCanhdao.width}px`,
        height: `${xdCanhdao.height}px`,
        transform: "rotate(-10deg)",
        scale: props.scale,
      }}
    ></div>
  );
};

export {
  XdTable,
  XdTime,
  XdDisc,
  XdBowl,
  XdChan,
  Xd12,
  XdLe,
  XdXudo,
  XdXutrang,
  XdWin,
  XdLose,
  XdBegin,
  XdReplay,
  XdX,
  XdI,
  XdChat,
  XdChanAura,
  XdLeAura,
  XdAura4Red,
  XdAura3Red,
  XdAura3White,
  XdAura4White,
  XdLantern,
  XdMai,
  Xdbanhchung,
  XdCanhdao,
};
