import "./homepage.scss";
import banner from "../assets/baner.webp";
import logomini from "../assets/logomini8day.webp";
import hddk from "../assets/huongdandangky8day.webp";
import hdnt from "../assets/huongdannaptien8day.webp";
import hdrt from "../assets/huongdanrutien8day.webp";
import hdta from "../assets/huongdantaiapp8day.webp";
import CustomCarousel from "../carousel/customCarousel";

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="section1">
        <img src={banner} alt="banner8day" className="imgBanner" />
      </div>
      <div className="section2">
        <div className="title-s2">
          <span className="title-text">Hướng dẫn tham gia nhà cái 8day</span>
        </div>
        <div className="body-s2">
          <div className="body1">
            <div className="body1-item">
              <img src={logomini} alt="logomini8day" className="logomini" />
              <span className="item-text">hướng dẫn đăng ký</span>
              <img src={hddk} alt="huongdandangky8day" className="tut-reg" />
            </div>
            <div className="body1-item">
              <img src={logomini} alt="logomini8day" className="logomini" />
              <span className="item-text">hướng dẫn nạp tiền</span>
              <img src={hdnt} alt="huongdandangky8day" className="tut-reg" />
            </div>
            <div className="body1-item">
              <img src={logomini} alt="logomini8day" className="logomini" />
              <span className="item-text">hướng dẫn rút tiền</span>
              <img src={hdrt} alt="huongdandangky8day" className="tut-reg" />
            </div>
            <div className="body1-item">
              <img src={logomini} alt="logomini8day" className="logomini" />
              <span className="item-text">hướng dẫn tải app</span>
              <img src={hdta} alt="huongdandangky8day" className="tut-reg" />
            </div>
          </div>
          
          <div className="body2">
            <CustomCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
