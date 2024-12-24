import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "../src/component/pages/homepage.jsx";
import Minigame from "../src/component/popup/minigame.jsx";
import TaixiuMini from "./component/listgame/taixiu/taixiumini.jsx";
import XocdiaMini from "./component/listgame/xocdia/xocdiamini.jsx";
import BaucuaMini from "./component/listgame/baucua/baucua.jsx";
import SideBar from "./component/nav/sidebar.jsx";
import NavBar from "./component/nav/navbar.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Homepage />
      {/* <SideBar /> */}
      {/* <Homepage /> */}
      <Minigame />
      {/* <TaixiuMini /> */}
      {/* <XocdiaMini /> */}
      {/* <BaucuaMini /> */}
    </div>
  );
}

export default App;
