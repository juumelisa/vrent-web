import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import googleLogo from '../assets/images/google-logo.png';
import background from '../assets/images/login-background.png';
import FooterB from '../components/FooterB';
import { login } from '../redux/actions/auth';

const Login = ()=> {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()
  console.log(auth.token)

  const onLogin = (e)=>{
    e.preventDefault()
    const username = e.target.elements['username'].value
    const password = e.target.elements['password'].value
    dispatch(login(username, password))
    if(!auth.isLoading && !auth.isError){
      navigate('/')
    }
  }
  return (
    <>
    {auth.token!==null && <Navigate to="/" />}
    <main className="d-flex flex-wrap flex-lg-row">
      <div></div>
      <div className="left-container">
        <img src={background} alt="background" className="position-fixed" />
      </div>
      <div className="right-container pt-5">
        <div className="top-wrapper">
          <h1 className="my-5">Login</h1>
          <form onSubmit={onLogin} className="login-form">
            {auth.isError && auth.errorMsg && <div className='alert alert-danger mb-5'>{auth.errorMsg}</div>}
            {!auth.isError && auth.errorMsg && <div className='alert alert-success mb-5'>{auth.errorMsg}</div>}
            <input type="text" name="username" placeholder="Email or username" className="fs-4" />
            <input type="password" name="password" placeholder="Password" className="fs-4" />
            <button type="submit" className="fs-4 mb-3">Login</button>
            <Link to="/forgot-password" className="forgot-password" style={{ textDecoration: 'underline', color: '#1572A1' }}>Forgot password?</Link>
          </form>
          <Link to="/forgot-password">Forgot password?</Link>
          <div className="login-way d-flex">
            <div className="line" />
            <div className="way fs-5 text-center">or try another way</div>
            <div className="line" />
          </div>
          <div className="login-choices text-center">
            <Link className="btn loginGoogle fs-4 mt-3" to="/">
              <img src={googleLogo} alt="logo google" />
              {' '}
              Login with Google
            </Link>
            <Link className="btn register fs-4 mt-3" to="/register">Sign up</Link>
          </div>
        </div>
        <FooterB />
      </div>
    </main>
    </>
  );
}

export default Login
