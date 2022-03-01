import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getData } from "../helpers/http";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import LayoutB from "../components/LayoutB";

export const VehicleDetail = (props)=>{
  const [vehicles, setVehicles] = useState([])
  const {id} = useParams()
  const navigate = useNavigate()
  const qty = 2
  const [formQty, setFormQty] = useState(qty)
  useEffect(()=>{
      getVehicles(id)
      
  }, [])

  const getVehicles = async (id)=> {
    try{
      const {data} = await getData(`${process.env.REACT_APP_URL}/vehicles/${id}`, props.history)
      setVehicles(data.result)
    }catch(err){
      console.log(err.message)
    }
  }
  const addQty = ()=>{
    setFormQty(formQty+1)
  }
  const minusQty = ()=>{
    if(formQty>1){
      setFormQty(formQty-1)
    }
  }
  const goBack = ()=>{
    window.history.back()
  }
  const goToReservation = (id)=>{
    navigate (`/reservation/${id}`)
  }
        return(
            <LayoutB>
              <main className="container my-5">
                <div className="back-arrow" onClick={goBack}>
                  <div to="/vehicles" className="d-flex my-5" style={{color: "black"}}>
                    <FaChevronLeft className="fs-3 me-5" style={{height: "80px"}}/>
                    <p className="fs-3 m-0" style={{lineHeight: "80px"}}>Detail</p>
                  </div>
                </div>
                <div className="detail-vehicle d-flex flex-column flex-md-row">
                  <div className="vehicle-pictures">
                    <div className="main-image">
                      <img src={vehicles?.image} alt={vehicles?.name} />
                    </div>
                    <div className="another-images row pt-4" style={{width: "100%", margin: "0"}}>
                      <div className="arrow col-2 col-sm-1 position-relative">
                        <FaChevronLeft className="position-absolute top-50 start-0 translate-middle-y fs-2"/>
                      </div>
                      <img src={vehicles?.image} alt={vehicles?.name} className="col-4 col-sm-5"/>
                      <img src={vehicles?.image} alt={vehicles?.name} className="col-4 col-sm-5"/>
                      <div className="arrow col-2 col-sm-1 position-relative">
                        <FaChevronRight className="position-absolute top-50 end-0 translate-middle-y fs-3" />
                      </div>
                    </div>
                  </div>
                  <div className="detail">
                      <div className="city">
                        <h2 className="fw-bold">{vehicles?.name} {vehicles?.year}</h2>
                        <h3 className="fs-4 fw-bold mb-4">{vehicles?.location}</h3>
                      </div>
                      <h4 className="fs-5 fw-bold m-0" style={{color: "#087E0D"}}>Available</h4>
                      <p className="m-0" style={{color: "#9B0A0A"}}>No prepayment</p>
                      <div className="about my-3">
                        <p className="m-0">Capacity : {vehicles?.seat} person</p>
                        <p className="m-0">Type : {vehicles?.type}</p>
                        <p className="m-0">Reservation before 2 PM</p>
                      </div>
                      <p className="price fs-3 fw-bold text-end" style={{color: "black"}}>Rp{vehicles?.cost}/day</p>
                  </div>
                </div>
                <form className="position-relative pt-5" id="reservation">
                  <div className="qty-btn d-flex justify-content-center">
                    <div className="plus btn fw-bold" onClick={()=>addQty()} >+</div>
                    <input className="qty-form text-center fw-bold" type="number" name="qty" value={formQty} style={{backgroundColor: "white", margin: "0"}}/>
                    <div className="minus btn fw-bold" onClick={()=>minusQty()}>-</div>
                  </div>
                  <div className="button row my-4">
                    <div className="button-group col-12 col-md-9 d-flex flex-column-reverse flex-md-row">
                      <Link to="/" className="btn col-12 col-md-6 my-2 fs-4">Chat admin</Link>
                      <button className="my-2 fs-4" type="submit">Reservation</button>
                    </div>
                    <div className="like-btn col-12 col-md-3">
                      <Link to="/" className="btn col-12 fs-4 text-center my-2">Like</Link>
                    </div>
                  </div>
                </form>
              </main>
            </LayoutB>
        )
}

export default VehicleDetail