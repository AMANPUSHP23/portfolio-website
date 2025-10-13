
import React from "react";

export const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId.startsWith('#') ? sectionId.substring(1) : sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};
