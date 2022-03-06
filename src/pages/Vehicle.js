import {default as axios} from "axios"
import { useEffect, useState } from "react"
import { connect, useDispatch } from "react-redux"
import Layout from "../components/Layout"
import SubmitButton from "../components/SubmitButton"
import { getVehicles, getNextData } from "../redux/actions/vehicles"

export const Vehicle = ({getVehicles, vehicles: vhc, getNextData}) =>{
    const [vehicles, setVehicles] = useState([])
    const [page, setPage] = useState({})
    const [errorMsg, setErrorMsg] = useState(null)
    const dp = useDispatch()
    // const {REACT_APP_BACKEND_URL} = process.env
    useEffect(()=>{
        console.log(vhc.page.next)
        getVehicles()
    },[])
    const nextData = (url) =>{
        getNextData(url)
    }
    return(
        <Layout>
        <main className='container my-5'>
            <div className="row">
                <div className="search-filter col-12 col-md-3 my-2">
                    <form id='search' className="search">
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
                    {/* {errorMsg!==null&&
                        <div className='row my-5'>
                            <div className='col'>
                                <div className='alert alert-warning alert-dismissible fade show' role='alert'>
                                    <span>{errorMsg}</span>
                                    <button onClick={()=>setErrorMsg(null)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                    } */}
                    <div className="row vehicles">
                        {vhc.vehicles.map((data, idx)=>{
                            return(
                                <div key={data.id} className="col-12 col-md-6 col-lg-3 popular-vehicles position-relative py-3" style={{cursor: "pointer"}}>
                                    <img className="img-fluid" src={data.image} alt={data.name} />
                                    <div className="location position-absolute bottom-0 bg-white p-2">
                                        <h6 className="m-0">{data.name}</h6>
                                        <p className="m-0">{data.location}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {vhc.page.next!==null&&
                        <div className='row my-5'>
                            <div className='col-md-12 text-center'>
                                <button onClick={()=>nextData(vhc.page.next)} className='btn btn-primary' style={{backgroundColor: "#9AD0EC", border: "none", color:"black"}}>Load More</button>
                            </div>
                        </div>
                    }
            </div>
            </div>
        </main>

        </Layout>
    )
}

const mapStateToProps = state=>({vehicles: state.vehicles})
const mapDispatchToProps = {getVehicles, getNextData}
export default connect(mapStateToProps, mapDispatchToProps)(Vehicle)