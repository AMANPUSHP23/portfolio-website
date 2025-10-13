import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Briefcase, Rocket, Code, Laptop } from 'lucide-react';

export type IconType = {
  [key: string]: React.ReactElement;
};

export const iconMap: IconType = {
  Rocket: React.createElement(Rocket, { className: 'h-6 w-6 text-primary' }),
  Code: React.createElement(Code, { className: 'h-6 w-6 text-primary' }),
  Laptop: React.createElement(Laptop, { className: 'h-6 w-6 text-primary' }),
  Default: React.createElement(Briefcase, { className: 'h-6 w-6 text-primary' }),
};
