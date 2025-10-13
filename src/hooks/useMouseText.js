import { useState, useCallback } from 'react';

const useMouseText = () => {
  const [text, setText] = useState('');
  const [icon, setIcon] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const showText = useCallback((newText, newIcon = null) => {
    setText(newText);
    setIcon(newIcon);
    setIsVisible(true);
  }, []);

  const hideText = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    text,
    icon,
    isVisible,
    showText,
    hideText
  };
};

export default useMouseText; 