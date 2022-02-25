import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import {default as axios} from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const Vehicles = () => {
    const [vehicles, setVehicles] = useState([])
    const [page, setPage] = useState({})
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams()
    const [errorMsg, setErrorMsg] = useState(null)

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

    const getNextData = async (url, replace = false) => {
        try{
            setErrorMsg(null)
            const {data} = await axios.get(url)
            if(replace){
                setVehicles(data.result)
            }else{
                setVehicles([
                    ...vehicles,
                    ...data.result
                ])
            }
            setPage(data.pageInfo)
        }catch(e){
            if(e.message.includes('404')){
                setErrorMsg('Data not found!')
                setVehicles([])
                setPage({
                    next: null
                })
            }
        }
    }
    
    const onSearch = async(event)=>{
        event.preventDefault();
        const url = (name,location)=> `http://localhost:8000/vehicles?name=${name}&location=${location}&limit=16`
        const name = event.target.elements["search"].value
        const location = event.target.elements["location"].value
        setSearchParams({name,location})
        await getNextData(url(name, location), true)
    }
    const goToDetail = (id)=> {
        navigate(`/vehicles/${id}`)
    }
    return (
        <Layout>
            <form id='search' onSubmit={onSearch}>
                <input name="search" type="text" placeholder="vehicle name" />
                <input name="location" type="text" placeholder="location" />
                <button type='submit' className='btn btn-primary'>Search</button>
            </form>
            <main className='container'>
                
                {errorMsg!==null&&
                    <div className='row my-5'>
                        <div className='col'>
                            <div className='alert alert-warning alert-dismissible fade show' role='alert'>
                                <span>{errorMsg}</span>
                                <button onClick={()=>setErrorMsg(null)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </div>
                    </div>
                }
                <div className='row my-5'>
                    {vehicles.map((data, idx)=>{
                        return(
                            <div className='col-md-3'>
                                <div onClick={()=>goToDetail(data.id) } className='position-relative mb-2'>
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