// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import googleLogo from '../assets/images/google-logo.png';
import background from '../assets/images/login-background.png';
import { Button } from '../components/Button';
import FooterB from '../components/FooterB';
import { Input } from '../components/Input';
import { InputPassword } from '../components/InputPassword';
// eslint-disable-next-line no-unused-vars
import { register } from '../redux/actions/auth';
import loadingGif from '../assets/images/50820-blue-loading.gif'
import Helmets from '../components/Helmets';

export const Register=()=> {
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate()
  const token = window.localStorage.getItem('seranToken')
  const auth = useSelector(state => state.auth)
  const [name, setName] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    if(token) {
      navigate('/')
    }else {
      dispatch({
        type: 'AUTH_CLEAR'
      })
    }
  }, [])

  useEffect(() => {
    if(auth.message) {
      navigate(`//account-confirmation?email=${email}`)
    }
  }, [])

  const onRegister = () =>{
    setErrorMessage()
    dispatch({
      type: 'AUTH_CLEAR'
    })
    if (!name || !username || !email || !password) {
      setErrorMessage('Please fill in all the fields')
    }
    const data = {name, username, email, password, confirmPassword: password}
    dispatch(register(data))
  }
  return (
    <>
    {auth.message!==null && <Navigate to={`/account-confirmation?email=${email}`} />}
    <Helmets title={"Register"} />
    <main className="d-flex flex-wrap flex-lg-row">
      <div className="left-container">
        <img src={background} alt="background" className="position-fixed" />
      </div>
      <div className="right-container pt-5">
        <div className="top-wrapper mx-auto">
          <h1 className="my-5">Signup</h1>
          {errorMessage && <div className='alert alert-danger mb-5'>{errorMessage}</div>}
          {auth.isError && auth.errorMsg && <div className='alert alert-danger mb-5'>{auth.errorMsg}</div>}
          {!auth.isError && auth.errorMsg && <div className='alert alert-success mb-5'>{auth.errorMsg}</div>}
          {/* <form className="login-form"> */}
            <Input type="text" placeholder="Name" variant="pink" value={name} onChange={e => setName(e.target.value)} required/>
            <Input type="text" placeholder="Username" variant="pink" value={username} onChange={e => setUsername(e.target.value)} />
            <Input type="email" placeholder="Email" variant="pink" value={email} onChange={e => setEmail(e.target.value)} />
            <InputPassword placeholder="Password" variant={"pink"} value={password} onChange={e => setPassword(e.target.value)}/>            
          {/* </form> */}
          <Button variant="light" onAction={() => onRegister()}>Register</Button>
          <div className="login-way d-flex">
            <div className="line" />
            <div className="way fs-5 text-center">or try another way</div>
            <div className="line" />
          </div>
          <Button variant="white">
            <div className="d-flex flex-row justify-content-center">
              <img src={googleLogo} width={30} height={30}/>
              <p className="m-0 p-0 ms-2">Signup with google</p>
            </div>
          </Button>
          <Button variant="dark" onAction={() => navigate('/login')}>Login</Button>
        </div>
        <FooterB />
      </div>
      {auth.isLoading && <div className="position-absolute top-0 start-0 vh-100 vw-100 d-flex justify-content-center align-items-center">
        <div className="bg-white shadow-lg rounded-3 px-5 py-2">
          <img src={loadingGif} width={100} height={100} alt="Loading" />
        </div>
      </div>}
    </main>
    </>
  );
}

export default Register;
