import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Layout from '../components/Layout';
import { change } from '../redux/actions/counter';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/Button';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs'
import { getVehicleDetail } from '../redux/actions/vehicles';
import { Loading } from '../components/Loading';
import Helmets from '../components/Helmets';

export const Detail = () => {
  const {counter, detail} = useSelector(state=>state)
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [formQty, setFormQty] = useState(counter.num);
  const [love, setLove] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getVehicleDetail(id))
  }, []);

  // eslint-disable-next-line no-unused-vars
  // const getVehicles = async (id) => {
  //   try {
  //     const { data } = await getData(`${REACT_APP_BACKEND_URL}vehicles/${id}`, props.history);
  //     setVehicles(data.result);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
  const changeForm = (e)=>{
    change(e.target.value)
      setFormQty(e.target.value)
  }
  const onIncrement = ()=>{
    dispatch({type: 'INCREMENT'})
    setFormQty(counter.num)
  }
  const onDecrement = ()=>{
      if(counter.num>1){
        dispatch({type: 'DECREMENT'})
        setFormQty(counter.num)
    }
  }
  const goBack = () => {
    window.history.back();
  };
  const goToReservation = () => {
    change(formQty);
    navigate(`/reservation/${id}`)
  };
  return (
    <Layout>
      {!detail.isLoading && <Helmets title={`${detail.vehicle.name}`} />}
      <main className="container my-5">
        <div className="back-arrow" onClick={goBack}>
          <div to="/vehicles" className="d-flex my-5" style={{ color: 'black' }}>
            <FaChevronLeft className="fs-3 me-5" style={{ height: '80px' }} />
            <p className="fs-3 m-0" style={{ lineHeight: '80px' }}>Detail</p>
          </div>
        </div>
        {!detail.isLoading && !detail.isError && <div className="detail-vehicle d-flex flex-column flex-md-row">
          <div className="vehicle-pictures">
            <div className="main-image">
              <img src={detail.vehicle.image} alt={detail.vehicle.name} />
            </div>
            <div className="another-images row pt-4" style={{ width: '100%', margin: '0' }}>
              <div className="arrow col-2 col-sm-1 position-relative">
                <FaChevronLeft className="position-absolute top-50 start-0 translate-middle-y fs-2" />
              </div>
              <img src={detail.vehicle.image} alt={detail.vehicle.name} className="col-4 col-sm-5" />
              <img src={detail.vehicle.image} alt={detail.vehicle.name} className="col-4 col-sm-5" />
              <div className="arrow col-2 col-sm-1 position-relative">
                <FaChevronRight className="position-absolute top-50 end-0 translate-middle-y fs-3" />
              </div>
            </div>
          </div>
          <div className="detail position-relative col-6">
            <div className="city">
              <h2 className="fw-bold">
                {detail.vehicle.name} {detail.vehicle.year}
              </h2>
              <h3 className="fs-4 fw-bold mb-4">{detail.vehicle?.location}</h3>
            </div>
            <h4 className="fs-5 fw-bold m-0" style={{ color: '#087E0D' }}>Available</h4>
            <p className="m-0" style={{ color: '#9B0A0A' }}>No prepayment</p>
            <div className="about my-3">
              <p className="m-0">
                Capacity : {detail.vehicle.seat} person
              </p>
              <p className="m-0">
                Type : {detail.vehicle.type}
              </p>
              <p className="m-0">Reservation before 2 PM</p>
            </div>
            <p className="price fs-3 fw-bold text-center" style={{ color: 'black' }}>
              Rp {detail.vehicle.cost?.toLocaleString('id-ID')}/day
            </p>
            <div className="position-absolute bottom-0 start-50 translate-middle-x">
              <div className="d-flex flex-row justify-content-center align-items-center">
              <Button variant="light" onAction={onIncrement}>
                <p className="m-0 p-0 px-3 fw-bold">+</p>
              </Button>
              <input type="number" value={formQty} onChange={changeForm} className="border-0 text-center fs-3 mx-5" style={{outline: "none"}}/>
              <Button variant="border-light" onAction={onDecrement}>
                <p className="m-0 p-0 px-3 fw-bold">-</p>
              </Button>
              </div>
            </div>
          </div>
        </div>}
        <div className="d-flex flex-column flex-md-row mt-5">
          <Button variant="border-light">Chat Admin</Button>
          <div className="m-2"></div>
          <Button variant="dark" onAction={goToReservation}>Reservation</Button>
          <div className="m-2"></div>
          <Button variant="border-light" onAction={() => setLove(!love)}>
            <div className="d-flex flex-row justify-content-center align-items-center">
              {love && <BsSuitHeartFill className="me-3 text-danger" />}
              {!love && <BsSuitHeart className="me-3 text-danger"/>}
              <p className="m-0 p-0">Like</p>
            </div>
          </Button>
        </div>
      </main>
      {detail.isLoading && <div className="position-absolute position-fixed top-0 start-0 d-flex justify-content-center align-items-center vh-100 vw-100">
        <Loading />
      </div>}
      {detail.isError && <div className="position-absolute position-fixed top-0 start-0 d-flex justify-content-center align-items-center vh-100 vw-100">
        <h1>{detail.errorMsg}</h1>
      </div>}
    </Layout>
  );
}
const mapDispatchToProps = {change}
export default connect(mapDispatchToProps)(Detail);