import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [user, setUser] = useState("");
    const [userFocus, setUserFocus] = useState(false);


  return (
    <nav className="navbar navbar-expand-lg nav-bg fixed-top">
        <div className="container-fluid mx-5">
            <button className="navbar-toggler"type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls = "navbarTogglerDemo02" aria-expanded = "false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between " id="navbarTogglerDemo02">
                <NavLink className="flex flex-shrink-0 items-center mr-4 nav-link fw-bolder text-white" to="/">
                    <img
                        className="nav-logo"
                        src="images/VGM_logo.png"
                        alt="VGMech"
                    />
                    VGMech
                </NavLink>
                
                <ul className="navbar-nav mb-3 mb-lg-0">
                    <li className="nav-item mx-3">
                        <NavLink className="nav-link text-white" to="/home/:learn">Learn</NavLink>
                    </li>
                    <li className="nav-item mx-3">
                        <NavLink className="nav-link text-white" to="/home/:compete">Compete</NavLink>
                    </li>
                    <li className="nav-item mx-3">
                        <NavLink className="nav-link text-white" to="/home/:about-us">About Us</NavLink>
                    </li>

                    
                </ul>

                {userFocus ? (
                        <div className="dropdown">
                            <NavLink className="fw-bolder dropdown-toggle nav-button" to="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                {user}
                            </NavLink>
                            <image src="../assets/images/vgmech-assets/vgmech-images/person_icon.jpg" alt="" className="rounded-circle record_border shadow" width="40" height="40"></image>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li>
                                    <NavLink className="dropdown-item" to="/user">User Profile</NavLink>
                                </li>
                                <li>
                                    <button className="dropdown-item text-danger" Text="Log Out" OnClick="btnCurrentUser_Click" CausesValidation="false"></button>
                                </li>
                            </ul>
                        </div>
                    ):
                    (
                        <ul className="navbar-nav">
                            <li className="nav-item nav-button">
                                <NavLink className="text-white text-decoration-none" to="/sign-in">Sign In | Sign Up</NavLink>
                            </li>
                        </ul>
                    )}
                
                
            </div>
        </div>
    </nav>
  )
}

export default Navbar
