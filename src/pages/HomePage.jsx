import React, { useRef, useEffect } from 'react'
import Hero from '../components/Hero'
import MechanicListings from '../components/MechanicListings'
import GameListings from '../components/GameListings'
import AboutUs from '../components/AboutUs'

const HomePage = () => {
  const mechanicRef = useRef(null);
  const gameRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const scrollToSection = () => {
      if (window.location.hash === '#learn' && mechanicRef.current) {
        mechanicRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (window.location.hash === '#compete' && gameRef.current) {
        gameRef.current.scrollIntoView({ behavior: 'smooth' });
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
      <div ref={gameRef} id="compete-section">
        <GameListings/>
      </div>
      <div ref={aboutRef} id="about-us">
        <AboutUs/>
      </div>
    </div>
  )
}

export default HomePage
