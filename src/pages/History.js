import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import defaultImg from '../assets/images/default-img.png';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { historyAdmin, historyUser } from '../redux/actions/histories';
import Helmets from '../components/Helmets';
import { twoDates } from '../helpers/dateToString';
import { getVehicles } from '../redux/actions/vehicles';
import { Input } from '../components/Input';

export const  History = () => {
  const token = window.localStorage.getItem('seranToken')
  const userData = JSON.parse(window.localStorage.getItem('seranUserData'))
  const {histories, vehicles} = useSelector(state => state)
  const [selectedId, setSelectedId] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getVehicles()
    if(userData.role === 'admin') {
      console.log('admin')
      console.log(dispatch(historyAdmin(token)))
      dispatch(historyAdmin(token))
    } else if (userData.role === 'User') {
      dispatch(historyUser(token))
    } else {
      navigate('/login')
    }
  }, []);
  const handleValue = e => {
    if(e.target.checked) {
      setSelectedId([...selectedId, e.target.value])
    }
    else{
      setSelectedId(selectedId.filter(el => el !== e.target.value))
    }
  }
  const goToDetail = id => {
    navigate(`/vehicle/${id}`)
  }
  return (
    <Layout>
      <Helmets title="History" />
      <main className="container my-5">
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="position-relative">
              <Input type="text" variant="pink" />
              <FaSearch className="position-absolute top-50 end-0 translate-middle-y me-3" size={24} style={{cursor: "pointer"}}/>
            </div>
            <div className="search-history">
              <form className="history-form position-relative">
                <input type="text" name="history" placeholder="Search history" />
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Filter</button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><button name="filter" type="submit" value="type">Type</button></li>
                    <li><button name="filter" type="submit" value="data-added">Data Added</button></li>
                    <li><button name="filter" type="submit" value="name">Name</button></li>
                    <li className="favorite"><button name="filter" type="submit" value="favorite">Favorite Product</button></li>
                  </ul>
                </div>
                <button type="submmit" className="position-absolute" style={{ right: '0', width: '30px' }}>
                  <FaSearch />
                </button>
              </form>
              <div className="delete-button">
                <button>Delete selected item</button>
              </div>
            </div>
          </div>
          
          {!histories.isLoading && !histories.isError && <div className="col-12 col-lg-8">
            {histories.data.map((data) => (
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
                  <input className="position-absolute top-0 start-100 translate-middle-x opacity-0" type="checkbox" value={data.id} onChange={handleValue} id="history" />
                  <span className="checkmark position-absolute top-0 start-100 translate-middle-x"></span>
                </div>
              </div>
            ))}
          </div>}
          <div className="new-arrival col-12 col-lg-3">
            {!vehicles.isLoading && !vehicles.isError && <div>
            {vehicles.vehicles.map((data) => (
              <div key={data.id} className="new-vehicles position-relative py-3" style={{ cursor: 'pointer' }} onClick={() => goToDetail(data.id)}>
                <img className="img-fluid" src={data.image} alt={data.name} />
                <div className="location position-absolute bottom-0 bg-white p-2">
                  <h6 className="m-0">{data.name}</h6>
                  <p className="m-0">{data.location}</p>
                </div>
              </div>
            ))}
            </div>}
            <div className="another-vehicle">
              <Link to="/vehicle">
                View more
                <i className="fa-solid fa-chevron-down" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default History
