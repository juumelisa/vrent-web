import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import googleLogo from '../assets/images/google-logo.png';
import background from '../assets/images/login-background.png';
import FooterB from '../components/FooterB';
import { confirmAccount } from '../redux/actions/auth';

const AccountConfirmation = ()=> {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()
  console.log(auth.token)

  const onConfirm = (e)=>{
    e.preventDefault()
    const email = e.target.elements['email'].value
    const code = e.target.elements['code'].value
    dispatch(confirmAccount(email, code))
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
          <h1 className="my-5">Account Confirmation</h1>
          <form onSubmit={onConfirm} className="login-form">
            {auth.isError && auth.errorMsg && <div className='alert alert-danger mb-5'>{auth.errorMsg}</div>}
            {!auth.isError && auth.errorMsg && <div className='alert alert-success mb-5'>{auth.errorMsg}</div>}
            <input type="text" name="email" placeholder="Email" className="fs-4" />
            <input type="text" name="code" placeholder="Confirmation code" className="fs-4" />
            <button type="submit" className="fs-4 mb-3">Confirm account</button>
          </form>
        </div>
        <FooterB />
      </div>
    </main>
    </>
  );
}

export default AccountConfirmation
