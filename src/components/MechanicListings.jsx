import React from 'react'
import {mechanics} from '../assets/JSONs/Learn.json'
import MechanicListing from './MechanicListing'

const MechanicListings = () => {


  return (
    <section className="align-content-center justify-content-center bg-listings" id="learn">
        <ul className="cards-custom align-content-center justify-content-center d-grid">
            {mechanics.map((mechanic) => (
                <MechanicListing key={mechanic.CardID} mechanic={mechanic} />
            ))}
        </ul>
    </section>  
  )
}

export default MechanicListings
