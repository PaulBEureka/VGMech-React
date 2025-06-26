import React from 'react'
import { Link } from 'react-router-dom'

const MechanicListing = ({mechanic}) => {
  return (
    
    <li className="align-content-center justify-content-center m-auto outer-card" >
        <Link to={`/learn/:`+ mechanic.CardID + ``} state={mechanic} className="card-custom">
            <img src={`${mechanic.ImageSource}`} className="card__image" alt="" />
            <div className="card__overlay">
                <div className="card__header">
                    <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"></svg>
                    <img className="card__thumb" src={`${mechanic.ThumbSource}`} alt="" />
                    <div className="card__header-text">
                        <h3 className="card__title">{mechanic.Title}</h3>
                        <span className="card__status">Click to learn</span>
                    </div>
                </div>
                <p className="fw-bolder card__title_description">Description:</p>
                <p className="card__description">{mechanic.Description}</p>
            </div>
        </Link>
    </li>
    
  )
}

export default MechanicListing
