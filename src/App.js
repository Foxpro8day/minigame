import "./App.css";
import Homepage from "../src/component/pages/homepage.jsx";
import Minigame from "../src/component/popup/minigame.jsx";
import TaixiuMini from "./component/listgame/taixiu/taixiumini.jsx";
import XocdiaMini from "./component/listgame/xocdia/xocdiamini.jsx";
import BaucuaMini from "./component/listgame/baucua/baucua.jsx"
function App() {
  return (
    <div className="App">
      <Homepage />
      <Minigame />
      {/* <TaixiuMini /> */}
      {/* <XocdiaMini /> */}
      <BaucuaMini />
    </div>
  );
}

export default App;
