import React, { useState, useEffect } from 'react';

const TypingText = ({
  texts = [],
  typingSpeed = 100,
  deletingSpeed = 50,
  pause = 1500,
  className = '',
  loop = true
}) => {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts.length) return;
    let timeout;
    const current = texts[index % texts.length];

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayed(current.substring(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
        }
      }, deletingSpeed);
    } else {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.substring(0, displayed.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, index, texts, typingSpeed, deletingSpeed, pause, loop]);

  return (
    <span className={className}>
      {displayed}
      <span className="blinking-cursor">|</span>
      <style>{`
        .blinking-cursor {
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          to { visibility: hidden; }
        }
      `}</style>
    </span>
  );
};

export default TypingText; 