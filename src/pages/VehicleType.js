import React, { useState, useEffect } from 'react';
import { default as axios } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import PopularCar from './PopularCar';
import PopularMotorbike from './PopularMotorbike';
import PopularBike from './PopularBike';
import Layout from '../components/Layout';

export function VehicleType() {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
  // eslint-disable-next-line no-undef
  const {REACT_APP_BACKEND_URL} = process.env
  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = async () => {
    const { data } = await axios.get(`${REACT_APP_BACKEND_URL}popular?sortBy=totalRent+DESC&limit=4`);
    setVehicles(data.result);
  };
  const goToDetail = (id) => {
    navigate(`/vehicle/${id}`);
  };
  return (
    <Layout>

      <main className="container">
        <div className="popular-section py-5">
          <div className="heading-section d-flex align-items-center" style={{ width: '100%' }}>
            <h1 style={{ width: '50%' }}>Popular in town</h1>
            <div className="other-vehicles text-end" style={{ width: '50%' }}>
              <Link to="/popular-in-town" style={{ color: '#1572A1' }}>
                View all
                <FaChevronRight className="ms-3" />
              </Link>
            </div>
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
        </div>
        <PopularCar />
        <PopularMotorbike />
        <PopularBike />
      </main>
    </Layout>
  );
}

export default VehicleType;
