import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { makeReservation } from '../redux/actions/reservation';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import Helmets from '../components/Helmets';
import { getVehicleDetail } from '../redux/actions/vehicles';
import defaultImg from '../assets/images/default-img.png'
import { Loading } from '../components/Loading';

export const Reservation = () => {
  const {counter, detail} = useSelector(state=>state)
  const reservation = useSelector(state => state.reservation)
  const token = window.localStorage.getItem('seranToken')
  const userData = JSON.parse(window.localStorage.getItem('seranUserData'))
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [rentDate, setRentDate] = useState(new Date().setDate(new Date().getDate() + 1))
  const [returnDate, setReturnDate] = useState(new Date().setDate(new Date().getDate() + 2))
  const [minDate, setMinDate] = useState(new Date().setDate(new Date().getDate() + 1))
  // eslint-disable-next-line no-unused-vars
  const [errorForm, setErrorForm] = useState()
  useEffect(() => {
    if (reservation.data.id){
      navigate(`/payment/${reservation.data.id}`)
    } else {
      dispatch({
        type: 'RESERVATION_CLEAR'
      })
    }
    if(!token){
      navigate('/login')
    }
    if (detail.vehicle.length < 1){
      dispatch(getVehicleDetail(id))
    }
    setRentDate(new Date(rentDate).toLocaleDateString('en-CA'))
    setReturnDate(new Date(returnDate).toLocaleDateString('en-CA'))
    setMinDate(new Date(minDate).toLocaleDateString('en-CA'))
  }, []);

  
  const goBack = () => {
    window.history.back();
  };
  const onReservation = () => {
    setErrorForm()
    if (!userData.phone_number || !userData.name || !userData.address) {
      setErrorForm(`Dear ${userData.name ? userData.name : userData.username}, please make sure your profile is complete so we can process your order`)
    } else {
      const data = {vehicle_id: id, sum: counter.num, rent_date: rentDate, return_date: returnDate, recipient: userData.name, phone_number: userData.phone_number, email: userData.email, address: userData.address}
      dispatch(makeReservation(data, token))
    }
  }
  const detailPayment = () => {
    let list = []
    for (let i = 0; i<counter.num; i++) {
      list.push(
        <p key={i}>1 bike: Rp {detail.vehicle.cost?.toLocaleString('id-ID')}</p>
      )
    }
    return list
  }
  return (
    <>
    {reservation.data.id && <Navigate to={`/payment/${reservation.data.id}`}/>}
    <Layout>
      <Helmets title="Reservation" />
      <main className="container my-5">
        <div className="back-arrow" onClick={goBack}>
          <div to="/" className="d-flex my-5" style={{ color: 'black' }}>
            <FaChevronLeft className="fs-3 me-5" style={{ height: '80px' }} />
            <p className="fs-3 m-0" style={{ lineHeight: '80px' }}>Reservation</p>
          </div>
        </div>
        {errorForm && <div className='alert alert-danger mb-5'>{errorForm}</div>}
        {reservation.isError && reservation.errorMsg && <div className='alert alert-danger mb-5'>{reservation.errorMsg}</div>}
        <div className="detail-section row">
          <img src={detail.vehicle.image || defaultImg} onError={e => e.target.src=defaultImg} alt={detail.vehicle.name} className="col-12 col-md-7" />
          <div className="vehicle-details col-12 col-md-5">
            <h2 className="fs-1 fw-bold mb-4">
              {detail.vehicle.name} {detail.vehicle.year}
            </h2>
            <h3 className="fs-3 fw-bold mb-4">{detail.vehicle.location}</h3>
            <div className="res-quantity p-2 my-3 p-3">
              <p>Qt: {counter.num} bikes</p>
              <p>No prepayment</p>
            </div>
            <div className="detail-checkout p-3">
              {detailPayment()}
            </div>
          </div>
        </div>
        <div className=" mt-3 d-flex flex-column flex-md-row justify-content-center align-items-center">
          <div className="col-12 col-md-4">
            <p className="m-0 mb-4 p-0 me-5 fs-4 fw-bold">Reservation date: </p>
          </div>
          <div className="m-0 me-md-2 col-12 col-md-4">
            <p className="m-0 py-2">Rent date:</p>
            <Input type="date" variant="border" value={rentDate} onChange={e => setRentDate(e.target.value)} min={minDate}/>
          </div>
          <div className="m-0 me-md-2 col-12 col-md-4">
            <p className="m-0 py-2">Return date:</p>
            <Input type="date" variant="border" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
          </div>
        </div>
        <Button variant="border-light">Total: Rp {(detail.vehicle.cost * counter.num).toLocaleString('id-ID')}/day</Button>
        <Button variant="dark" onAction={() => onReservation()}>Go to payment</Button>
      </main>
      {reservation.isLoading && <div className="position-absolute top-0 start-0 position-fixed">
          <Loading />
        </div>}
    </Layout>
    </>
  );
}

export default Reservation;
