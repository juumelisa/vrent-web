import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "../helpers/http";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import LayoutB from "../components/LayoutB";

export const Reservation = (props)=>{
  const [vehicles, setVehicles] = useState([])
  const {id} = useParams()
  useEffect(()=>{
      getVehicles(id)
      
  }, [])

  const getVehicles = async (id)=> {
    try{
      const {data} = await getData(`http://localhost:8000/vehicles/${id}`, props.history)
      setVehicles(data.result)
    }catch(err){
      console.log(err.message)
    }
  }
        return(
            <LayoutB>
              <main className="container my-5">
                <div className="back-arrow">
                  <Link to="/" className="d-flex my-5" style={{color: "black"}}>
                    <FaChevronLeft className="fs-3 me-5" style={{height: "80px"}}/>
                    <p className="fs-3 m-0" style={{lineHeight: "80px"}}>Reservation</p>
                  </Link>
                </div>
                <div className="detail-section row">
                    <img src={vehicles?.image} alt={vehicles?.name} className="col-12 col-md-7"/>
                    <div class="vehicle-details col-12 col-md-5">
                        <h2 className="fs-1 fw-bold mb-4">{vehicles?.name} {vehicles?.year}</h2>
                        <h3 className="fs-3 fw-bold mb-4">{vehicles?.location}</h3>
                        <div className="res-quantity p-2 my-3">
                            <p>Qt: 2 bikes</p>
                            <p>No prepayment</p>
                        </div>
                        <div className="detail-checkout p-2">
                            <p> 1 bike: Rp.{vehicles?.cost}</p>
                            <p> 1 bike: Rp.{vehicles?.cost}</p>
                        </div>
                    </div>
                </div>
                <form className="reservation-form my-4">
                    <div className="d-flex flex-column flex-md-row">
                        <h3>Reservation date :</h3>
                        <input className="text-center ms-auto fs-5" type="date" name="rent_date" />
                        <input className="text-center ms-auto fs-5" type="date" name="return_date" />
                    </div>
                    <div className="btn text-center my-3 fs-5">Total: Rp. {vehicles?.cost*2}</div>
                    <button type="submit" className="fs-5 fw-bold py-0">Go to payment</button>
                </form>
              </main>
            </LayoutB>
        )
}

export default Reservation