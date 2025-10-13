import React from "react";
import { Particles } from "@tsparticles/react";

export default function AboutParticles() {
  return (
    <Particles
      id="about-particles"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: { events: { resize: true } },
        particles: {
          color: { value: ["#38bdf8", "#a21caf", "#f472b6", "#facc15"] },
          links: { enable: false },
          move: { enable: true, speed: 0.6, random: true },
          number: { value: 18, density: { enable: true, area: 900 } },
          opacity: { value: { min: 0.15, max: 0.35 } },
          shape: { type: "circle" },
          size: { value: { min: 4, max: 18 }, animation: { enable: true, speed: 2, minimumValue: 4, sync: false } },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none"
      }}
    />
  );
}
