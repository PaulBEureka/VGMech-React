import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Store user info in localStorage for navbar
      localStorage.setItem('vgmech_user', JSON.stringify({
        name: user.displayName,
        picture: user.photoURL,
        email: user.email,
        uid: user.uid
      }));
      window.location.href = '/'; // Force reload to update navbar
    } catch (err) {
      console.error('Google sign-in failed:', err);
      // Optionally show an error message to the user
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-2" style={{background: 'linear-gradient(135deg, #2d0b00 0%, #3a1c0b 100%)'}}>
      <div className="card shadow-lg border-0 p-4 w-100" style={{background: 'rgba(40,16,8,0.95)', border: '2px solid #ffb347', maxWidth: 400, minWidth: 0}}>
        <div className="text-center mb-4">
          <img src="/images/VGM_logo.png" alt="VGMech Logo" style={{width: 60, height: 60}} className="mb-2" />
          <h2 className="fw-bolder mb-0" style={{color: '#ffe259', textShadow: '1px 1px 6px #d7263d'}}>Sign In</h2>
          <div className="divider mx-auto my-3" style={{width: '60px', height: '4px', background: 'linear-gradient(90deg, #d7263d, #ffb347, #ffe259)', borderRadius: '2px', boxShadow: '0 0 10px #d7263d'}}></div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <button
            className="btn btn-dark"
            style={{ fontWeight: 'bold', width: '100%', border: '2px solid #ffb347', color: '#ffe259', background: '#2d0b00', borderRadius: '24px', fontSize: '1.1em', boxShadow: '0 0 8px #d7263d' }}
            onClick={handleGoogleSignIn}
          >
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" style={{width: 24, height: 24, marginRight: 8, verticalAlign: 'middle'}} />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
