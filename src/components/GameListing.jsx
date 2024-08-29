import React from 'react'
import { Link } from 'react-router-dom'

const GameListing = ({game}) => {
  return (

    <Link to={`/learn/${game.CardID}`} className='minigame-card d-grid'>
      <div className="card_image"> 
        <img src={`${game.ThumbSource}`} className="" alt="" /> 
      </div>
      <div className="card_title">
        <p className='title-white'>{game.Title}</p>
      </div>
    </Link>
  )
}

export default GameListing
