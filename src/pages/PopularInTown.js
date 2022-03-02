import React, {useState, useEffect} from 'react'
import {default as axios} from 'axios'
import { useNavigate } from 'react-router-dom'
import LayoutB from '../components/LayoutB'

export const PopularInTown = () => {
    const [vehicles, setVehicles] = useState([])
    const [page, setPage] = useState({})
    const navigate = useNavigate()
    useEffect(()=>{
        getVehicles()
    },[])

    const getVehicles = async ()=> {
        const {data} = await axios.get(`${process.env.REACT_APP_URL}/popular?sortBy=totalRent+DESC&limit=16`)
        setVehicles(data.result)
        setPage(data.pageInfo)
    }

    const getNextData = async (url) => {
        const {data} = await axios.get(url)
        setVehicles([
            ...vehicles,
            ...data.result
        ])
        setPage(data.pageInfo)
    }
    const goToDetail = (id)=> {
        navigate(`/vehicles/${id}`)
    }
    return (
        <LayoutB>
            <div className="container">
                <div className="title-section">
                    <h1 className="mt-5">Popular in town</h1>
                    <p className="text-center fs-4 fw-bold my-4" style={{color: "rgba(0,0,0,0.5)"}}>Click item to see details and reservation</p>
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
                {page.next!==null&&
                    <div className='row my-5'>
                        <div className='col-md-12 text-center'>
                            <button onClick={()=>getNextData(page.next)} className='btn' style={{backgroundColor: "#9AD0EC", border: "none", color:"black"}}>Load More</button>
                        </div>
                    </div>
                }
            </div>
        </LayoutB>
    )
}

export default PopularInTown