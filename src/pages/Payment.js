import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "../helpers/http";
import { FaChevronLeft } from "react-icons/fa"
import LayoutB from "../components/LayoutB";

export const Payment = (props)=>{
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
                <img src={vehicles?.image} alt={vehicles?.name} className="col-12 col-md-5"/>
                <div className="vehicle-details col-12 col-md-7">
                    <h2 className="fs-1 fw-bold mb-4">{vehicles?.name} {vehicles?.year}</h2>
                    <h3 className="fs-3 fw-bold mb-4">{vehicles?.location}</h3>
                    <p>No prepayment</p>
                    <p>#FG1209878YZS</p>
                    <p className="btn">Copy booking code</p>
                </div>
            </div>
            <div className="order-detail row">
                <div className="vehicles-order col-12 col-md-5">
                    <div className="res-quantity p-2 my-3">
                        <p>Qt: 2 bikes</p>
                    </div>
                    <div className="detail-checkout p-2" style={{border: "1px solid #9AD0EC", borderRadius: "10px", width:"100%"}}>
                        <p className="fw-bold">Order details: </p>
                        <p> 1 bike: Rp.{vehicles?.cost}</p>
                        <p> 1 bike: Rp.{vehicles?.cost}</p>
                        <p className="fw-bold">Total: Rp. {vehicles?.cost*2}</p>
                    </div>
                </div>
                <div className="user-order col-12 col-md-7">
                    <div className="date-order p-2 my-3" style={{border: "1px solid #9AD0EC", borderRadius: "10px", width:"100%"}}>
                        <p><span className="fw-bold">Reservation date: </span>March 1st 2022</p>
                    </div>
                    <div className="detail-checkout p-2" style={{border: "1px solid #9AD0EC", borderRadius: "10px", width:"100%"}}>
                        <p className="fw-bold">Identity: </p>
                        <p>Samantha Doe (+6290987682)</p>
                        <p>samanthadoe@mail.com</p>
                    </div>
                </div>
            </div>
            <form>
                <div className="payment-detail row">
                    <div className="payment code col-12 col-md-3 fw-bold">Payment Code</div>
                    <div className="copy-code col-12 col-md-5 d-flex fw-bold" style={{border: "1px solid #9AD0EC", borderRadius: "10px"}}>
                        <p>#FG1209878YZS</p>
                        <p className="btn fw-bold">Copy</p>
                    </div>
                    <div className="payment-method col-12 col-md-4">
                        <input type="text" placeholder="Select payment method" />
                    </div>
                </div>
                <button type="submit">Finish payment: 59:30</button>
            </form>
            </main>
        </LayoutB>
  )
}

export default Payment