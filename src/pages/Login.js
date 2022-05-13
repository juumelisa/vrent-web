import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import googleLogo from '../assets/images/google-logo.png';
import background from '../assets/images/login-background.png';
import { Button } from '../components/Button';
import FooterB from '../components/FooterB';
import Helmets from '../components/Helmets';
import { Input } from '../components/Input';
import { InputPassword } from '../components/InputPassword';
import { Loading } from '../components/Loading';
import { login } from '../redux/actions/auth';

const Login = ()=> {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(window.location.search)
  const [username, setUsername] = useState(queryParams.get("username"))
  const [password, setPassword] = useState()
  const [errorMessage, setErrorMessage] = useState()
  useEffect(() => {
    if (!auth.message) {
      dispatch({
        type: 'AUTH_CLEAR'
      })
    }
  }, [])
  const onLogin = ()=>{
    setErrorMessage()
    dispatch({
      type: 'AUTH_CLEAR'
    })
    if(!username || !password) {
      setErrorMessage('Please fill in all the fields')
    } else{
      dispatch(login(username, password))
    }
  }
  return (
    <>
    {auth.token!==null && <Navigate to="/" />}
    <Helmets title={"Login"}/>
    <main className="d-flex flex-wrap flex-lg-row position-relative">
      <div></div>
      <div className="left-container">
        <img src={background} alt="background" className="position-fixed" />
      </div>
      <div className="right-container pt-5">
        <div className="top-wrapper mx-2 mx-md-auto">
          <h1 className="my-5">Login</h1>
            {errorMessage && <div className='alert alert-danger mb-5'>{errorMessage}</div>}
            {auth.isError && auth.errorMsg && !errorMessage && <div className='alert alert-danger mb-5'>{auth.errorMsg}</div>}
            {!auth.isError && auth.message && <div className='alert alert-success mb-5'>{auth.message}</div>}
            <Input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} variant="pink" placeholder="Email or username"/>
            <InputPassword variant="pink" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            <Button variant="light" onAction={onLogin}>Login</Button>
            <Link to="/forgot-password" className="forgot-password mt-4" style={{ textDecoration: 'underline', color: '#1572A1' }}>Forgot password?</Link>
            <div className="pb-1"></div>
            <Link to="/forgot-password" className="opacity-0">Forgot password?</Link>
          <div className="login-way d-flex">
            <div className="line" />
            <div className="way fs-5 text-center">or try another way</div>
            <div className="line" />
          </div>
          <Button variant="white">
            <div className="d-flex flex-row justify-content-center align-items-center">
              <img src={googleLogo} alt="logo google" />
              {' '}
              <p className="m-0 ps-2">Login with Google</p>
            </div>
          </Button>
          <Button variant="dark" onAction={() => navigate("/register")}>Sign up</Button>
        </div>
        <FooterB />
      </div>
      {auth.isLoading && <Loading text="Login"/>}
    </main>
    </>
  );
}

export default Login
