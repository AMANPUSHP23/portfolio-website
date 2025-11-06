
import React from 'react';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Timeline from '@/sections/Timeline';
import Skills from '@/sections/Skills';
import Architecture from '@/sections/Architecture';
import Projects from '@/sections/Projects';
import Experience from '@/sections/Experience';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';
import Newsletter from '@/sections/Newsletter';
import Seo from '@/components/Seo';
import { siteConfig } from '@/config/siteConfig';

const HomePage = () => {
  return (
    <>
      <Seo 
        title="Home"
        description={`Welcome to the portfolio of ${siteConfig.author}. Discover my projects, skills, and experience.`}
        path="/"
      />
      <Hero />
      <About />
      <Timeline />
      <Skills />
      <Architecture />
      <Projects />
      <Experience />
      <Testimonials />
      <Newsletter />
      <Contact />
    </>
  );
};

export default HomePage;
