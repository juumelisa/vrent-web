import React, {useState, useEffect} from 'react'
import {default as axios} from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa";

export const PopularCar = ()=>{
  const [vehicles, setVehicles] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
      getVehicles()
  },[])

  const getVehicles = async ()=> {
      const {data} = await axios.get('http://localhost:8000/popular?category=1&sortBy=totalRent+DESC&limit=4')
      setVehicles(data.result)
  }
  const goToDetail = (id)=> {
    navigate(`/vehicles/${id}`)
  }
        return(
            <main className="container">
                <div className="popular-section py-5">
                    <div className="heading-section row">
                        <h1 className="col-12 col-md-6 my-2">Popular car</h1>
                        <div className="other-vehicles col-12 col-md-6 text-end my-2">
                            <Link to="/popular-car" style={{color: "#1572A1"}}>View all <FaChevronRight className="ms-3"/></Link>
                        </div>
                    </div>
                    <div className="row vehicles">
                        {vehicles.map((data, idx)=>{
                            return(
                                <div onClick={()=>goToDetail(data.id)} className="col-12 col-md-6 col-lg-3 popular-vehicles position-relative py-3" style={{cursor: "pointer"}}>
                                    <img className="img-fluid" src={data.image} alt={data.name} />
                                    <div className="location position-absolute bottom-0 bg-white p-2">
                                        <h6 className="m-0">{data.name}</h6>
                                        <p className="m-0">{data.location}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
              </main>
        )
}

export default PopularCar