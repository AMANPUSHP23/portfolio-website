import confetti from 'canvas-confetti';

/**
 * Confetti utility functions for micro-interactions
 */

/**
 * Basic confetti burst
 */
export const celebrateSuccess = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

/**
 * Confetti from specific button position
 */
export const celebrateFromElement = (element) => {
  if (!element) return;
  
  const rect = element.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;
  
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x, y }
  });
};

/**
 * Continuous confetti rain
 */
export const confettiRain = (duration = 3000) => {
  const end = Date.now() + duration;
  
  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#6366f1', '#a855f7', '#ec4899']
    });
    
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#6366f1', '#a855f7', '#ec4899']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  
  frame();
};

/**
 * School pride style (side cannons)
 */
export const schoolPride = () => {
  const end = Date.now() + 2000;
  const colors = ['#6366f1', '#a855f7', '#ec4899', '#8b5cf6'];

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

/**
 * Fireworks effect
 */
export const fireworks = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    });
    
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 250);
};

/**
 * Confetti explosion
 */
export const explosion = () => {
  confetti({
    particleCount: 150,
    spread: 180,
    origin: { y: 0.6 },
    startVelocity: 45,
    ticks: 100,
    colors: ['#6366f1', '#a855f7', '#ec4899', '#8b5cf6', '#f97316']
  });
};

/**
 * Heart burst (for success or love-related actions)
 */
export const heartBurst = () => {
  const heart = confetti.shapeFromText({ text: '❤️', scalar: 2 });
  
  confetti({
    particleCount: 30,
    spread: 100,
    origin: { y: 0.6 },
    shapes: [heart],
    scalar: 2
  });
};

/**
 * Star burst
 */
export const starBurst = () => {
  const star = confetti.shapeFromText({ text: '⭐', scalar: 2 });
  
  confetti({
    particleCount: 50,
    spread: 80,
    origin: { y: 0.6 },
    shapes: [star],
    scalar: 1.5,
    startVelocity: 25
  });
};

/**
 * Snow effect
 */
export const snowEffect = (duration = 5000) => {
  const end = Date.now() + duration;
  
  const frame = () => {
    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: 200,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.1
      },
      colors: ['#ffffff'],
      shapes: ['circle'],
      gravity: 0.3,
      scalar: 0.5,
      drift: Math.random() - 0.5
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

/**
 * Realistic confetti cannon
 */
export const confettiCannon = (side = 'left') => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  const origin = side === 'left' ? { x: 0.1 } : { x: 0.9 };
  const angle = side === 'left' ? 60 : 120;

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    origin: origin,
    angle: angle
  });
  
  fire(0.2, {
    spread: 60,
    origin: origin,
    angle: angle
  });
  
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    origin: origin,
    angle: angle
  });
  
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    origin: origin,
    angle: angle
  });
  
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    origin: origin,
    angle: angle
  });
};

export default {
  celebrateSuccess,
  celebrateFromElement,
  confettiRain,
  schoolPride,
  fireworks,
  explosion,
  heartBurst,
  starBurst,
  snowEffect,
  confettiCannon
};
