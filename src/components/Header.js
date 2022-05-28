import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import messageIcon from '../assets/images/email.png';
import defaultUser from '../assets/images/default-user.png'

export const Header = ()=> {
  const token = window.localStorage.getItem('seranToken')
  const userData = JSON.parse(window.localStorage.getItem('seranUserData'))
    const navigate = useNavigate();
    const dp = useDispatch()
    const onLogout = ()=>{
      dp({type: 'AUTH_LOGOUT'})
      navigate('/')
    }
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top my-2" style={{zIndex: 990}}>
          <div className="container my-2">
            <Link className="navbar-brand" to="/"><img className="img-fluid" alt="logo" width="40" height="40" src={logo} /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/vehicles">Vehicle Type</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/history">History</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">About</Link>
                </li>
                {userData && <div className="d-flex flex-column flex-lg-row">
                  <li className="profile-message text-center d-flex justify-content-center">
                    <Link to="/">
                      <div className="message-notif position-relative">
                        <img src={messageIcon} alt="message icon" width="40" height="40" />
                        <div className="iconSum position-absolute top-0 start-100 translate-middle">1</div>
                      </div>
                    </Link>
                    <Link to="/profile" role="button" className="img-fit"><img className="avatar ms-5" src={userData.image || defaultUser} onError={e => e.target.src={defaultUser}} alt="user" width="40" height="40" /></Link>
                  </li>
                  <li className="text-center"><div onClick={onLogout} className="btn btn-primary login" role="button">Logout</div></li>
                </div>
                }
                {(token===null || token===undefined) && <div className="d-flex flex-column flex-lg-row">
                  <li className="text-center"><Link className="btn btn-primary login" to="/login" role="button">Login</Link></li>
                  <li className="text-center"><Link className="btn btn-primary register" to="/register" role="button">Register</Link></li>
                </div>
                }
                
              </ul>
            </div>
          </div>
        </nav>
      );
    }


export default Header