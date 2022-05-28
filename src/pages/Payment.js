import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import Layout from '../components/Layout';
import { connect, useDispatch, useSelector } from 'react-redux';
import { makeReservation } from '../redux/actions/reservation';
import { Button } from '../components/Button';
import { editHistoryStatus, getHistoryDetail, historyAdmin, historyUser } from '../redux/actions/histories';
import Helmets from '../components/Helmets';
import defaultImg from '../assets/images/default-img.png';
import { Loading } from '../components/Loading';
import Helmet from 'react-helmet';
// eslint-disable-next-line no-unused-vars
import { createPayment, getPaymentStatus } from '../redux/actions/payment';
import { dateDifference } from '../helpers/dateToString';
// eslint-disable-next-line no-undef
const {MIDTRANS_CLIENT_KEY} = process.env

export const Payment = () =>{
  const token = window.localStorage.getItem('seranToken')
  const userData = JSON.parse(window.localStorage.getItem('seranUserData'))
  const {vehicles, histories, payment, reservation} = useSelector(state=>state)
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search)
  const [newData, setNewData] = useState(queryParams.get("new"))
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (newData) {
      createPaymentStatus();
    }
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
  useEffect(() => {
    dispatch(getPaymentStatus(id))
  }, [])
  useEffect(() => {
    if (histories.detail.status === 'Wait for payment' && payment.data.transaction_status === 'settlement') {
      dispatch(editHistoryStatus(token, {status: 'Booked', id: payment.data.order_id}))
    }
  }, [])
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
  // eslint-disable-next-line no-unused-vars
  const createPaymentStatus = () => {
    const parameter = {
      "transaction_details": {
          "order_id": id,
          "gross_amount": reservation.data.cost * reservation.data.sum * dateDifference(reservation.data.rent_date, reservation.data.return_date)
      },
      "item_details": [{
        "id": reservation.data.vehicle_id,
        "price": reservation.data.cost * dateDifference(reservation.data.rent_date, reservation.data.return_date),
        "quantity": reservation.data.sum,
        "name": `${reservation.data.vehicle} (${dateDifference(reservation.data.rent_date, reservation.data.return_date)} days)`,
        "merchant_name": "SERAN"
      }],
      "customer_details": {
        "first_name": userData.name,
        "last_name": "",
        "email": userData.email,
        "phone": `+62${parseInt(userData.phone_number)}`,
      },
      "credit_card":{
        "secure" : true
    },
  }
    dispatch(createPayment(parameter))
    setNewData()
  }
  const updatePayment = () => {
    window.snap.pay(payment.data.token, {
      onSuccess: () => navigate(`/payment/${id}`),
      onPending: () => navigate(`/payment/${id}`),
      onError: () => navigate(`/payment/${id}`)
    })
  }
  return (
    <div className="position-relative">
    <Layout>
      <Helmet>
      <script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key={`<${MIDTRANS_CLIENT_KEY}>`}></script>
      </Helmet>
      <Helmets title="Reservation Detail" />
      <main className="container my-5">
        <div className="back-arrow">
          <div className="d-flex my-5" style={{ color: 'black', cursor: "pointer"}} onClick={() => navigate('/history')}>
            <FaChevronLeft className="fs-3 me-md-5" style={{ height: '80px' }} />
            <p className="fs-3 m-0" style={{ lineHeight: '80px' }}>Reservation Detail</p>
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
                <p className="py-0 my-0">{histories.detail.sum} x Rp {histories.detail.cost?.toLocaleString('id-ID')} x {dateDifference(histories.detail.rent_date, histories.detail.return_date)} days</p>
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
              {payment.data.transaction_status === 'settlement' && histories.detail.status === 'Booked' && <h3 className='text-success'>Payment Success!</h3>}
              <div className="detail-checkout">
                <p className="fw-bold">Order details: </p>
                {detailPayment()}
              </div>
              <div className='border-0 border-top pt-2 text-end'>
                <p>Rp {(histories.detail.cost*histories.detail.sum).toLocaleString('id-ID')} x {dateDifference(histories.detail.rent_date, histories.detail.return_date)} days</p>
              </div>
              <div className='border-0 border-top pt-2 text-end'>
                <p className='fw-bold'>Total: Rp {(histories.detail.cost*histories.detail.sum*dateDifference(histories.detail.rent_date, histories.detail.return_date)).toLocaleString('id-ID')}</p>
              </div>
              <div className="mb-3">
              </div>
              {histories.detail.status === 'Wait for payment' && <Button variant="light" onAction={updatePayment}>
                <div className="d-flex justify-content-center">
                  <p className="m-0 p-0">Finish payment</p>
                  <p className="m-0 p-0 ms-2 text-danger">59:30</p>
                </div>
              </Button>}
              {(histories.detail.status === 'Booked' || histories.detail.status === 'Wait for payment') && <Button variant="dark" onAction={cancelOrder}>Cancel Transaction</Button>}
              {histories.detail.status !== 'Booked' && histories.detail.status !== 'Wait for payment' && <Button variant="border-light">{histories.detail.status}</Button>}
          </div>
        </div>}
      </main>
      {histories.isLoading && <div className="position-absolute top-0 start-0 position-fixed">
          <Loading />
        </div>}
    {/* <div className="position-absolute position-fixed top-0 start-0 vh-100 vw-100" style={{width: "100%", zIndex: 999}}>
      <div className="opacity-25 bg-secondary vh-100 vw-100"></div>
      <div className="bg-white p-5 d-flex position-absolute top-50 start-50 translate-middle rounded shadow">
        <div>
          <h2>Payment Detail</h2>
          <p>BANK TRANSFER</p>
        </div>
      </div>
    </div> */}
    </Layout>
    </div>
  );
}

const mapStateToProps = state=>({reservation: state.reservation})
const mapDispatchToProps = {makeReservation}
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
