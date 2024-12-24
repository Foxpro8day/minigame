import React, { useState, useEffect, useRef } from "react";
import "./conversation.scss"

const TypingEffect = () => {
  const typSpd = 70;
  const waitTime = 1000;
  const text = ["đây là đoạn test chat hiệu ứng 2"];
  const [currentText, setCurrentText] = useState("");
  const [mi, setMi] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const msgRef = useRef(null);
  const textRef = useRef(""); // Ref để lưu trữ text đồng bộ
  const timeoutRef = useRef(null);

  // Hàm viết chữ từng ký tự
  const writeString = (str, idx = 0) => {
    if (idx < str.length) {
      textRef.current += str[idx]; // Cập nhật trực tiếp ref
      setCurrentText(textRef.current); // Cập nhật hiển thị
      timeoutRef.current = setTimeout(() => writeString(str, idx + 1), typSpd);
    } else {
      timeoutRef.current = setTimeout(() => slowlyDelete(), waitTime);
    }
  };

  // Hàm xóa chữ từng ký tự
  const deleteString = () => {
    textRef.current = textRef.current.substring(0, textRef.current.length - 1);
    setCurrentText(textRef.current);
    if (textRef.current.length === 0) {
      const nextMi = (mi + 1) % text.length;
      setMi(nextMi);
      writeString(text[nextMi]);
    }
  };

  // Xóa dần dần
  const slowlyDelete = () => {
    let interval = setInterval(() => {
      if (textRef.current.length > 0) {
        deleteString();
      } else {
        clearInterval(interval);
      }
    }, typSpd / 2);
  };

  // Kiểm tra phần tử có trong viewport hay không
  const checkScroll = () => {
    const rect = msgRef.current.getBoundingClientRect();
    if (rect.top <= window.innerHeight && !hasRun) {
      writeString(text[mi]);
      setHasRun(true);
    }
  };

  // Lắng nghe sự kiện cuộn trang
  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => {
      window.removeEventListener("scroll", checkScroll);
      clearTimeout(timeoutRef.current); // Xóa timeout khi component unmount
    };
  }, [hasRun]);

  return (
    <div className="msg-icn msg-icn0" ref={msgRef}>
      {currentText}
    </div>
  );
};

export default TypingEffect;

