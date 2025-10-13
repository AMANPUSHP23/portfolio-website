import { useState, useEffect, useCallback } from 'react';

const useMousePosition = (options = {}) => {
  const {
    throttle = 16, // ~60fps
    enabled = true,
    bounds = null // Optional bounds element
  } = options;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const getPositionFromEvent = useCallback((event) => {
    if (bounds) {
      const rect = bounds.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
    return {
      x: event.clientX,
      y: event.clientY
    };
  }, [bounds]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    let timeoutId;
    let lastPosition = { x: 0, y: 0 };
    let lastTime = Date.now();
    let rafId;

    const handleMouseMove = (event) => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime;
        const currentPosition = getPositionFromEvent(event);

        // Calculate direction
        const newDirection = {
          x: Math.sign(currentPosition.x - lastPosition.x),
          y: Math.sign(currentPosition.y - lastPosition.y)
        };

        // Calculate velocity (pixels per millisecond)
        const newVelocity = {
          x: (currentPosition.x - lastPosition.x) / deltaTime,
          y: (currentPosition.y - lastPosition.y) / deltaTime
        };

        // Use requestAnimationFrame for smooth updates
        rafId = requestAnimationFrame(() => {
          setPosition(currentPosition);
          setDirection(newDirection);
          setVelocity(newVelocity);
          setIsMoving(true);
        });

        lastPosition = currentPosition;
        lastTime = currentTime;
        timeoutId = null;
      }, throttle);
    };

    const handleMouseStop = () => {
      setIsMoving(false);
      setVelocity({ x: 0, y: 0 });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsMoving(false);
      setVelocity({ x: 0, y: 0 });
    };

    let stopTimeout;
    const handleMouseMoveWithStop = (event) => {
      handleMouseMove(event);
      clearTimeout(stopTimeout);
      stopTimeout = setTimeout(handleMouseStop, 100);
    };

    const target = bounds || window;
    target.addEventListener('mousemove', handleMouseMoveWithStop, { passive: true });
    target.addEventListener('mouseenter', handleMouseEnter);
    target.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      target.removeEventListener('mousemove', handleMouseMoveWithStop);
      target.removeEventListener('mouseenter', handleMouseEnter);
      target.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutId) clearTimeout(timeoutId);
      if (stopTimeout) clearTimeout(stopTimeout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [throttle, enabled, bounds, getPositionFromEvent]);

  return {
    position,
    isMoving,
    direction,
    velocity,
    isHovering,
    // Normalized position (0-1) relative to window size
    normalized: {
      x: position.x / (bounds ? bounds.offsetWidth : window.innerWidth),
      y: position.y / (bounds ? bounds.offsetHeight : window.innerHeight)
    }
  };
};

export default useMousePosition; 