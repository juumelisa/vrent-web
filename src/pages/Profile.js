import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { connect, useDispatch, useSelector } from 'react-redux';
import { changeDataUser } from '../redux/actions/auth';
import { getDataUser } from '../redux/actions/auth';

export const Profile = ({getDataUser})=> {
  const auth = useSelector(state=>state.auth)
  console.log(auth)
  const token = window.localStorage.getItem('token')
  const userData = JSON.parse(window.localStorage.getItem('userData'))
  const dispatch = useDispatch()
  const [formValue, setFormValue] = useState({
    email: userData.email,
    address: userData.address,
    phone_number: userData.phone_number,
    username: userData.username,
    birthdate: userData.birthdate
  })
  const navigate = useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  }, [])
  const changeData = (e) => {
    e.preventDefault()
    console.log(e.target.elements['email'].value)
    const email = e.target.elements['email'].value
    const address = e.target.elements['address'].value
    const phone_number = e.target.elements['phone_number'].value
    const username = e.target.elements['username'].value
    const birthdate = e.target.elements['birthdate'].value
    const data = {email, address, phone_number, username, birthdate}
    console.log(data)
    dispatch(changeDataUser(data, token))
    getDataUser(token)
    navigate('/profile')
  }
    return (
      <Layout>
        <main className="container mb-5">
          <h1>Profile</h1>
          <div className="user-profile position-relative text-center">
            <div className="user-avatar img-fit">
              <img className="rounded-circle" alt="avatar" width="200" height="200" src={auth.userData.image} />
            </div>
            <Link to="/profile" className="position-absolute bottom-0 end-0">
              <div className="edit-icon position-relative">
                <i className="fa-solid fa-pencil position-absolute top-50 start-50 translate-middle" />
              </div>
            </Link>
          </div>
          <div className="identity-section text-center pt-3">
            <h1>{auth.userData.name}</h1>
            <div className="contact-section">
              <p className="fs-5 fw-bold m-0">{auth.userData.email}</p>
              <p className="fs-5 fw-bold m-0">{auth.userData.phone_number}</p>
              <p className="fs-5 fw-bold">Has been active since {auth.userData.registerYear}</p>
            </div>
          </div>
          {auth.isError && auth.errorMsg && <div className='alert alert-danger mb-5'>{auth.errorMsg}</div>}
          {!auth.isError && auth.errorMsg && <div className='alert alert-success mb-5'>{auth.errorMsg}</div>}
          <form className="profile-form" onSubmit={changeData}>
            <div className="form-check gender-section d-flex">
              <label htmlFor="male" className="gender-selection position-relative fs-5 ps-4 me-3">
                Male
                <input className="position-absolute top-50 start-0 translate-middle" type="radio" name="gender" id="male" value="male" />
                <span className="checkmark position-absolute top-50 start-0 translate-middle rounded-circle" />
              </label>
              <label htmlFor="female" className="gender-selection position-relative ps-4 fs-5">
                Female
                <input className="position-absolute top-50 start-0 translate-middle" type="radio" name="gender" id="female" value="female" />
                <span className="checkmark position-absolute top-50 start-0 translate-middle rounded-circle" />
              </label>
            </div>
            <div className="contact-section">
              <h2 className="fs-5 fw-bolder mb-4">Contacts</h2>
              <label htmlFor="email" className="fs-5 mb-4">Email address :</label>
              <input className="fs-5 mb-4" type="email" name="email" id="email" placeholder={auth.userData.email} />
              <label htmlFor="address" className="fs-5 mb-4">Addres :</label>
              <input className="fs-5 mb-4" type="text" name="address" id="address" placeholder={auth.userData.address} />
              <label htmlFor="phone-number" className="fs-5 mb-4">Mobile number :</label>
              <input className="fs-5 mb-4" type="text" name="phone_number" id="phoneNumber" placeholder={auth.userData.phone_number} />
            </div>
            <div className="identity-section">
              <h2 className="fs-5 fw-bolder mb-4">Identity</h2>
              <div className="identity-form row">
                <div className="input-identity col-12 col-md-6">
                  <label htmlFor="username" className="fs-5 mb-4">Display name :</label>
                  <input className="fs-5 mb-4" type="text" name="username" id="username" placeholder={auth.userData.username} />
                </div>
                <div className="input-identity  col-12 col-md-6">
                  <label htmlFor="birthdate" className="fs-5 mb-4">DD/MM/YY :</label>
                  <input className="fs-5 mb-4" type="date" name="birthdate" id="birthdate" placeholder={auth.userData.birthdate} />
                </div>
              </div>
            </div>
            <div className="user-button d-flex flex-wrap flex-md-row my-4">
              <button type="submit" className="fs-5 fw-bold mb-2">Save Change</button>
              <div className="change-password btn fs-5 fw-bold mb-2">Change password</div>
              <div className="cancel btn fs-5 fw-bold mb-2">Cancel</div>
            </div>
          </form>
        </main>
      </Layout>
    );
}

const mapStateToProps = state => ({auth: state.auth})
const mapDispatchToProps = {getDataUser}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)