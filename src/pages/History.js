import React, { useState, useEffect } from 'react';
import { default as axios } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import history1 from '../assets/images/history-1.png';
import history2 from '../assets/images/history-2.png';
import Layout from '../components/Layout';

export function History() {
  const token = window.localStorage.getItem('token')
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if(!token){
      navigate('/login')
    }
    getVehicles();
  }, []);

  const getVehicles = async () => {
    const { data } = await axios.get('http://localhost:8000/popular?sortBy=id+DESC&limit=2');
    setVehicles(data.result);
  };
  const goToDetail = (id) => {
    navigate(`/vehicles/${id}`);
  };

  return (
    <Layout>
      <main className="container my-5">
        <div className="row">
          <div className="history-container col-12 col-lg-9">
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

              <div className="selection position-relative">
                <div className="select-all position-absolute">
                  <label className="container">
                    Delete
                            <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
              <div className="notification">
                <div className="today-section">
                  <h5>Today</h5>
                  <div className="select position-relative">
                    <div className="notif position-relative">
                              <p>Please finish your payment for vespa for Vespa Rental Jogja</p>
                              <div className="notif-arrow position-absolute">
                                <i className="fa-solid fa-chevron-right" />
                              </div>
                            </div>
                    <div className="history position-absolute">
                              <label className="container">
                                <input type="checkbox" name="history-1" />
                                <span className="checkmark" />
                              </label>
                            </div>
                  </div>
                  <div className="select position-relative">
                    <div className="notif position-relative">
                              <p>Your payment has been confirmed!</p>
                              <div className="notif-arrow position-absolute">
                                <i className="fa-solid fa-chevron-right" />
                              </div>
                            </div>
                    <div className="history position-absolute">
                              <label className="container">
                                <input type="checkbox" name="history-2" />
                                <span className="checkmark" />
                              </label>
                            </div>
                  </div>
                </div>
                <div className="week-section">
                  <h5>A week ago</h5>
                  <div className="select position-relative">
                    <div className="history position-absolute">
                              <label className="container">
                                <input type="checkbox" name="history-3" />
                                <span className="checkmark" />
                              </label>
                            </div>
                    <div className="vehicles d-flex flex-wrap">
                              <img src={history1} alt="history 1" />
                              <div className="rent-details">
                                <div className="date-detai">
                                  <h6>Vespa Matic</h6>
                                  <p>Jan 18 to 21 2021</p>
                                </div>
                                <div className="payment-status">
                                  <h6>Prepayment: Rp.245.000</h6>
                                  <p>Has been returned</p>
                                </div>
                              </div>
                            </div>
                  </div>
                  <div className="select position-relative">
                    <div className="history position-absolute">
                              <label className="container">
                                <input type="checkbox" name="history-4" />
                                <span className="checkmark" />
                              </label>
                            </div>
                    <div className="vehicles d-flex flex-wrap">
                              <img src={history2} alt="history 2" />
                              <div className="rent-details">
                                <div className="date-detai">
                                  <h6>Vespa Matic</h6>
                                  <p>Jan 18 to 21 2021</p>
                                </div>
                                <div className="payment-status">
                                  <h6>Prepayment: Rp.245.000</h6>
                                  <p>Has been returned</p>
                                </div>
                              </div>
                            </div>
                  </div>
                </div>
              </div>
              <div className="delete-button">
                <button>Delete selected item</button>
              </div>
            </div>
          </div>
          <div className="new-arrival col-12 col-lg-3">
            {vehicles.map((data, idx) => (
              <div className="new-vehicles position-relative py-3" style={{ cursor: 'pointer' }} onClick={() => goToDetail(data.id)}>
                <img className="img-fluid" src={data.image} alt={data.name} />
                <div className="location position-absolute bottom-0 bg-white p-2">
                  <h6 className="m-0">{data.name}</h6>
                  <p className="m-0">{data.location}</p>
                </div>
              </div>
            ))}

            <div className="another-vehicle">
              <Link to="/vehicles">
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

export default History;
