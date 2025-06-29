import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    name: firebaseUser.displayName,
                    picture: firebaseUser.photoURL,
                    email: firebaseUser.email,
                    uid: firebaseUser.uid
                });
                // Optionally update localStorage for other components
                localStorage.setItem('vgmech_user', JSON.stringify({
                    name: firebaseUser.displayName,
                    picture: firebaseUser.photoURL,
                    email: firebaseUser.email,
                    uid: firebaseUser.uid
                }));
            } else {
                setUser(null);
                localStorage.removeItem('vgmech_user');
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        const auth = getAuth();
        auth.signOut();
        setUser(null);
        localStorage.removeItem('vgmech_user');
        window.location.href = '/';
    };

    return (
        <nav className="navbar navbar-expand-lg nav-bg fixed-top">
            <div className="container-fluid mx-5">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between " id="navbarTogglerDemo02">
                    <NavLink className="flex flex-shrink-0 items-center mr-4 nav-link fw-bolder text-white" to="/">
                        <img className="nav-logo" src="images/VGM_logo.png" alt="VGMech" />
                        VGMech
                    </NavLink>
                    <ul className="navbar-nav mb-3 mb-lg-0">
                        <li className="nav-item mx-3">
                            <a className="nav-link text-white" href="/#learn">Learn</a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link text-white" href="/#about-us">About Us</a>
                        </li>
                    </ul>
                    {user ? (
                        <div className="d-flex align-items-center gap-2 user-profile-nav">
                            <img
                                src={user.picture}
                                alt={user.name}
                                className="rounded-circle nav-user-avatar"
                                style={{ width: 40, height: 40, border: '2px solid #ffe259', boxShadow: '0 0 10px #d7263d', background: '#222' }}
                            />
                            <span className="fw-bold text-white nav-user-name" style={{ textShadow: '0 0 6px #d7263d', fontSize: '1.1rem' }}>{user.name}</span>
                            <button className="btn btn-sm btn-danger ms-2 px-3 py-1 nav-logout-btn" style={{ borderRadius: '16px', background: 'linear-gradient(90deg, #d7263d, #ffb347, #ffe259)', color: '#222', fontWeight: 'bold', border: 'none', boxShadow: '0 0 8px #d7263d' }} onClick={handleLogout}>Log Out</button>
                        </div>
                    ) : (
                        <ul className="navbar-nav">
                            <li className="nav-item nav-button">
                                <NavLink className="text-white text-decoration-none" to="/sign-in">Sign In</NavLink>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
