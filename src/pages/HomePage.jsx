import React, { useRef, useEffect } from 'react'
import Hero from '../components/Hero'
import MechanicListings from '../components/MechanicListings'
import AboutUs from '../components/AboutUs'

const HomePage = () => {
  const mechanicRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const scrollToSection = () => {
      if (window.location.hash === '#learn' && mechanicRef.current) {
        mechanicRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (window.location.hash === '#about-us' && aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    // Scroll on mount
    setTimeout(scrollToSection, 0);
    // Scroll on hash change
    window.addEventListener('hashchange', scrollToSection);
    return () => window.removeEventListener('hashchange', scrollToSection);
  }, []);

  return (
    <div>
      <Hero/>
      <div ref={mechanicRef} id="learn-section">
        <MechanicListings/>
      </div>
      <div ref={aboutRef} id="about-us">
        <AboutUs/>
      </div>
    </div>
  )
}

export default HomePage
