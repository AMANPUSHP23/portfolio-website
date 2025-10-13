
import React, { useState, useEffect, useRef } from 'react';

const useScrollSpy = (sectionIds, options) => {
  const [activeSection, setActiveSection] = useState(null);
  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const { current: currentObserver } = observer;
    sectionIds.forEach(id => {
      const element = document.getElementById(id.startsWith('#') ? id.substring(1) : id);
      if (element) {
        currentObserver.observe(element);
      }
    });

    return () => currentObserver.disconnect();
  }, [sectionIds, options]);

  return activeSection;
};

export default useScrollSpy;
