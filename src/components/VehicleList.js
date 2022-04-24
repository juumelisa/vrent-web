import React from "react";
import { Link } from "react-router-dom";

export const VehicleList = ({role}) => {
  <div className="py-5">
          <div className="heading-section d-flex align-items-center my-3" style={{ width: '100%' }}>
            {role === 'admin' &&
              <div>
                <Link to="/add-item">Add New Item</Link>
              </div>
            }
            <h1 style={{ width: '50%' }}>Popular in town</h1>
            <div className="other-vehicles text-end" style={{ width: '50%' }}>
              <Link to="/popular-in-town" style={{ color: '#1572A1' }}>
                View all
                {/* <FaChevronRight className="ms-3" /> */}
              </Link>
            </div>
          </div>
          <div className="row">
            {/* {vhc.vehicles.map((data) => (
              <div key={data.id} onClick={() => goToDetail(data.id)} className="col-12 col-md-6 col-lg-3 popular-vehicles position-relative py-3" style={{ cursor: 'pointer' }}>
                <img className="img-fluid" src={data.image} alt={data.name} />
                <div className="location position-absolute bottom-0 bg-white p-2">
                  <h6 className="m-0">{data.name}</h6>
                  <p className="m-0">{data.location}</p>
                </div>
              </div>
            ))} */}
          </div>
        </div>
}