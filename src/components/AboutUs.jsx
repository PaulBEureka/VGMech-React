import React from 'react'

const teamMembers = [
  { name: 'Paul Carlo Bataga', img: 'images/paul_pic.jpg' },
  { name: 'Ciriaco John Almeron', img: 'images/cj_pic.jpg' },
  { name: 'Aries Diomampo', img: 'images/aries_pic.jpg' },
  { name: 'Kimtribi Aleksie Cuevas', img: 'images/kim_pic.jpg' },
  { name: 'Andrei Robin Sta. Ana', img: 'images/andrei.png' },
]

const AboutUs = () => {
  return (
    <section id="about-us" className="aboutus-minimalist-bg py-5">
      <div className="container">
        <h1 className="aboutus-title text-center mb-5">MEET THE TEAM</h1>
        <div className="row justify-content-center g-4 mb-4">
          {teamMembers.map((member, idx) => (
            <div key={member.name} className="col-6 col-md-2 d-flex flex-column align-items-center">
              <div className="aboutus-avatar mb-2">
                <img src={member.img} alt={member.name} className="img-fluid rounded-circle" />
              </div>
              <span className="aboutus-name text-center">{member.name}</span>
            </div>
          ))}
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8">
            <h2 className="aboutus-purpose-title text-center mb-3">Our Core Purpose</h2>
            <p className="aboutus-purpose text-center mb-0">
              "To empower aspiring game developers and enthusiasts with deep understanding of game mechanics through interactive learning experiences, fostering both knowledge acquisition and enjoyment in a dynamic virtual environment."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
