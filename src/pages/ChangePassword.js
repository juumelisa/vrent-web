import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import background from '../assets/images/login-background.png';
import { Button } from '../components/Button';
import FooterB from '../components/FooterB';
import Helmets from '../components/Helmets';
import { Input } from '../components/Input';
import { InputPassword } from '../components/InputPassword';
import { changePassword } from '../redux/actions/auth';

const ChangePassword = ()=> {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()
  // const [username, setUsername] = useState()
  const queryParams = new URLSearchParams(window.location.search)
  const [username, setUsername] = useState(queryParams.get("username"))
  const [confirmCode, setConfirmCode] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  useEffect(() => {
    if(auth.message === 'Password was changed') {
      navigate(`/login?username=${username}`)
    }
  })

  const onChangePassword = () =>{
    const data = {username, confirmCode, password, confirmPassword}
    dispatch(changePassword(data))
    // navigate('/login')
  }
  return (
    <>
    {auth.token!==null && <Navigate to="/" />}
    <Helmets title={"Change Password"} />
    <main className="d-flex flex-wrap flex-lg-row">
      <div></div>
      <div className="left-container">
        <img src={background} alt="background" className="position-fixed" />
      </div>
      <div className="right-container pt-5">
        <div className="top-wrapper mx-auto">
          <h1 className="my-5">Change Password</h1>
          {auth.isError && auth.errorMsg && <div className='alert alert-danger mb-5'>{auth.errorMsg}</div>}
          {!auth.isError && <div className='alert alert-success mb-5'>{auth.message}</div>}
          {/* <form onSubmit={onChangePassword} className="login-form"> */}
            <Input type="text" placeholder="Email or username" value={username} id="username" variant="pink" onChange={e => setUsername(e.target.value)}/>
            <Input type="number" placeholder="Confirmation code" value={confirmCode} id="code" variant="pink" onChange={e => setConfirmCode(e.target.value)}/>
            <InputPassword placeholder={"New password"} variant="pink" value={password} onChange={e => setPassword(e.target.value)}/>
            <InputPassword placeholder={"Confirm new password"} variant="pink" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            <Button variant="dark" onAction={onChangePassword}>Change password</Button>
          {/* </form> */}
        </div>
        <FooterB />
      </div>
    </main>
    </>
  );
}

export default ChangePassword
