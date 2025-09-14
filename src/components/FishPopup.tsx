import React, { useEffect, useState } from "react";

interface FishPopupProps {
  label: string;
  onClose?: () => void;
}

export default function FishPopup({ label, onClose }: FishPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 2500); // popup visible for 2.5s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(255, 255, 255, 0.9)",
        color: "#000",
        padding: "0.5rem 1rem",
        borderRadius: "999px",
        fontWeight: "bold",
        fontSize: "1rem",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s, transform 0.5s",
        transformOrigin: "center bottom",
        pointerEvents: "none",
      }}
    >
      {label}
    </div>
  );
}
