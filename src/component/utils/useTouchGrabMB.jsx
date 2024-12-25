import { useState, useRef, useEffect, useCallback } from "react";

const useTouchGrabMB = (onTap, elements, threshold = 10) => {
  const [positions, setPositions] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const startCoords = useRef({});
  const dragDistance = useRef({});
  const currentDraggingId = useRef(null);

  // Khởi tạo vị trí trung tâm ban đầu
  useEffect(() => {
    const initialPositions = elements.reduce((acc, { id, width, height }) => {
      acc[id] = {
        x: (window.innerWidth - width) / 2,
        y: (window.innerHeight - height) / 2,
      };
      return acc;
    }, {});
    setPositions(initialPositions);
  }, [elements]);

  // Xử lý kéo
  const handleTouchMove = useCallback(
    (e) => {
      const id = currentDraggingId.current;
      if (!id || !startCoords.current[id]) return;

      const touch = e.touches[0];
      const dx = touch.clientX - startCoords.current[id].x;
      const dy = touch.clientY - startCoords.current[id].y;

      dragDistance.current[id] += Math.sqrt(dx * dx + dy * dy);

      if (dragDistance.current[id] > threshold) {
        setIsDragging(true);

        // Tính toán giới hạn kéo
        setPositions((prev) => {
          const element = elements.find((el) => el.id === id);
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;

          const newX = Math.max(
            0,
            Math.min(prev[id].x + dx, windowWidth - element.width)
          );
          const newY = Math.max(
            0,
            Math.min(prev[id].y + dy, windowHeight - element.height)
          );

          return { ...prev, [id]: { x: newX, y: newY } };
        });

        // Cập nhật điểm bắt đầu để kéo mượt hơn
        startCoords.current[id] = { x: touch.clientX, y: touch.clientY };
      }
    },
    [elements, threshold]
  );

  // Kết thúc kéo
  const handleTouchEnd = useCallback(() => {
    const id = currentDraggingId.current;
    if (!id) return;

    if (!isDragging && dragDistance.current[id] < threshold) {
      onTap(id); // Nếu không kéo đủ khoảng cách thì coi là tap
    }

    setIsDragging(false);
    dragDistance.current[id] = 0;
    currentDraggingId.current = null;

    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
    document.body.style.overflow = ""; // Bật cuộn lại sau khi kéo xong
  }, [onTap, isDragging, handleTouchMove, threshold]);

  // Bắt đầu thao tác kéo
  const handleTouchStart = (e, id) => {
    const touch = e.touches[0];
    startCoords.current[id] = { x: touch.clientX, y: touch.clientY };
    dragDistance.current[id] = 0;
    setIsDragging(false);
    currentDraggingId.current = id;

    document.body.style.overflow = "hidden"; // Ngăn cuộn khi kéo
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  return {
    positions,
    isDragging,
    handleTouchStart,
  };
};

export default useTouchGrabMB;
