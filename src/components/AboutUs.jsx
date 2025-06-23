import React from 'react'

const AboutUs = () => {
  return (
    <section id="about-us" className="about_us_bg" style={{ overflowX: 'hidden' }}>
      <div className="row text-center text-light">
        <h1 className="display-4 mini_custom_padding fw-bolder border-2">MEET THE TEAM AND<br /> EVERYTHING YOU NEED TO KNOW<br /> ABOUT US</h1>
      </div>
      <div className="row">
        <div className="col-md-6 d-grid">
          <div className="col-md-6 square-bg-2 m-auto text-center my-3">
            <img src="images/paul_pic.jpg" alt="Paul Carlo Bataga" className="img-fluid w-100 h-100" />
          </div>
          <div className="text-center">
            <p className="text-light">Paul Carlo Bataga</p>
          </div>
        </div>
        <div className="col-md-6 d-grid">
          <div className="col-md-6 square-bg-2 m-auto text-center my-3">
            <img src="images/cj_pic.jpg" alt="Ciriaco John Almeron" className="img-fluid w-100 h-100" />
          </div>
          <div className="text-center">
            <p className="text-light">Ciriaco John Almeron</p>
          </div>
        </div>
        <div className="col-md-6 d-grid">
          <div className="col-md-6 square-bg-2 m-auto text-center my-3">
            <img src="images/aries_pic.jpg" alt="Aries Diomampo" className="img-fluid w-100 h-100" />
          </div>
          <div className="text-center">
            <p className="text-light">Aries Diomampo</p>
          </div>
        </div>
        <div className="col-md-6 d-grid">
          <div className="col-md-6 square-bg-2 m-auto text-center my-3">
            <img src="images/kim_pic.jpg" alt="Kimtribi Aleksie Cuevas" className="img-fluid w-100 h-100" />
          </div>
          <div className="text-center">
            <p className="text-light">Kimtribi Aleksie Cuevas</p>
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <div className="col-md-6 d-grid">
            <div className="col-md-6 square-bg-2 m-auto text-center my-3">
              <img src="images/andrei.png" alt="Andrei Robin Sta. Ana" className="img-fluid w-100 h-100" />
            </div>
            <div className="text-center">
              <p className="text-light">Andrei Robin Sta. Ana</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row text-center">
        <h1 className="display-5 text-light fw-bolder">Our Core Purpose</h1>
      </div>
      <div className="container">
        <p className="text-light py-5 text-center fw-bold h4 mb-0">
          "To empower aspiring game developers and enthusiasts with deep understanding of game mechanics through interactive learning experiences,  fostering both knowledge acquisition and enjoyment in a dynamic virtual environment."
        </p>
      </div>
    </section>
  )
}

export default AboutUs
