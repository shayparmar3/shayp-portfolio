"use client";

import React, { useState, useEffect } from "react";
import LakeScene from "@/components/scenes/LakeScene";
import UnderwaterScene from "@/components/scenes/UnderwaterScene";

export default function App() {
  const [scene, setScene] = useState<"lake" | "underwater">("lake");
  const [overlayActive, setOverlayActive] = useState(false);
  const [hasCasted, setHasCasted] = useState(false);

  // Handle first cast via keypress and subsequent arrow navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!hasCasted) {
        // First-ever cast: any key triggers underwater
        setHasCasted(true);
        startTransition("underwater");
      } else {
        // Only allow ArrowUp/ArrowDown after first cast
        if (e.key === "ArrowUp" && scene === "underwater") {
          startTransition("lake");
        } else if (e.key === "ArrowDown" && scene === "lake") {
          startTransition("underwater");
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [hasCasted, scene]);

  // Handle scroll transitions after first cast
  useEffect(() => {
    if (!hasCasted) return;

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault(); // prevent default page scrolling
      if (overlayActive) return; // ignore if mid-transition

      if (e.deltaY > 0 && scene === "lake") {
        startTransition("underwater");
      } else if (e.deltaY < 0 && scene === "underwater") {
        startTransition("lake");
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [hasCasted, scene, overlayActive]);

  // Transition handler
  const startTransition = (targetScene: "lake" | "underwater") => {
    setOverlayActive(true);
    setTimeout(() => {
      setScene(targetScene);
      setOverlayActive(false);
    }, 500); // 0.5s black overlay
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "1fr",
        gridTemplateColumns: "1fr",
        overflow: "hidden", // ensure nothing scrolls outside
      }}
    >
      {/* Scene layers */}
      <div style={{ gridRow: 1, gridColumn: 1 }}>
        {scene === "lake" && <LakeScene />}
        {scene === "underwater" && <UnderwaterScene />}
      </div>

      {/* Black overlay for transitions */}
      <div
        style={{
          gridRow: 1,
          gridColumn: 1,
          width: "100%",
          height: "100%",
          background: "black",
          opacity: overlayActive ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </div>
  );
}
