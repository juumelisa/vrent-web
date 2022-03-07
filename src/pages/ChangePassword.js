import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import googleLogo from '../assets/images/google-logo.png';
import background from '../assets/images/login-background.png';
import FooterB from '../components/FooterB';
import { changePassword } from '../redux/actions/auth';

const ChangePassword = ()=> {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()
  console.log(auth.token)

  const onChangePassword = (e)=>{
    e.preventDefault()
    const username = e.target.elements['username'].value
    const confirmCode = e.target.elements['confirmCode'].value
    const password = e.target.elements['password'].value
    const confirmPassword = e.target.elements['password'].value
    const data = {username, confirmCode, password, confirmPassword}
    dispatch(changePassword(data))
    navigate('/login')
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
          <h1 className="my-5">Change Password</h1>
          {auth.isError && auth.errorMsg && <div className='alert alert-danger mb-5'>{auth.errorMsg}</div>}
          {!auth.isError && auth.errorMsg && <div className='alert alert-success mb-5'>{auth.errorMsg}</div>}
          <form onSubmit={onChangePassword} className="login-form">
            {auth.isError && auth.errorMsg && <div className='alert alert-danger mb-5'>{auth.errorMsg}</div>}
            <input type="text" name="username" placeholder="Email or username" className="fs-4" />
            <input type="text" name="confirmCode" placeholder="Confirmation code" className="fs-4" />
            <input type="password" name="password" placeholder="Password" className="fs-4" />
            <input type="password" name="confirmPassword" placeholder="Confirmation password" className="fs-4" />
            <button type="submit" className="fs-4 mb-3">Change password</button>
          </form>
        </div>
        <FooterB />
      </div>
    </main>
    </>
  );
}

export default ChangePassword
