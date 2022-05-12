import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
// import { changeDataUser } from '../redux/actions/auth';
import { Input } from '../components/Input';
import { changeDataUser } from '../redux/actions/auth';
import { Button } from '../components/Button';
import defaultUser from '../assets/images/default-user.png'
import { GrEdit } from 'react-icons/gr';
// eslint-disable-next-line no-unused-vars
import loadingGif from '../assets/images/50820-blue-loading.gif'
export const Profile = ()=> {
  const auth = useSelector(state=>state.auth)
  const token = window.localStorage.getItem('seranToken')
  const userData = JSON.parse(window.localStorage.getItem('seranUserData'))
  const [email, setEmail] = useState(userData.email)
  const [gender, setGender] = useState(userData.gender)
  const [address, setAddress] = useState(userData.address)
  const [phoneNumber, setPhoneNumber] = useState(userData.phone_number)
  const [username, setUsername] = useState(userData.username)
  const [birthdate, setBirthdate] = useState(new Date(userData.birthdate).toLocaleDateString('en-CA'))
  const [image, setImage] = useState()
  const [picture, setPicture] = useState()
  // const [image, setImage] = useState(userData.image)
  const dispatch = useDispatch()
  
  const navigate = useNavigate()
  useEffect(()=>{
    dispatch({
      type: 'AUTH_CLEAR'
    })
    if(!token){
      navigate('/login')
    }
  }, [])
  
	const onFileChange = e => {
		setImage(e.target.files[0])
		setPicture(URL.createObjectURL(e.target.files[0]))
	}
  const changeData = () => {
    dispatch({
      type: 'AUTH_CLEAR'
    })
    const data = {email, address, phone_number: phoneNumber, username, birthdate, gender, image}
    dispatch(changeDataUser(data, token))
  }
    return (
      <Layout>
        <main className="container mb-5">
          <h1>Profile</h1>
          <div className="user-profile text-center">
            <div className="position-relative user-avatar img-fit mx-auto" style={{width: '200px'}}>
              <img className="rounded-circle" alt="avatar" width="200" height="200" src={picture ? picture : userData.image} onError={e => e.target.src=defaultUser}/>
              <div className="position-absolute bottom-0 end-0">
                <div className="bg-color-2 p-3 rounded-circle">
                  <GrEdit size={24}/>
                </div>
                <input className="position-absolute top-0 start-0 opacity-0" type="file" onChange={onFileChange} style={{width: '100%', height: '100%'}}/>
              </div>
            </div>
            <Link to="/profile" className="position-absolute bottom-0 end-0">
              <div className="edit-icon position-relative">
                <i className="fa-solid fa-pencil position-absolute top-50 start-50 translate-middle" />
              </div>
            </Link>
          </div>
          <div className="identity-section text-center pt-3">
            <h1>{userData.name}</h1>
            <div className="contact-section">
              <p className="fs-5 fw-bold m-0">{userData.email}</p>
              <p className="fs-5 fw-bold m-0">{userData.phone_number}</p>
              <p className="fs-5 fw-bold">Has been active since {userData.registerYear}</p>
            </div>
          </div>
          {auth.isError && auth.errorMsg && <div className='alert alert-danger mb-5'>{auth.errorMsg}</div>}
          {!auth.isError && auth.errorMsg && <div className='alert alert-success mb-5'>{auth.errorMsg}</div>}
          <form className="profile-form">
            <div className="form-check gender-section d-flex mb-5">
              <label htmlFor="male" className="gender-selection position-relative fs-5 ps-4 me-3">
                Male
                <input className="position-absolute top-50 start-0 translate-middle" type="radio" name="gender" id="male" value="Male" checked={gender ==="Male"}  onChange={e => setGender(e.target.value)}/>
                <span className="checkRadio position-absolute top-50 start-0 translate-middle rounded-circle" />
              </label>
              <label htmlFor="female" className="gender-selection position-relative ps-4 fs-5">
                Female
                <input className="position-absolute top-50 start-0 translate-middle" type="radio" name="gender" id="female" value="Female" checked={gender ==="Female"} onChange={e => setGender(e.target.value)}/>
                <span className="checkRadio position-absolute top-50 start-0 translate-middle rounded-circle" />
              </label>
            </div>
            <div className="contact-section">
              <h2 className="fs-5 fw-bolder">Contacts</h2>
              <label htmlFor="email" className="fs-5 my-3">Email address :</label>
              <Input type="text" variant="line" value={email} onChange={e => setEmail(e.target.value)}/>
              <label htmlFor="email" className="fs-5 my-3">Address :</label>
              <Input type="text" variant="line" value={address} onChange={e => setAddress(e.target.value)}/>
              <label htmlFor="phone-number" className="fs-5 my-3">Mobile number :</label>
              <Input type="number" variant="line" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
            </div>
            <div className="identity-section">
              <h2 className="fs-5 fw-bolder mt-5">Identity</h2>
              <div className="identity-form row">
                <div className="input-identity col-12 col-md-6">
                  <label htmlFor="username" className="fs-5 my-3">Display name :</label>
                  <Input type="text" variant="line" value={username} onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="input-identity  col-12 col-md-6">
                  <label htmlFor="birthdate" className="fs-5 my-3">Birthdate (DD/MM/YY) :</label>
                  <Input type="date" variant="line" value={birthdate} onChange={e => setBirthdate(e.target.value)} max={new Date().toLocaleDateString('en-CA')}/>
                </div>
              </div>
            </div>
          </form>
          {!auth.isLoading && <div className="d-flex flex-wrap flex-md-row my-4">
            <div className="col-12 col-md-4 p-1">
              <Button variant="dark" onAction={changeData}>Save Change</Button>
            </div>
            <div className="col-12 col-md-4 p-1">
              <Button variant="light" onAction={() => navigate('/edit-password')}>Change Password</Button>
            </div>
            <div className="col-12 col-md-4 p-1">
              <Button>Cancel</Button>
            </div>
          </div>}
          {auth.isLoading && !auth.isError && <div className="position-absolute top-0 start-0 vw-100 vh-100 d-flex justify-content-center align-items-center">
            <div className="bg-white shadow-lg px-5 mx-auto">
              <img src={loadingGif} width={100} height={100} alt="loading" />
            </div>
          </div>}
        </main>
      </Layout>
    );
}

export default Profile