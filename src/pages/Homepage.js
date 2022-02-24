import React, {useState, useEffect} from 'react'
import {default as axios} from 'axios'
import { Link } from 'react-router-dom'
import Layout from "../components/Layout"
import testimony from '../assets/images/edward-testimony.png'

export const Homepage = () => {
    const [vehicles, setVehicles] = useState([])
    const [page, setPage] = useState({})

    useEffect(()=>{
        getVehicles()
    },[])

    const getVehicles = async ()=> {
        const {data} = await axios.get('http://localhost:8000/popular')
        setVehicles(data.result)
        setPage(data.pageInfo)
    }
        return(
            <Layout>
                <div className="top-wrapper">
                    <div className="search-section">
                        <h1>Explore and Travel</h1>
                        <form>
                            <h3>Vehicle Finder</h3>
                            <div className="line"></div>
                            <input type="text" name="type" placeholder="Type the vehicle (ex. motorbike)" />
                            <div className="selection">
                                <select className="form-select" name="location">
                                    <option value>Location</option>
                                    <option value="1">Bali</option>
                                    <option value="2">Yogyakarta</option>
                                    <option value="3">Jakarta</option>
                                    <option value="3">Kalimantan</option>
                                    <option value="3">Malang</option>
                                </select>
                                <div className="form-space"></div>
                                <input className="input-date" type="date"/>
                            </div>
                            <button className="search">Search</button>
                        </form>
                    </div>
                </div>
                <section>
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
                                    return(
                                        <div className="popular-vehicle p-2 position-relative">
                                            <Link to={data.image}>
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
                    </div>
                        <div className="testimonial-section">
                        <h2>Testimonials</h2>
                        <div className="testimony">
                            <div className="message d-flex flex-wrap">
                            <div className="user-testimony p-3">
                                <div className="star">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                </div>
                                <h5>”It was the right decision to rent vehicle here, I spent less money and enjoy the trip. It was an amazing experience to have a ride for wildlife trip!”</h5>
                                <h6>Edward Newgate</h6>
                                <p>Founder Circle</p>
                            </div>
                            <div className="user p-3">
                                <img className="user-image" src={testimony} alt="user"/>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
}

export default Homepage
