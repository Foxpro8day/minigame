import React, { useState, useEffect } from "react";
import "./customCarousel.scss";

// Import hình ảnh từ thư mục assets
import img1 from "../assets/casino8day.webp";
import img2 from "../assets/gamehot8day.webp";
import img3 from "../assets/gameviet8day.webp";
import img4 from "../assets/esports8day.webp";
import img5 from "../assets/xoso8day.webp";
import img6 from "../assets/thethao8day.webp";
import img7 from "../assets/slot8day.webp";
import img8 from "../assets/banca8day.webp";

// Danh sách hình ảnh
const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const CustomCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động lướt mỗi 2 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval); // Dọn dẹp khi component bị gỡ bỏ
  }, []);

  // Lấy danh sách 5 hình hiển thị
  const getVisibleImages = () => {
    const visibleImages = [];
    for (let i = 0; i < 5; i++) {
      visibleImages.push(images[(currentIndex + i) % images.length]);
    }
    return visibleImages;
  };

  return (
    <div className="custom-carousel-container">
      <div className="custom-carousel-track">
        {getVisibleImages().map((img, i) => (
          <div className="custom-carousel-item" key={i}>
            <img src={img} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;
