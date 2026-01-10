"use client";
import React, { useRef, useState } from "react";

export default function AnimatedCards() {
  const [expand, setExpand] = useState(false);
  const highlightRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={highlightRef}
      className="relative mt-20 md:mt-22 flex justify-center items-center min-h-[420px]"
      onMouseEnter={() => setExpand(true)}
      onMouseLeave={() => setExpand(false)}
    >
      <div className="relative w-[1400px] h-[380px]">
        <img
          src="/creditcard/Credit card mockup.png"
          alt="Golden card"
          className="absolute drop-shadow-2xl"
          style={{
            width: "370px",
            left: "49%",
            zIndex: 10,
            transition: "transform 800ms ease-in-out",
            transform: expand
              ? "translate(-50%, -50%) translateX(-400px)"
              : "translate(-50%, -50%)",
          }}
        />

        <img
          src="/creditcard/Credit card mockup-2.png"
          alt="Green card"
          className="absolute drop-shadow-2xl"
          style={{
            width: "370px",
            left: "50%",
            zIndex: 30,
            transition: "transform 800ms ease-in-out",
            transform: "translate(-50%, -50%)",
          }}
        />

        <img
          src="/creditcard/Credit card mockup-3.png"
          alt="Purple card"
          className="absolute drop-shadow-2xl"
          style={{
            width: "370px",
            left: "51%",
            zIndex: 20,
            transition: "transform 800ms ease-in-out",
            transform: expand
              ? "translate(-50%, -50%) translateX(400px)"
              : "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}
