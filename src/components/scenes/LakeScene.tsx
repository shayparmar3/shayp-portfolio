"use client";

import React from "react";
import lake from "@/assets/images/lake-background.jpg";
import fishermanSprite from "@/assets/images/fisherman.png";
import { useRouter } from "next/navigation";

export default function LakeScene() {
  const frameWidth = 48;
  const frameHeight = 48;
  const numFrames = 4;
  const scale = 3;
  const router = useRouter();

  // Adjust these to match the cabin's position on the image
  const cabinArea = {
    top: "45%",     // distance from top of lake div
    left: "65%",    // distance from left of lake div
    width: "30%",   // clickable width
    height: "50%",  // clickable height
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${lake.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "grid",
        gridTemplateRows: "1fr auto",
        gridTemplateColumns: "1fr 1fr 1fr",
        padding: "2rem",
        position: "relative", // allow absolute positioning for cabin click
      }}
    >
      <style>
        {`
          @keyframes walk {
            from { background-position: 0 0; }
            to { background-position: -${frameWidth * numFrames}px 0; }
          }
        `}
      </style>

      {/* Fisherman on left bank */}
      <div
        style={{
          gridRow: "1",
          gridColumn: "1",
          display: "flex",
          alignItems: "end",
          justifyContent: "flex-end",
          paddingRight: "1rem",
        }}
      >
        <div
          style={{
            width: `${frameWidth * scale}px`,
            height: `${frameHeight * scale}px`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${frameWidth * numFrames}px`,
              height: `${frameHeight}px`,
              backgroundImage: `url(${fishermanSprite.src})`,
              backgroundRepeat: "no-repeat",
              animation: `walk 1s steps(${numFrames}) infinite`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          ></div>
        </div>
      </div>

      {/* Instructions bottom center */}
      {/* <div
        style={{
          gridRow: "2",
          gridColumn: "2",
          color: "white",
          fontSize: "1.5rem",
          background: "rgba(0,0,0,0.5)",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          justifySelf: "center",
        }}
      >
        Press any key to cast your line 🎣
      </div> */}

      {/* Invisible clickable area over cabin */}
      <div
        onClick={() => router.push("/trophy-room")}
        style={{
          position: "absolute",
          top: cabinArea.top,
          left: cabinArea.left,
          width: cabinArea.width,
          height: cabinArea.height,
          cursor: "pointer",
          backgroundColor: "transparent", // invisible
        }}
        title="Enter Trophy Room"
      />
    </div>
  );
}
