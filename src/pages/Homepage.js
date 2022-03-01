import React, {useState, useEffect} from 'react'
import {default as axios} from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa";
import {AiFillStar} from "react-icons/ai"
import Layout from "../components/Layout"
import testimony from '../assets/images/edward-testimony.png'

export const Homepage = () => {
    const [vehicles, setVehicles] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        getVehicles()
    },[])

    const getVehicles = async ()=> {
        const {data} = await axios.get('http://localhost:8000/popular?sortBy=totalRent+DESC')
        setVehicles(data.result)
    }
    const goToDetail = (id)=> {
        navigate(`/vehicles/${id}`)
    }
    return(
        <Layout>
            <div className="search-section">
                <div className="search-background py-5">
                    <div className="container">
                        <h1 className="py-5">Explore and Travel</h1>
                        <form action="/vehicles" className="fs-5" style={{width: "100%"}}>
                            <h2 className="fs-4 p-0 mb-5">Vehicle Finder</h2>
                            <div className="line mb-5"></div>
                            <input type="text" name="name" placeholder="Type the vehicle (ex. motorbike)" className="col-12"/>
                            <div className="location-date col-12 d-flex flex-column flex-md-row p-0">
                                <input type="text" name="location" placeholder="Location" />
                                <div className="form-space"></div>
                                <input type="date" />
                            </div>
                            <button className="mb-5">Search</button>
                        </form>
                    </div>
                </div>
            </div>
            <main className="container">
                <div className="popular-section py-5">
                    <div className="heading-section d-flex align-items-center" style={{width: "100%"}}>
                        <h1 style={{width: "50%"}}>Popular in town</h1>
                        <div className="other-vehicles text-end" style={{width: "50%"}}>
                            <Link to="/popular-in-town" style={{color: "#1572A1"}}>View all <FaChevronRight className="ms-3"/></Link>
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
                <div className="testimony-section py-5">
                    <h2 className="fw-bold">Testimonials</h2>
                    <div className="user-testimony d-flex flex-column-reverse flex-md-row justify-content-center align-items-center mx-auto p-3">
                        <div className="message p-2">
                            <div className="star text-center text-md-start">
                                <AiFillStar style={{color: "ffc40c"}}/>
                                <AiFillStar style={{color: "ffc40c"}}/>
                                <AiFillStar style={{color: "ffc40c"}}/>
                                <AiFillStar style={{color: "ffc40c"}}/>
                                <AiFillStar style={{color: "ffc40c"}}/>
                            </div>
                            <div className="msg">
                                <p className="text-center text-md-start fs-5 fw-normal">”It was the right decision to rent vehicle here, I spent less money and enjoy the trip. It was an amazing experience to have a ride for wildlife trip!”</p>
                                <h6 className="text-center text-md-start fw-bold">Edward Newgate</h6>
                                <p className="text-center text-md-start fs-6">Founder Circle</p>
                            </div>
                        </div>
                        <div className="user">
                            <img className="img-fluid mx-auto d-block" src={testimony} alt="user" width="100%" height="100%"/>
                        </div>
                    </div>
                </div>
           </main>
        </Layout>
    )
}

export default Homepage
