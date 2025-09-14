"use client";

import React, { useContext } from "react";
import { CaughtFishContext } from "@/context/CaughtFishContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function TrophyRoomPage() {
  const { caughtFish } = useContext(CaughtFishContext);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        background: "#e0f7fa",
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {caughtFish.length === 0 ? (
        <p style={{ fontSize: "1.5rem", color: "#333" }}>
          You haven’t caught any fish yet! Go back to the lake and catch some.
        </p>
      ) : (
        caughtFish.map((fish, i) => (
          <Card key={i} style={{ width: "250px" }}>
            <CardHeader>
              <CardTitle>{fish.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={fish.icon}
                alt={fish.label}
                style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
              />
              <CardDescription>
                {fish.label === "Projects" &&
                  "Here are my GitHub projects that showcase my work."}
                {fish.label === "CV" && "My CV with experience and skills."}
                {fish.label === "Contact" && "Reach me via this contact info."}
                {fish.label === "Achievements" &&
                  "Key accomplishments and milestones I’ve achieved."}
              </CardDescription>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
