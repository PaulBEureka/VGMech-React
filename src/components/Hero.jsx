import React from 'react'
import { useState } from 'react'
import { Carousel } from 'react-bootstrap'

const Hero = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    };


  return (
    <section id="homepage" className="intro-section-color pt-5">
        <Carousel activeIndex={index} onSelect={handleSelect} className="carousel slide carousel-container">
            <Carousel.Item className="carousel-item">
                <div className="row my-3 py-5">
                    <img className="col-md-6" src="images/movement_gif.gif" alt="movement"></img>
                    <div className="text-center text-light m-auto col-md-6 carousel-title">
                        <h1>Master the Basics:</h1>
                        <p>fluid movement is the foundation of gameplay</p>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item className="carousel-item">
                <div className="row my-3 py-5">
                    <img className="col-md-6" src="images/shooting_gif.gif" alt="shooting" ></img>
                    <div className="text-center text-light m-auto col-md-6 carousel-title">
                        <h1>Sharpen your aim:</h1>
                        <p>precise shooting makes all the difference.</p>
                    </div>
                </div>
            </Carousel.Item> 
            <Carousel.Item className='carousel-item '>
                <div className="row my-3 py-5">
                    <div className="text-center text-light m-auto col-md-6 carousel-title">
                        <h1>Gather wisely:</h1>
                        <p>every item counts towards your success.</p>
                    </div>
                    <img className="col-md-6" src="images/collecting_gif.gif" alt="collecting"></img>
                </div>
            </Carousel.Item>
            <Carousel.Item className='carousel-item '>
                <div className="row my-3 py-5">
                    <img className="col-md-6" src="images/interaction_gif.gif" alt="interaction" ></img>
                    <div className="text-center text-light m-auto col-md-6 carousel-title">
                        <h1>Engage actively:</h1>
                        <p>interaction opens new possibilities.</p>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item className='carousel-item '>
                <div className="row my-3 py-5">
                    <div className="text-center text-light m-auto col-md-6 carousel-title">
                        <h1>Manage your vitality:</h1>
                        <p>health is key to survival.</p>
                    </div>
                    <img className="col-md-6" src="images/health_gif.gif" alt="health"></img>
                </div>
            </Carousel.Item>
        </Carousel>
        </section>
  )
}

export default Hero
