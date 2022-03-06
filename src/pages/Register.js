import React from 'react';
import { Link } from 'react-router-dom';
import googleLogo from '../assets/images/google-logo.png';
import background from '../assets/images/login-background.png';
import FooterB from '../components/FooterB';

export function Register() {
  return (
    <main className="d-flex flex-wrap flex-lg-row">
      <div className="left-container">
        <img src={background} alt="background" className="position-fixed" />
      </div>
      <div className="right-container pt-5">
        <div className="top-wrapper">
          <h1 className="my-5">Signup</h1>
          <form className="login-form">
            <input type="text" name="name" placeholder="Name" className="fs-4" />
            <input type="email" name="email" placeholder="Email" className="fs-4" />
            <input type="password" name="password" placeholder="Password" className="fs-4" />
            <button type="submit" className="fs-4 mb-3">Login</button>
          </form>
          <div className="login-way d-flex">
            <div className="line" />
            <div className="way fs-5 text-center">or try another way</div>
            <div className="line" />
          </div>
          <div className="login-choices text-center">
            <Link className="btn loginGoogle fs-4 mt-3" to="/">
              <img src={googleLogo} alt="logo google" />
              {' '}
              Signup with Google
</Link>
            <Link className="btn register fs-4 mt-3" to="/login">Login</Link>
          </div>
        </div>
        <FooterB />
      </div>
    </main>
  );
}

export default Register;
