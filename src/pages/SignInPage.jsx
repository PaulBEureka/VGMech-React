import React from 'react';

const SignInPage = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-2" style={{background: 'linear-gradient(135deg, #2d0b00 0%, #3a1c0b 100%)'}}>
      <div className="card shadow-lg border-0 p-4 w-100" style={{background: 'rgba(40,16,8,0.95)', border: '2px solid #ffb347', maxWidth: 400, minWidth: 0}}>
        <div className="text-center mb-4">
          <img src="/images/VGM_logo.png" alt="VGMech Logo" style={{width: 60, height: 60}} className="mb-2" />
          <h2 className="fw-bolder mb-0" style={{color: '#ffe259', textShadow: '1px 1px 6px #d7263d'}}>Sign In</h2>
          <div className="divider mx-auto my-3" style={{width: '60px', height: '4px', background: 'linear-gradient(90deg, #d7263d, #ffb347, #ffe259)', borderRadius: '2px', boxShadow: '0 0 10px #d7263d'}}></div>
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-white">Username</label>
            <input type="text" className="form-control sign-in-placeholder-white" id="username" placeholder="Enter your username" style={{backgroundColor: '#2d0b00', color: '#ffe259', borderColor: '#ffb347'}} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input type="password" className="form-control sign-in-placeholder-white" id="password" placeholder="Enter your password" style={{backgroundColor: '#2d0b00', color: '#ffe259', borderColor: '#ffb347'}} />
          </div>
          <button type="submit" className="btn w-100 fw-bold" style={{background: '#d7263d', color: '#ffe259', border: '2px solid #ffb347', boxShadow: '0 0 8px #d7263d'}}>Sign In</button>
        </form>
        <div className="text-center mt-3">
          <span className="text-white">Don't have an account?</span>
          <a href="#" className="ms-2" style={{color: '#ffb347', textDecoration: 'underline'}}>Register</a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
