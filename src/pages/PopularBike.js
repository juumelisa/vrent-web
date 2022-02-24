import React, {useState, useEffect} from 'react'
import {default as axios} from 'axios'
import { Link } from 'react-router-dom'

export const PopularBike = () => {
    const [vehicles, setVehicles] = useState([])
    const [page, setPage] = useState({})

    useEffect(()=>{
        getVehicles()
    },[])

    const getVehicles = async ()=> {
        const {data} = await axios.get('http://localhost:8000/popular/3?limit=4')
        setVehicles(data.result)
        setPage(data.pageInfo)
    }

    const getNextData = async (url) => {
        const {data} = await axios.get(url)
        setVehicles([
            ...vehicles,
            data.result
        ])
    }
    return(
        <section>
              <div className="vehicles d-flex flex-wrap justify-content-center">
                  {vehicles.map((data, idx)=>{
                      return(
                        <div className='popular-vehicle p-2 position-relative'>
                            <Link to="/">
                                <img src={data.image} alt="data.vehicle_name" />
                                <div className="location position-absolute">
                                    <h6>{data.vehicle_name}</h6>
                                    <p>{data.location}</p>
                                </div>
                            </Link>
                        </div>
                      )
                  })}
              </div>
        </section>
        
    )
}

export default PopularBike