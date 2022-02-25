import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import {default as axios} from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const Vehicles = () => {
    const [vehicles, setVehicles] = useState([])
    const [page, setPage] = useState({})
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams()

    useEffect(()=>{
        const name = searchParams.get('name')
        const location = searchParams.get('location')
        if(name || location){
            const url = (name,location)=> `http://localhost:8000/vehicles?name=${name}&location=${location}&limit=16`
            document.getElementById('search').elements['search'].value = name
            document.getElementById('search').elements['location'].value = location
            getNextData(url(name,location), true)
        }else{
            getVehicles()
        }
    },[])

    const getVehicles = async ()=> {
        const {data} = await axios.get('http://localhost:8000/vehicles?limit=16')
        setVehicles(data.result)
        setPage(data.pageInfo)
    }

    const getNextData = async (url, replace=false) => {
        const {data} = await axios.get(url)
        setVehicles([
            ...vehicles,
            ...data.result
        ])
        setPage(data.pageInfo)
    }
    return (
        <Layout>
            <main className='container'>
                <div className='row my-5'>
                    {vehicles.map((data, idx)=>{
                        return(
                            <div className='col-md-3'>
                                <div className='position-relative mb-2'>
                                    <img className='img-fluid' src={data.image} alt={data.name} />
                                    <div className='position-absolute bottom-0 start-0 bg-white px-3 py-2'>{data.name}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {page.next!==null&&
                    <div className='row my-5'>
                        <div className='col-md-12 text-center'>
                            <button onClick={()=>getNextData(page.next)} className='btn btn-primary'>Load More</button>
                        </div>
                    </div>
                }
            </main>
        </Layout>
    )
}

export default Vehicles