import React from "react";
import { Particles } from "@tsparticles/react";

const HeroParticles = () => {
  return (
    <Particles
      id="tsparticles-hero"
      options={{
        fullScreen: { enable: false },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: ["bubble", "trail"] },
            onClick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            bubble: {
              distance: 140,
              size: 12,
              duration: 2,
              opacity: 1,
              color: { value: ["#38bdf8", "#a21caf", "#f472b6", "#facc15"] },
            },
            trail: {
              delay: 0.1,
              pauseOnStop: true,
              quantity: 5,
              particles: {
                color: { value: ["#38bdf8", "#a21caf", "#f472b6", "#facc15"] },
                opacity: 0.7,
                size: 6,
                move: { speed: 2, direction: "none" },
              },
            },
          },
        },
        particles: {
          color: { value: ["#38bdf8", "#a21caf", "#f472b6", "#facc15"] }, // blue, purple, pink, yellow
          links: {
            color: "#38bdf8",
            distance: 120,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          collisions: { enable: false },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: true,
            speed: 1.2,
            straight: false,
          },
          number: {
            density: { enable: true, area: 800 },
            value: 55,
          },
          opacity: {
            value: { min: 0.3, max: 0.8 },
            animation: {
              enable: true,
              speed: 1.5,
              minimumValue: 0.3,
              sync: false,
            },
          },
          shape: { type: "circle" },
          size: {
            value: { min: 2, max: 7 },
            animation: {
              enable: true,
              speed: 4,
              minimumValue: 2,
              sync: false,
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.25,
              opacity: 1,
              color: "random",
            },
          },
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
};

export default HeroParticles;
