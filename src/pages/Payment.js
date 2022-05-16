import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import Layout from '../components/Layout';
import { connect, useDispatch, useSelector } from 'react-redux';
import { makeReservation } from '../redux/actions/reservation';
import { Button } from '../components/Button';
import { editHistoryStatus, getHistoryDetail, historyAdmin, historyUser } from '../redux/actions/histories';
import Helmets from '../components/Helmets';
import defaultImg from '../assets/images/default-img.png';
import { Loading } from '../components/Loading';

export const Payment = () =>{
  const token = window.localStorage.getItem('seranToken')
  const userData = window.localStorage.getItem('seranUserData')
  const {vehicles, histories} = useSelector(state=>state)
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [toHistory, setToHistory] = useState(false)
  useEffect(() => {
    if(!token){
      navigate('/login')
    }else {
      dispatch(getHistoryDetail(token, id))
      if(userData.role === 'Admin' || userData.role === 'admin'){
        dispatch(historyAdmin(token))
      } else {
        dispatch(historyUser(token))
      }
    }
  }, []);

  const finishPayment = () => {
    dispatch(editHistoryStatus(token, {status: 'Booked', id}))
    setToHistory(true)
  }
  const cancelOrder = () => {
    dispatch(editHistoryStatus(token, {status: 'Cancelled', id}))
  }
  const detailPayment = () => {
    let list = []
    for (let i = 0; i<histories.detail.sum; i++) {
      list.push(
        <p key={i}>1 bike: Rp {histories.detail.cost?.toLocaleString('id-ID')}</p>
      )
    }
    return list
  }
  return (
    <>
    {!histories.isLoading && toHistory && <Navigate to="/history" />}
    <Layout>
      <Helmets title="Reservation Detail" />
      <main className="container my-5">
        <div className="back-arrow">
          <div className="d-flex my-5" style={{ color: 'black', cursor: "pointer"}} onClick={() => window.history.back()}>
            <FaChevronLeft className="fs-3 me-md-5" style={{ height: '80px' }} />
            <p className="fs-3 m-0" style={{ lineHeight: '80px' }}>Reservation</p>
          </div>
        </div>
        {histories.isError && <div className='alert alert-danger mb-5'>{histories.errorMsg}</div>}
        {!histories.isLoading && <div className="row">
          <div className="order-section col-12 col-md-8 pe-5">
            <div className="user-identity pb-3">
              <p className="fw-bold">Identity: </p>
              <div className="user-contact pb-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <p className="py-0 my-0">{histories.detail.recipient}</p>
                <p className="py-0 my-0">{histories.detail.email}</p>
              </div>
            </div>
            <div className="vehicle-detail d-flex">
              <img src={histories.detail.image} onError={e => e.target.src={defaultImg}} alt={vehicles?.name} width="100%" height="100%" />
              <div className="ms-3">
                <p className="fs-4 fw-bold">{histories.detail.vehicle}</p>
                <p className="py-0 my-0">Location: {histories.detail.location}</p>
                <p className="py-0 my-0">{histories.detail.sum} x Rp {histories.detail.cost?.toLocaleString('id-ID')}</p>
                <p className="py-0 my-0">Rp {histories.detail.total_cost?.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>
          <div className="payment-section col-12 col-md-4">
              <div className="payment code fw-bold">Payment Code</div>
              <div className="copy-code row fw-bold fs-4">
                <p className="col-8">#FG1209878YZS</p>
                <p className="fw-bold col-4 text-center">Copy</p>
              </div>
              <div className="detail-checkout">
                <p className="fw-bold">Order details: </p>
                {detailPayment()}
              </div>
              <div className="mb-3">
              {histories.detail.status === 'Wait for payment' && <select className="form-select" aria-label="Disabled select example" disabled>
                <option selected>Payment method</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>}
              </div>
              {histories.detail.status === 'Wait for payment' && <Button variant="light" onAction={finishPayment}>
                <div className="d-flex justify-content-center">
                  <p className="m-0 p-0">Finish payment</p>
                  <p className="m-0 p-0 ms-2 text-danger">59:30</p>
                </div>
              </Button>}
              {(histories.detail.status === 'Booked' || histories.detail.status === 'Wait for payment') && <Button variant="dark" onAction={cancelOrder}>Cancel</Button>}
              {histories.detail.status !== 'Booked' && histories.detail.status !== 'Wait for payment' && <Button variant="border-light">{histories.detail.status}</Button>}
          </div>
        </div>}
      </main>
      {histories.isLoading && <div className="position-absolute top-0 start-0 position-fixed">
          <Loading />
        </div>}
    </Layout>
    </>
  );
}

const mapStateToProps = state=>({reservation: state.reservation})
const mapDispatchToProps = {makeReservation}
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
