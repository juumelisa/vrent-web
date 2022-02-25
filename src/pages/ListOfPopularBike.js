import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import {default as axios} from 'axios'
import { Link } from 'react-router-dom'

export const ListOfPopularBike = () => {
    const [vehicles, setVehicles] = useState([])
    const [page, setPage] = useState({})

    useEffect(()=>{
        getVehicles()
    },[])

    const getVehicles = async ()=> {
        const {data} = await axios.get('http://localhost:8000/popular/3?limit=16')
        setVehicles(data.result)
        setPage(data.pageInfo)
    }

    const getNextData = async (url) => {
        const {data} = await axios.get(url)
        setVehicles([
            ...vehicles,
            ...data.result
        ])
    }
    return (
        <Layout>

        <section>
          <div className="popular-section">
            <div className="popular-vehicles">
              <div className="title">
                <h1>Popular bike</h1>
              </div>
              <div className="notes">
                <p className="text-center">Click item to see details and reservation</p>
              </div>
              <div className="vehicles d-flex flex-wrap justify-content-center">
                  {vehicles.map((data, idx)=>{
                      let url = `/vehicles/${data.vehicle_id}`
                      return(
                        <div className='popular-vehicle p-2 position-relative'>
                            <Link to={url}>
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
            </div>
          </div>
                {page.next!==null&&
                    <div className='row my-5'>
                        <div className='col-md-12 text-center'>
                            <button onClick={()=>getNextData(page.next)} className='btn btn-primary'>Load More</button>
                        </div>
                    </div>
                }
        </section>
        </Layout>
    )
}

export default ListOfPopularBike