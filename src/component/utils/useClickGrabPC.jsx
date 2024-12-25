import { useState, useRef, useEffect, useCallback } from "react";

const useClickGrabPC = (onClick, elements) => {
  const [positions, setPositions] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const startCoords = useRef({});
  const dragDistance = useRef({});
  const currentDraggingId = useRef(null);

  const DRAG_THRESHOLD = 5;

  // Tính toán vị trí trung tâm ban đầu (chỉ chạy một lần)
  useEffect(() => {
    const initialPositions = {};
    elements.forEach(({ id, width, height }) => {
      initialPositions[id] = {
        x: (window.innerWidth - width) / 2,
        y: (window.innerHeight - height) / 2,
      };
    });
    setPositions(initialPositions);
  }, []);

  // Hàm xử lý di chuyển chuột
  const handleMouseMove = useCallback(
    (e) => {
      const id = currentDraggingId.current;
      if (!id || !startCoords.current[id]) return; // Kiểm tra nếu không tồn tại thì thoát

      const dx = e.clientX - startCoords.current[id].x;
      const dy = e.clientY - startCoords.current[id].y;

      dragDistance.current[id] += Math.sqrt(dx * dx + dy * dy);

      if (dragDistance.current[id] > DRAG_THRESHOLD) {
        setIsDragging(true);
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

        startCoords.current[id] = { x: e.clientX, y: e.clientY };
      }
    },
    [elements]
  );

  const handleMouseUp = useCallback(
    (e) => {
      const id = currentDraggingId.current;
      if (!id) return;

      if (!isDragging && dragDistance.current[id] < DRAG_THRESHOLD) {
        onClick(id);
      }

      setIsDragging(false);
      dragDistance.current[id] = 0;
      currentDraggingId.current = null;

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    },
    [onClick, isDragging, handleMouseMove]
  );

  const handleMouseDown = (e, id) => {
    e.preventDefault();
    setIsDragging(false);
    startCoords.current[id] = { x: e.clientX, y: e.clientY };
    dragDistance.current[id] = 0;
    currentDraggingId.current = id;

    // Thêm sự kiện di chuyển chuột và thả chuột
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return {
    positions,
    isDragging,
    handleMouseDown,
  };
};

export default useClickGrabPC;
