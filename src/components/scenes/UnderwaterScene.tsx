"use client";

import React, { useState, useEffect, useContext } from "react";
import hookImg from "@/assets/images/hook.png";
import Fish from "@/components/fish";

import githubIcon from "@/assets/icons/github.png";
import cvIcon from "@/assets/icons/cv.png";
import contactIcon from "@/assets/icons/contact.png";
import trophyIcon from "@/assets/icons/trophy.png";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import { CaughtFishContext, FishData } from "@/context/CaughtFishContext";

export default function UnderwaterScene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lineStartX, setLineStartX] = useState(window.innerWidth * 0.23);
  const [caughtFish, setCaughtFish] = useState<string | null>(null);

  const { addCaughtFish } = useContext(CaughtFishContext);

  // Track mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate line start horizontally
  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      setLineStartX((prev) => {
        if (prev > window.innerWidth * 0.28) direction = -1;
        if (prev < window.innerWidth * 0.18) direction = 1;
        return prev + direction * 1;
      });
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Fish appear one by one with random delay
  const fishData: FishData[] = [
    { icon: githubIcon.src, label: "Projects" },
    { icon: cvIcon.src, label: "CV" },
    { icon: contactIcon.src, label: "Contact" },
    { icon: trophyIcon.src, label: "Achievements" },
  ];
  const fishMovement = [
    { dir: "left" as const, speed: 0.5 },
    { dir: "right" as const, speed: 0.7 },
    { dir: "left" as const, speed: 0.6 },
    { dir: "right" as const, speed: 0.4 },
  ];

  const [showFish, setShowFish] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    fishData.forEach((_, i) => {
      const randomDelay = Math.random() * 4000 + 2500; // 2.5 - 6.5s
      setTimeout(() => {
        setShowFish((prev) => {
          const copy = [...prev];
          copy[i] = true;
          return copy;
        });
      }, i * randomDelay);
    });
  }, []);

  const hookOffset = { x: 10, y: -10 };

  // Handle catching fish
  const handleCaught = (fish: FishData, index: number) => {
    setCaughtFish(fish.label); // show dialog
    setShowFish((prev) => {
      const copy = [...prev];
      copy[index] = false; // hide fish from underwater
      return copy;
    });
    addCaughtFish(fish); // store globally for trophy room
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "1fr",
        gridTemplateColumns: "1fr",
        cursor: "none",
      }}
    >
      {/* Underwater video */}
      <video
        src="/videos/underwater.mp4"
        autoPlay
        loop
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          gridRow: 1,
          gridColumn: 1,
        }}
      />

      {/* Fishing line */}
      <svg
        style={{
          gridRow: 1,
          gridColumn: 1,
          pointerEvents: "none",
          position: "relative",
        }}
        width="100%"
        height="100%"
      >
        <line
          x1={lineStartX}
          y1={0}
          x2={mousePos.x + hookOffset.x}
          y2={mousePos.y + hookOffset.y}
          stroke="white"
          strokeWidth={2}
        />
      </svg>

      {/* Hook */}
      <img
        src={hookImg.src}
        alt="fishing hook"
        style={{
          width: "50px",
          height: "50px",
          transform: "translate(-50%, -50%)",
          gridRow: 1,
          gridColumn: 1,
          justifySelf: "start",
          alignSelf: "start",
          pointerEvents: "none",
          marginLeft: `${mousePos.x}px`,
          marginTop: `${mousePos.y}px`,
        }}
      />

      {/* Fish */}
      {fishData.map((fish, i) =>
        showFish[i] ? (
          <Fish
            key={i}
            icon={fish.icon}
            label={fish.label}
            initialDirection={fishMovement[i].dir}
            speed={fishMovement[i].speed}
            hookPos={{ x: mousePos.x + hookOffset.x, y: mousePos.y + hookOffset.y }}
            onCaught={() => handleCaught(fish, i)}
          />
        ) : null
      )}

      {/* Dialog popup */}
      <Dialog open={!!caughtFish} onOpenChange={() => setCaughtFish(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{caughtFish}</DialogTitle>
            <DialogDescription>
              {caughtFish === "Projects" && "This is my GitHub Projects section."}
              {caughtFish === "CV" && "Here is my CV with all my experience."}
              {caughtFish === "Contact" && "Reach out to me via this contact info."}
              {caughtFish === "Achievements" && "Check out my key accomplishments."}
            </DialogDescription>
          </DialogHeader>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
