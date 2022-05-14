import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import defaultImg from '../assets/images/default-img.png';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHistoryAdmin, deleteHistoryUser, historyAdmin, historyUser } from '../redux/actions/histories';
import Helmets from '../components/Helmets';
import { twoDates } from '../helpers/dateToString';
import { getVehicles } from '../redux/actions/vehicles';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { BsFillPatchCheckFill, BsXOctagonFill } from 'react-icons/bs'

export const  History = () => {
  const token = window.localStorage.getItem('seranToken')
  const userData = JSON.parse(window.localStorage.getItem('seranUserData'))
  const [history, setHistory] = useState(JSON.parse(window.localStorage.getItem('seranHistory')))
  const {histories, vehicles} = useSelector(state => state)
  const [selectedId, setSelectedId] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorSelection, setErrorSelection] = useState()
  const [deleteHistory, setDeleteHistory] = useState(false)
  useEffect(() => {
    if(token) {
      if(userData.role === 'admin' || userData.role === 'Admin') {
        dispatch(historyAdmin(token))
      } else{
        dispatch(historyUser(token))
      }
    } else {
        navigate('/login')
    }
    dispatch(getVehicles())
  }, []);
  const checkAll = e => {
    const check = document.getElementsByName("history")
    if(e.target.checked){
      setSelectedId(history.map(data => data.id))
      for(let i=0; i < check.length; i++) {
        check[i].checked = true
      }
    } else {
      setSelectedId([])
      for(let i=0; i < check.length; i++) {
        check[i].checked = false
      }
    }
  }
  const handleValue = e => {
    setSelectedId(selectedId.filter(el => el !== parseInt(e.target.value)))
    if(e.target.checked) {
      setSelectedId([...selectedId, parseInt(e.target.value)])
    }
    else{
      document.getElementById("selectAll").checked = false
    }
  }
  const handleDelete = () => {
    if(selectedId.length < 1) {
      setErrorSelection('Checklist the box to select item you want to delete')
    }else{
      setErrorSelection()
      setDeleteHistory(true)
      selectedId.forEach( x => {
        if (userData.role === 'Admin') {
          dispatch(deleteHistoryAdmin(token, x))
        } else {
          dispatch(deleteHistoryUser(token, x))
        }
        setHistory(history.filter(el => el.id !== x))
      })
    }
  }
  const goToDetail = id => {
    navigate(`/vehicle/${id}`)
  }
  return (
    <div>
    <Layout>
      <Helmets title="History" />
      <main className="container my-5">
        <div className="row">
          <div className="col-12 col-lg-8"></div>
          {!histories.isLoading && histories.isError && <div className="col-12 col-lg-8 d-flex justify-content-center align-items-center vh-100">
            <h1>{histories.errorMsg}</h1>
          </div>}
          {history && history.length > 0 && <div className="col-12 col-lg-8">
            <div className="position-relative">
              <Input type="text" variant="pink" />
              <FaSearch className="position-absolute top-50 end-0 translate-middle-y me-3" size={24} style={{cursor: "pointer"}}/>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-center">
              <div className="col-12 col-md-6">
                <Button variant="border-light">Filter</Button>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-end">
                <p className="m-0 p-0 fs-5">Select all</p>
                <div className="position-relative d-flex justify-content-end col-2">
                  <input className="position-absolute top-0 start-100 translate-middle-x opacity-0" type="checkbox" onChange={checkAll} id="selectAll"/>
                  <span className="checkmark position-absolute top-0 start-100 translate-middle-x"></span>
                </div>
              </div>
            </div>
            {errorSelection && <div className='alert alert-danger mb-5'>{errorSelection}</div>}
            {history.map((data) => (
              <div key={data.id} className="d-flex flex-row py-3">
                <div className="col-9 d-flex flex-column flex-md-row">
                  <img className="img-fluid col-12 col-md-6" src={data.image} onError={e => e.target.src=defaultImg} alt={data.id} style={{height: "200px", borderRadius: "20px", objectFit: "cover"}} />
                  <div className="col-12 col-md-6 px-3">
                    <p className="fw-bold p-0 m-0">{data.vehicle}</p>
                    <p>{twoDates(data.rent_date, data.return_date)}</p>
                    <p className="fw-bold p-0 m-0">Prepayment: {data.min_prepayment.toLocaleString("id-ID")}</p>
                    <p className={`${data.status === 'Cancelled' ? 'text-danger' : 'text-success'}`}>{data.status}</p>
                  </div>
                </div>
                <div className="position-relative d-flex justify-content-end col-3">
                  <input className="position-absolute top-0 start-100 translate-middle-x opacity-0" type="checkbox" value={data.id} onChange={handleValue} name="history" />
                  <span className="checkmark position-absolute top-0 start-100 translate-middle-x"></span>
                </div>
              </div>
              
            ))}
            <Button variant="dark" onAction={handleDelete}>Delete selected items</Button>
          </div>}
          <div className="col-1"></div>
          <div className="col-12 col-lg-3 border rounded-3 px-3 mt-5 mt-lg-0">
            {!vehicles.isLoading && !vehicles.isError && <div>
              <h1 className="text-center my-3">New Arrival</h1>
            {vehicles.vehicles.map((data) => (
              <div key={data.id} className="new-vehicles position-relative py-3" style={{ cursor: 'pointer' }} onClick={() => goToDetail(data.id)}>
                <img className="img-fluid" src={data.image} alt={data.name} onError={e => e.target.src={defaultImg}} />
                <div className="location position-absolute bottom-0 bg-white p-2">
                  <h6 className="m-0">{data.name}</h6>
                  <p className="m-0">{data.location}</p>
                </div>
              </div>
            ))}
            </div>}
            <div className="text-center my-3">
              <Link to="/vehicle" className="fs-3" style={{color: "black"}}>
                View more
                <i className="fa-solid fa-chevron-down" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
      {!histories.isLoading && deleteHistory && <div className="position-absolute top-0 start-0 vh-100 vw-100 bg-dark bg-opacity-25 d-flex justify-content-center align-items-center position-fixed" onClick={() => setDeleteHistory(false)}>
        {!histories.isError && <div className="bg-white p-5 shadow-lg rounded-3">
          <BsFillPatchCheckFill size={50} className="text-success"/>
          <p>{histories.message}</p>
        </div>}
        {histories.isError && <div className="bg-white p-5 shadow-lg rounded-3">
          <BsXOctagonFill size={50} className="text-danger"/>
          <p>{histories.errorMsg}</p>
        </div>}
      </div>}
        {histories.isLoading && <div className="position-absolute top-0 start-0 position-fixed">
          <Loading />
        </div>}
    </div>
  );
}

export default History
