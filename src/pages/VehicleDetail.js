import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getData } from "../helpers/http";

export const VehicleDetail = (props)=>{
  const [vehicles, setVehicles] = useState([])
  const {id} = useParams()
  const [page, setPage] = useState({})

  useEffect(()=>{
      getVehicles(id)
  }, [])

  const getVehicles = async (id)=> {
    try{
      const {data} = await getData(`http://localhost:8000/vehicles/${id}`, props.history)
      setVehicles(data.result)
      setPage(data.pageInfo)
    }catch(err){
      console.log(err.message)
    }
  }
        return(
            <Layout>

            <section>
              <div className="back-arrow">
                <a href="popular-in-town.html" className="d-inline-flex justify-content-start">
                  <i className="fa-solid fa-chevron-left sm-me-2 me-5"></i>
                  <p>Detail</p>
                </a>
              </div>
              <div className="vehicle">
                <div className="vehicle-details d-flex flex-wrap position-relative">
                  <div className="vehicle-image p-3">
                    <div className="main-image">
                      <img src={vehicles?.image} alt={vehicles?.name}/>
                    </div>
                    <div className="other-images px-5 my-3 position-relative">
                      <div className="these-img d-flex">
                        <img className="p-2" src={vehicles?.image} alt={vehicles?.name} />
                        <img className="p-2" src={vehicles?.image} alt={vehicles?.name} />
                      </div>
                      <div className="arrow position-absolute top-50 start-0 translate-middle">
                        <i className="fa-solid fa-chevron-left"></i>
                      </div>
                      <div className="arrow position-absolute top-50 start-100 translate-middle">
                        <i className="fa-solid fa-chevron-right"></i>
                      </div>
                    </div>
                  </div>
                  <div className="description">
                    <div className="details p-3 position-relative">
                      <div className="city">
                        <h2>{vehicles?.name}</h2>
                        <h3>{vehicles?.location}</h3>
                      </div>
                      <h4>Available</h4>
                      <p>No prepayment</p>
                      <div className="about">
                        <p>Capacity : {vehicles?.seat} person</p>
                        <p>Type : {vehicles?.type}</p>
                        <p>Reservation before 2 PM</p>
                      </div>
                      <div className="price position-absolute">Rp.{vehicles?.cost}/day</div>
                    </div>
                  </div>
                </div>
              </div>
              <form action="reservation.html" className="position-relative">
                <div className="quantity d-flex justify-content-center align-items-center">
                  <a href="#" className="btn btn-plus">+</a>
                  <input type="number" name="qty" value="2" />
                  <a href="#" className="btn btn-minus">-</a>
                </div>
                <div className="button d-flex flex-wrap justify-content-center">
                  <div className="button-chat">
                    <a href="#" className="btn btn-primary chat my-2" role="button">Chat Admin</a>
                  </div>
                  <div className="submit-button my-2">
                    <button>Reservation</button>
                  </div>
                  <div className="button-like">
                    <a href="#" className="btn btn-primary like my-2" role="button"
                    ><i className="fa-solid fa-heart"></i>Like</a>
                  </div>
                </div>
              </form>
            </section>
            </Layout>
        )
}

export default VehicleDetail