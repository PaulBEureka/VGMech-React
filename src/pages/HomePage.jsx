import React from 'react'
import Hero from '../components/Hero'
import MechanicListings from '../components/MechanicListings'
import GameListings from '../components/GameListings'

const HomePage = () => {
  return (
    <div>
      <Hero/>
      <MechanicListings/>
      <GameListings/>
    </div>
  )
}

export default HomePage
