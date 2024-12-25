import { useState, useEffect } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        // resize listener
        window.addEventListener('resize', handleResize)

        // dọn dẹp sự kiện khi component unmount
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    
  return isMobile
};

export default useIsMobile;
