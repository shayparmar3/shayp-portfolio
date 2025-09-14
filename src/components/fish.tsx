import React, { useEffect, useRef, useState } from "react";

interface FishProps {
  icon: string;
  label: string;
  initialDirection: "left" | "right";
  speed: number;
  hookPos?: { x: number; y: number };
  onCaught?: () => void;
}

export default function Fish({ icon, label, initialDirection, speed, onCaught }: FishProps) {
  const fishRef = useRef<HTMLImageElement>(null);
  const [visible, setVisible] = useState(false);

  const pos = useRef({
    x: initialDirection === "left" ? -100 : window.innerWidth + 100,
    y: Math.random() * 300 + 100,
    dir: initialDirection === "left" ? 1 : -1,
    baseY: 0,
    amplitude: 20,
    verticalSpeed: Math.random() * 0.5 + 0.1,
    phase: Math.random() * Math.PI * 2,
    entryTargetX:
      initialDirection === "left"
        ? Math.random() * (window.innerWidth * 0.6) + window.innerWidth * 0.1
        : Math.random() * (window.innerWidth * 0.6) + window.innerWidth * 0.1,
    entryDone: false,
  });

  // Random spawn delay
  useEffect(() => {
    const randomDelay = Math.random() * 4000 + 2500;
    const timer = setTimeout(() => setVisible(true), randomDelay);
    return () => clearTimeout(timer);
  }, []);

  // Movement animation
  useEffect(() => {
    if (!visible) return;
    pos.current.baseY = pos.current.y;
    let animationFrameId: number;

    const animate = () => {
      if (!pos.current.entryDone) {
        const dx = pos.current.entryTargetX - pos.current.x;
        if (Math.abs(dx) < speed) pos.current.entryDone = true;
        else pos.current.x += pos.current.dir * speed;
      } else {
        pos.current.x += pos.current.dir * speed;
        if (pos.current.x > window.innerWidth - 100) pos.current.dir = -1;
        if (pos.current.x < 0) pos.current.dir = 1;
      }

      const elapsed = performance.now() / 1000;
      pos.current.y =
        pos.current.baseY +
        Math.sin(elapsed * pos.current.verticalSpeed * 2 * Math.PI + pos.current.phase) *
          pos.current.amplitude;

      if (fishRef.current) {
        fishRef.current.style.left = `${pos.current.x}px`;
        fishRef.current.style.top = `${pos.current.y}px`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [visible, speed]);

  if (!visible) return null;

  return (
    <img
      ref={fishRef}
      src={icon}
      alt={label}
      onClick={onCaught} // <-- This ensures the entire fish is clickable
      style={{
        position: "absolute",
        width: 80,
        height: 80,
        cursor: "pointer",
        userSelect: "none",
      }}
    />
  );
}
