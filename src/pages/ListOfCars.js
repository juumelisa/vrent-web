import React, { useState, useEffect } from 'react';
import { default as axios } from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export function ListOfCar() {
  const [vehicles, setVehicles] = useState([]);
  const [page, setPage] = useState({});
  const {REACT_APP_BACKEND_URL} = process.env
  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = async () => {
    const { data } = await axios.get(`${REACT_APP_BACKEND_URL}popular/category=1?limit=16`);
    setVehicles(data.result);
    setPage(data.pageInfo);
  };

  const getNextData = async (url) => {
    const { data } = await axios.get(url);
    setVehicles([
      ...vehicles,
      ...data.result,
    ]);
  };
  return (
    <Layout>

      <section>
        <div className="popular-section">
          <div className="popular-vehicles">
            <div className="title">
              <h1>Popular in town</h1>
            </div>
            <div className="notes">
              <p className="text-center">Click item to see details and reservation</p>
            </div>
            <div className="vehicles d-flex flex-wrap justify-content-center">
              {vehicles.map((data, idx) => {
                const url = `/vehicles/${data.vehicle_id}`;
                return (
                  <div key={data.id} className="popular-vehicle p-2 position-relative">
                        <Link to={url}>
                          <img src={data.image} alt="data.vehicle_name" />
                          <div className="location position-absolute">
                          <h6>{data.vehicle_name}</h6>
                          <p>{data.location}</p>
                        </div>
                        </Link>
                      </div>
                );
              })}
            </div>
          </div>
        </div>
        {page.next !== null
                && (
                <div className="row my-5">
                  <div className="col-md-12 text-center">
                    <button onClick={() => getNextData(page.next)} className="btn btn-primary">Load More</button>
                  </div>
                </div>
                )}
      </section>
    </Layout>
  );
}

export default ListOfCar;
