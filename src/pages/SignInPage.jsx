import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; // Use VITE_GOOGLE_CLIENT_ID from .env

const SignInPage = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      // Send the Google credential to your backend for verification
      const res = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential })
      });
      if (!res.ok) throw new Error('Backend verification failed');
      const data = await res.json();
      // Store user info in localStorage for navbar
      if (data && data.user) {
        localStorage.setItem('vgmech_user', JSON.stringify(data.user));
        // Optionally, force a reload to update the navbar
        window.location.href = '/';
      }
      // Example: store your own session token or user info
      // localStorage.setItem('token', data.token);
      // Redirect or update UI as needed
      console.log('Backend verification success:', data);
    } catch (err) {
      console.error('Google sign-in or backend verification failed:', err);
      // Optionally show an error message to the user
    }
  };

  const handleError = () => {
    console.error('Google sign-in failed');
    // Optionally show an error message to the user
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
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              width="100%"
              shape="pill"
              theme="filled_blue"
              text="signin_with"
              logo_alignment="left"
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
