import React, { createContext, useContext } from 'react';
import useMouseText from '@/hooks/useMouseText';

const MouseTextContext = createContext(null);

export const MouseTextProvider = ({ children }) => {
  const mouseText = useMouseText();

  return (
    <MouseTextContext.Provider value={mouseText}>
      {children}
      {mouseText.isVisible && (
        <MouseText
          text={mouseText.text}
          icon={mouseText.icon}
        />
      )}
    </MouseTextContext.Provider>
  );
};

export const useMouseTextContext = () => {
  const context = useContext(MouseTextContext);
  if (!context) {
    throw new Error('useMouseTextContext must be used within a MouseTextProvider');
  }
  return context;
};

export default MouseTextContext; 