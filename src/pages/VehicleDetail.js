import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {default as axios} from 'axios'
import Layout from "../components/Layout";

export const VehicleDetail = ()=>{
  const {id} = useParams()
  const [vehicles, setVehicles] = useState([])
  const [page, setPage] = useState({})

  useEffect(()=>{
      getVehicles()
  },[])

  const getVehicles = async ()=> {
      const {data} = await axios.get('http://localhost:8000/popular?limit=16')
      setVehicles(data.result)
      setPage(data.pageInfo)
  }
        return(
            <Layout>

            <section>
              <div class="back-arrow">
                <a href="popular-in-town.html" class="d-inline-flex justify-content-start">
                  <i class="fa-solid fa-chevron-left sm-me-2 me-5"></i>
                  <p>Detail</p>
                </a>
              </div>
              <div class="vehicle">
                <div class="vehicle-details d-flex flex-wrap position-relative">
                  <div class="vehicle-image p-3">
                    <div class="main-image">
                      <img src={vehicles[0].image} />
                    </div>
                    <div class="other-images px-5 my-3 position-relative">
                      <div class="these-img d-flex">
                        <img class="p-2" src="./assets/images/dt-vehicle-1.png" />
                        <img class="p-2" src="./assets/images/dt-vehicle-2.png" />
                      </div>
                      <div class="arrow position-absolute top-50 start-0 translate-middle">
                        <i class="fa-solid fa-chevron-left"></i>
                      </div>
                      <div class="arrow position-absolute top-50 start-100 translate-middle">
                        <i class="fa-solid fa-chevron-right"></i>
                      </div>
                    </div>
                  </div>
                  <div class="description">
                    <div class="details p-3 position-relative">
                      <div class="city">
                        <h2>Fixie - Gray Only</h2>
                        <h3>Yogyakarta</h3>
                      </div>
                      <h4>Available</h4>
                      <p>No prepayment</p>
                      <div class="about">
                        <p>Capacity : 1 person</p>
                        <p>Type : Bike</p>
                        <p>Reservation before 2 PM</p>
                      </div>
                      <div class="price position-absolute">Rp.78.000/day</div>
                    </div>
                  </div>
                </div>
              </div>
              <form action="reservation.html" class="position-relative">
                <div class="quantity d-flex justify-content-center align-items-center">
                  <a href="#" class="btn btn-plus">+</a>
                  <input type="number" name="qty" value="2" />
                  <a href="#" class="btn btn-minus">-</a>
                </div>
                <div class="button d-flex flex-wrap justify-content-center">
                  <div class="button-chat">
                    <a href="#" class="btn btn-primary chat my-2" role="button">Chat Admin</a>
                  </div>
                  <div class="submit-button my-2">
                    <button>Reservation</button>
                  </div>
                  <div class="button-like">
                    <a href="#" class="btn btn-primary like my-2" role="button"
                    ><i class="fa-solid fa-heart"></i>Like</a>
                  </div>
                </div>
              </form>
            </section>
            </Layout>
        )
}

export default VehicleDetail