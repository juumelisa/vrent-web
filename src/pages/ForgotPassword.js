import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../redux/actions/auth';

export const ForgotPassword = ()=> {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()
  console.log(auth.token)

  const onForgot = (e)=>{
    e.preventDefault()
    const username = e.target.elements['username'].value
    dispatch(forgotPassword(username))
    navigate('/change-password')
  }
    return (
      <>
        <section>
          <div className="wrapper">
            <div className="back-arrow">
              <Link to="/login" className="d-inline-flex justify-content-start">
                <FaChevronLeft className="fs-3 me-5" />
                <p>Back</p>
              </Link>
            </div>
            <h1 className="text-center">Don’t worry, we got your back!</h1>
            {auth.isError && auth.errorMsg && <div className='alert alert-danger mb-5'>{auth.errorMsg}</div>}
            {!auth.isError && auth.errorMsg && <div className='alert alert-danger mb-5'>{auth.errorMsg}</div>}
            <form onSubmit={onForgot} className="forgot">
              <input className="mb-4" type="email" name="username" placeholder="Enter your email address" />
              <button>Send Link</button>
            </form>
            <div className="message">
              <p>
                You will receive a link to reset your password.
                If you haven’t received any link, click
                <Link to="/" style={{ textDecoration: 'underline' }}>Resend Link</Link>
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
}

export default ForgotPassword
