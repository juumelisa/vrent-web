import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/Button';
import { changeOldPassword } from '../redux/actions/auth';
import loadingGif from '../assets/images/50820-blue-loading.gif'
import { InputPassword } from '../components/InputPassword';
import Helmets from '../components/Helmets';

export const EditPassword = ()=> {
  const auth = useSelector(state=>state.auth)
  const token = window.localStorage.getItem('seranToken')
  // const userData = JSON.parse(window.localStorage.getItem('seranUserData'))
  const [password, setPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const [repeatPassword, setRepeatPassword] = useState()
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
  const changePassword = () => {
    const data = {password, newPassword, repeatPassword}
    dispatch(changeOldPassword(data, token))
  }
    return (
      <Layout>
        <Helmets title={"Change Password"} />
        <main className="container vh-100 d-flex flex-column justify-content-center">
          <h1 className="pb-5 text-center">Change Password</h1>
          {auth.isError && auth.errorMsg && <div className='alert alert-danger mb-5'>{auth.errorMsg}</div>}
          {!auth.isError && auth.errorMsg && <div className='alert alert-success mb-5'>{auth.errorMsg}</div>}
          <form className="profile-form pb-3">
            <div className="contact-section">
              <label className="fs-5 my-3">Current password :</label>
              <InputPassword value={password} onChange={e => setPassword(e.target.value)} />
              <label className="fs-5 my-3">New password :</label>
              <InputPassword value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              <label className="fs-5 my-3">Repeat new password:</label>
              <InputPassword value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
            </div>
          </form>
          <div className="d-flex flex-column flex-md-row">
            <Button variant="dark" onAction={changePassword}>Save Change</Button>
            <div className="m-2"></div>
            <Button onAction={() => navigate('/profile')}>Cancel</Button>
          </div>
          {auth.isLoading && <div className="position-absolute top-0 start-0 vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className="shadow-lg px-5">
              <img src={loadingGif} width={100} height={100}/>
            </div>
          </div>}
        </main>
      </Layout>
    );
}

export default EditPassword