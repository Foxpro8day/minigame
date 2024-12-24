import "./sidebar.scss";
import logo8day from "../assets/logo8day.gif";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setIsMobile(currentWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className={`sidebar `}>
        <div className="logo">
          <span className="image">
            <img src={logo8day} alt="logo8day" />
          </span>
          <div className="text header-text">
            <span className={`header-title ${isMobile ? "hidden" : ""}`}>
              Game mini
            </span>
          </div>
        </div>
        <div className="menu-bar">
          <div className="menu">
            <input type="search" placeholder="Search..." />
            <ul className="menu-link">
              <li className="nav-link">
                <a href="#" className="text-white">
                  <i class="fa-solid fa-house"></i>
                  <span
                    className={`text nav-text ms-2 ${isMobile ? "hidden" : ""}`}
                  >
                    Dashboard
                  </span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#" className="text-white">
                  <i class="fa-solid fa-dice"></i>
                  <span
                    className={`text nav-text ms-2 ${isMobile ? "hidden" : ""}`}
                  >
                    Tài xỉu mini
                  </span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#" className="text-white">
                  <i class="fa-solid fa-circle"></i>
                  <span className={`text nav-text ms-2 ${isMobile ? "hidden" : ""}`}>Xóc dĩa mini</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
