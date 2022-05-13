import { useEffect, useState } from 'react';
import React, { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import background from '../assets/images/login-background.png';
import { Button } from '../components/Button';
import FooterB from '../components/FooterB';
import Helmets from '../components/Helmets';
import { Input } from '../components/Input';
import { confirmAccount } from '../redux/actions/auth';

const AccountConfirmation = ()=> {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(window.location.search)
  const [email, setEmail] = useState(queryParams.get("email"))
  const [code, setCode] = useState()
  useEffect(() => {
    if (auth.message==='Thanks for confirm your account'){
      navigate(`/login?username=${email}`)
    }
  }, [])

  const onConfirm = () =>{
    dispatch(confirmAccount(email, code))
    // navigate('/login')
  }
  return (
    <>
    {auth.token!==null && <Navigate to="/" />}
    <Helmets title="Account Confirmation" />
    <main className="d-flex flex-wrap flex-lg-row">
      <div></div>
      <div className="left-container">
        <img src={background} alt="background" className="position-fixed" />
      </div>
      <div className="right-container pt-5">
        <div className="top-wrapper mx-auto">
          <h1 className="my-5">Account Confirmation</h1>
          {auth.isError && auth.errorMsg && <div className='alert alert-danger mb-5'>{auth.errorMsg}</div>}
          {!auth.isError && auth.message && <div className='alert alert-success mb-5'>{auth.message}</div>}
          <Input type="email" variant="pink" value={email} onChange={e => setEmail(e.target.value)} />
          <Input type="number" variant="pink" value={code} onChange={e => setCode(e.target.value)} />
          <Button variant="light" onAction={onConfirm}>Confirm account</Button>
        </div>
        <FooterB />
      </div>
    </main>
    </>
  );
}

export default AccountConfirmation
