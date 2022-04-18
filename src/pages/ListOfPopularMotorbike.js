import React, { useState, useEffect } from 'react';
import { default as axios } from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export function ListOfPopularMotorbike() {
  const [vehicles, setVehicles] = useState([]);
  const [page, setPage] = useState({});
  const navigate = useNavigate();
  // eslint-disable-next-line no-undef
  const {REACT_APP_BACKEND_URL} = process.env
  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = async () => {
    const { data } = await axios.get(`${REACT_APP_BACKEND_URL}popular?category=2&sortBy=totalRent+DESC&limit=16`);
    setVehicles(data.result);
    setPage(data.pageInfo);
  };

  const getNextData = async (url) => {
    const { data } = await axios.get(url);
    setVehicles([
      ...vehicles,
      ...data.result,
    ]);
    setPage(data.pageInfo);
  };
  const goToDetail = (id) => {
    navigate(`/vehicle/${id}`);
  };
  return (
    <Layout>
      <div className="container">
        <div className="title-section">
          <h1 className="mt-5">Popular motorbike</h1>
          <p className="text-center fs-4 fw-bold my-4" style={{ color: 'rgba(0,0,0,0.5)' }}>Click item to see details and reservation</p>
        </div>
        <div className="row vehicles">
          {vehicles.map((data) => (
            <div key={data.id} onClick={() => goToDetail(data.id)} className="col-12 col-md-6 col-lg-3 popular-vehicles position-relative py-3" style={{ cursor: 'pointer' }}>
              <img className="img-fluid" src={data.image} alt={data.name} />
              <div className="location position-absolute bottom-0 bg-white p-2">
                <h6 className="m-0">{data.name}</h6>
                <p className="m-0">{data.location}</p>
              </div>
            </div>
          ))}
        </div>
        {page.next !== null
                && (
                <div className="row my-5">
                  <div className="col-md-12 text-center">
                    <button onClick={() => getNextData(page.next)} className="btn btn-primary" style={{ backgroundColor: '#9AD0EC', border: 'none', color: 'black' }}>Load More</button>
                  </div>
                </div>
                )}
      </div>
    </Layout>
  );
}

export default ListOfPopularMotorbike;
