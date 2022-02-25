import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import {default as axios} from 'axios'
import { Link } from 'react-router-dom'
import PopularCar from './PopularCar'
import PopularMotorbike from './PopularMotorbike'
import PopularBike from './PopularBike'

export const VehicleType = ()=>{
  const [vehicles, setVehicles] = useState([])
  const [car, setCar] = useState([])
  useEffect(()=>{
      getVehicles()
      getCar()
  },[])

  const getVehicles = async ()=> {
      const {data} = await axios.get('http://localhost:8000/popular?limit=4')
      setVehicles(data.result)
  }

  const getCar = async ()=>{
    const {data} = await axios.get('http://localhost:8000/popular/:category_id?limit=4')
    setCar(data.result)
  }
        return(
            <Layout>
            <section>
              <form className="position-relative">
                <input type="text" name="vehicle" placeholder="Search vehicle (ex. cars, cars name)" />
                <button className="position-absolute"><i className="fa-solid fa-magnifying-glass"></i></button>
              </form>
              <div className="popular-section">
                <div className="popular-vehicles">
                  <div className="sub-title d-flex flex-wrap">
                    <h1>Popular in town</h1>
                    <div className="other-vehicles ms-auto">
                      <Link to="/popular-in-town">View all <i className="fa-solid fa-angle-right"></i></Link>
                    </div>
                  </div>
                  <div className="vehicles d-flex flex-wrap justify-content-center">
                    {vehicles.map((data, idx)=>{
                      let url = `/vehicles/${data.vehicle_id}`
                      return(
                        <div className="popular-vehicle p-2 position-relative">
                          <Link to={url}>
                            <img src={data.image} alt="data.vehicle_name"/>
                            <div className="location position-absolute">
                              <h6>{data.vehicle_name}</h6>
                              <p>{data.location}</p>
                            </div>
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="popular-cars">
                  <div className="sub-title d-flex flex-wrap">
                    <h1>Cars</h1>
                    <div className="other-vehicles ms-auto">
                      <Link to="/">View all <i className="fa-solid fa-angle-right"></i></Link>
                    </div>
                  </div>
                  <PopularCar/>
                </div>
                <div className="popular-motorbike">
                  <div className="sub-title d-flex flex-wrap">
                    <h1>Motorbike</h1>
                    <div className="other-vehicles ms-auto">
                      <a href="#">View all <i className="fa-solid fa-angle-right"></i></a>
                    </div>
                  </div>
                  <PopularMotorbike/>
                </div>
                <div className="popular-bike">
                  <div className="sub-title d-flex flex-wrap">
                    <h1>Bike</h1>
                    <div className="other-vehicles ms-auto">
                      <a href="#">View all <i className="fa-solid fa-angle-right"></i></a>
                    </div>
                  </div>
                  <div className="vehicles d-flex flex-wrap justify-content-center">
                    {car.map((data, idx)=>{
                      let url='/detail-vehicle/:'+data.vehicle_id
                      return(
                        <div className="popular-vehicle p-2 position-relative">
                          <Link to={url}>
                            <img src={data.image} alt="data.vehicle_name"/>
                            <div className="location position-absolute">
                              <h6>{data.vehicle_name}</h6>
                              <p>{data.location}</p>
                            </div>
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                  <PopularBike/>
                </div>
              </div>
            </section>
        </Layout>
        )
}

export default VehicleType