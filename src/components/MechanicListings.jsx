import React from 'react'
import {mechanics} from '../assets/JSONs/Learn.json'
import MechanicListing from './MechanicListing'

const MechanicListings = () => {


  return (
    <section className="align-content-center justify-content-center bg-listings" id="learn">
        <h1 className="aboutus-title text-center mb-5 p-3">Learn Game Mechanics</h1>
        <ul className="cards-custom align-content-center justify-content-center d-grid">
            {mechanics.map((mechanic) => (
                <MechanicListing key={mechanic.CardID} mechanic={mechanic} />
            ))}
        </ul>
      
    </section>  
  )
}

export default MechanicListings
