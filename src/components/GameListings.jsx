import React from 'react'
import {games} from '../assets/JSONs/MiniGame.json'
import GameListing from './GameListing'

const GameListings = () => {
  return (
    <section className="intro-section-color">
        <div className=" text-center text-light pt-5">
            <h1 className="display-4 mini_custom_padding fw-bolder">Play competitive mini games<br /> with other learners!</h1>
        </div>
        
        <div className="container">
            <div className="cards-list">
                {games.map((game) => (
                    <GameListing key={game.CardID} game={game}/>
                ))}
            </div>
        </div>
    </section>
  )
}

export default GameListings
