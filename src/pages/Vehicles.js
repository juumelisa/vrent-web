import React, {useState, useEffect} from 'react'
import {default as axios} from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LayoutB from '../components/LayoutB'
import SubmitButton from '../components/SubmitButton'

export const Vehicles = () => {
    const [vehicles, setVehicles] = useState([])
    const [page, setPage] = useState({})
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams()
    const [errorMsg, setErrorMsg] = useState(null)
    const {REACT_APP_BACKEND_URL} = process.env

    useEffect(()=>{
        // const name = searchParams.get('name')
        // const location = searchParams.get('location')
        // const cost_min = searchParams.get('cost_min')
        const vehicleData = {}
        const dataName = ['name', 'location', 'cost_min', 'cost_max', 'category', 'type', 'sortBy']
        let url = `${REACT_APP_BACKEND_URL}popular?limit=16`
        console.log(REACT_APP_BACKEND_URL)
        let nullData = 0
        dataName.forEach(x=>{
            vehicleData[x] = searchParams.get(x)
            if(vehicleData[x] && vehicleData!==""){
                url = `${url}&${x}=${vehicleData[x]}`
                document.getElementById('search').elements[x].value = vehicleData[x]
            }else{
                nullData++
            }
        })
        if(nullData>0){
            getNextData(url, true)
        }else{
            getVehicles()
        }
    },[])

    const getVehicles = async ()=> {
        const {data} = await axios.get(`${REACT_APP_BACKEND_URL}/popular?limit=16`)
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
            setErrorMsg(e.response.data.message)
            setVehicles([])
            setPage({
                next: null
            })
        }
    }
    
    const onSearch = async(event)=>{
        event.preventDefault();
        let url = `${REACT_APP_BACKEND_URL}popular?limit=16`
        const name = event.target.elements["name"].value
        const location = event.target.elements["location"].value
        const cost_min = event.target.elements["cost_min"].value
        const cost_max = event.target.elements["cost_max"].value
        const category = event.target.elements["category"].value
        const type = event.target.elements["type"].value
        const sortBy = event.target.elements["sortBy"].value
        const vehicleData = {name, location, cost_min, cost_max, category, type, sortBy}
        const dataName = ['name', 'location', 'cost_min', 'cost_max', 'category', 'type', 'sortBy']
        dataName.forEach(x=>{
            if(vehicleData[x]){
                url = `${url}&${x}=${vehicleData[x]}`
            }
        })
        setSearchParams(vehicleData)
        await getNextData(url, true)
    }
    const goToDetail = (id)=> {
        navigate(`/vehicle/${id}`)
    }
    return (
        <LayoutB>
            <main className='container my-5'>
                <div className="row">
                    <div className="search-filter col-12 col-md-3 my-2">
                        <form id='search' onSubmit={onSearch} className="search">
                            <h2 className="fs-3">Filter</h2>
                            <input className="py-2 my-2" name="name" type="text" placeholder="Vehicle name" />
                            <input className="py-2 my-2" name="location" type="text" placeholder="Location" />
                            <input className="py-2 my-2" name="cost_min" type="number" placeholder="Minimum cost" />
                            <input className="py-2 my-2" name="cost_max" type="number" placeholder="Maximum cost" />
                            <label className="mt-4 fs-6 fw-bold" htmlFor="category">Category :</label>
                            <select id="category" className="mt-2">
                                <option defaultValue="">All</option>
                                <option value="1">Car</option>
                                <option value="2">Motorbike</option>
                                <option value="3">Bike</option>
                            </select>
                            <label className="mt-4 fs-6 fw-bold" htmlFor="type">Type :</label>
                            <select id="type" className="mt-2">
                                <option defaultValue="">All</option>
                                <option value="manual">Manual</option>
                                <option value="matic">Matic</option>
                            </select>
                            <label className="mt-4 fs-6 fw-bold" htmlFor="sortBy">Sort by : </label>
                            <select id="sortBy" className="mt-2">
                                <option defaultValue="id DESC">New Arrival</option>
                                <option value="totalRent DESC">Popular</option>
                                <option value="cost ASC">Lowest Price</option>
                                <option value="cost DESC">Highest Price</option>
                            </select>
                            <SubmitButton>Search</SubmitButton>
                        </form>
                    </div>
                    <div className="list-vehicles col-12 col-md-9">
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
                        <div className="row vehicles">
                            {vehicles.map((data, idx)=>{
                                return(
                                    <div key={data.id} onClick={()=>goToDetail(data.id)} className="col-12 col-md-6 col-lg-3 popular-vehicles position-relative py-3" style={{cursor: "pointer"}}>
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
                                    <button onClick={()=>getNextData(page.next)} className='btn btn-primary' style={{backgroundColor: "#9AD0EC", border: "none", color:"black"}}>Load More</button>
                                </div>
                            </div>
                        }
                </div>
                </div>
            </main>
        </LayoutB>
    )
}

export default Vehicles