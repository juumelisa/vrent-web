import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { getData } from '../helpers/http';
import Layout from '../components/Layout';
import { connect, useDispatch, useSelector } from 'react-redux';
import { makeReservation } from '../redux/actions/reservation';

export const Payment = (props) =>{
  const token = window.localStorage.getItem('token')
  const dispatch = useDispatch()
  const [vehicles, setVehicles] = useState([]);
  const {counter} = useSelector(state=>state)
  const {reservation} = useSelector(state=>state)
  const { id } = useParams();
  const navigate = useNavigate()
  const {REACT_APP_BACKEND_URL} = process.env
  useEffect(() => {
    if(!token){
      navigate('/login')
    }
    getVehicles(id);
  }, []);

  const getVehicles = async (id) => {
    try {
      const { data } = await getData(`${REACT_APP_BACKEND_URL}vehicles/${id}`, props.history);
      setVehicles(data.result);
    } catch (err) {
      console.log(err.message);
    }
  };

  const finalReservation = () =>{
    const vehicle_id = reservation.vehicle_id
    const sum = reservation.total
    const rent_date = reservation.rentDate
    const return_date = reservation.returnDate
    const data = {vehicle_id, sum, rent_date, return_date}
    console.log(data)
    makeReservation(data, token)
  }
  return (
    <Layout>
      <main className="container my-5">
        <div className="back-arrow">
          <Link to="/" className="d-flex my-5" style={{ color: 'black' }}>
            <FaChevronLeft className="fs-3 me-md-5" style={{ height: '80px' }} />
            <p className="fs-3 m-0" style={{ lineHeight: '80px' }}>Reservation</p>
          </Link>
        </div>
        <div className="row">
          <div className="order-section col-12 col-md-8 pe-5">
            <div className="user-identity pb-3">
              <p className="fw-bold">Identity: </p>
              <div className="user-contact pb-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <p className="py-0 my-0">Samantha Doe (+6290987682)</p>
                <p className="py-0 my-0">samanthadoe@mail.com</p>
              </div>
            </div>
            <div className="vehicle-detail d-flex">
              <img src={vehicles?.image} alt={vehicles?.name} width="100%" height="100%" />
              <div className="ms-3">
                <p className="fs-4 fw-bold">
                  {vehicles?.name}
                  {' '}
                  {vehicles?.year}
                </p>
                <p className="py-0 my-0">Location: {vehicles?.location}</p>
                <p className="py-0 my-0">{counter.num} x Rp{vehicles?.cost}</p>
                <p className="py-0 my-0">Rp{counter.num * vehicles?.cost}</p>
              </div>
            </div>
          </div>
          <div className="payment-section col-12 col-md-4">
            <form onSubmit={finalReservation}>
              <div className="payment code fw-bold">Payment Code</div>
              <div className="copy-code row fw-bold fs-4">
                <p className="col-8">#FG1209878YZS</p>
                <p className="fw-bold col-4 text-center">Copy</p>
              </div>
              <div className="detail-checkout">
                <p className="fw-bold">Order details: </p>
                <p>
                  {' '}
                  1 bike: Rp.
                      {vehicles?.cost}
                </p>
                <p style={{ borderBottom: '1px solid black' }}>
                  {' '}
                  1 bike: Rp.
                      {vehicles?.cost}
                </p>
                <p className="fw-bold">
                  Total: Rp.
                      {vehicles?.cost * counter.num}
                </p>
              </div>
              <div className="payment-method">
                <input type="text" placeholder="Select payment method" style={{ width: '100%' }} />
              </div>
              <button type="submit">
                Finish payment:
                <span>59:30</span>
              </button>
            </form>
          </div>
        </div>

      </main>
    </Layout>
  );
}

const mapStateToProps = state=>({reservation: state.reservation})
const mapDispatchToProps = {makeReservation}
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
