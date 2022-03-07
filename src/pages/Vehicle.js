import { useEffect} from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import SubmitButton from "../components/SubmitButton"
import { getVehicles, getNextData } from "../redux/actions/vehicles"
import { searchVehicle } from "../redux/actions/vehicles"

export const Vehicle = ({getVehicles, getNextData}) =>{
    const {vehicles: vhc} = useSelector(state => state)
    // const [vehicles, setVehicles] = useState([])
    // const [page, setPage] = useState({})
    // const [errorMsg, setErrorMsg] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const dp = useDispatch()
    // const {REACT_APP_BACKEND_URL} = process.env

    // const [formValue, setFormValue] = useState({
    //     name: '',
    //     location: ''
    // })
    useEffect(()=>{
        getVehicles()
    },[])
    const onSearch = (e)=>{
        e.preventDefault()
        const name = e.target.elements['name'].value
        const location = e.target.elements['location'].value
        const category = e.target.elements['category'].value
        const cost_min = e.target.elements['cost_min'].value
        const cost_max = e.target.elements['cost_max'].value
        const type = e.target.elements['type'].value
        const sortBy = e.target.elements['sortBy'].value
        const data = {name, location, category, cost_min, cost_max, type, sortBy}
        console.log(data)
        dispatch(searchVehicle(data))
    }
    const nextData = (url) =>{
        getNextData(url)
        console.log(vhc.vehicles.result)
    }
    const goToDetail = (id)=> {
        navigate(`/vehicle/${id}`)
    }
    return(
        <Layout>
        <main className='container my-5'>
            <div className="row">
                <div className="search-filter col-12 col-md-3 my-2">
                    <form onSubmit={onSearch} id='search' className="search">
                        <h2 className="fs-3">Filter</h2>
                        <input className="py-2 my-2" name="name" type="text" placeholder="Vehicle name" />
                        <input className="py-2 my-2" name="location" type="text" placeholder="Location" />
                        <input className="py-2 my-2" name="cost_min" type="number" placeholder="Minimum cost" />
                        <input className="py-2 my-2" name="cost_max" type="number" placeholder="Maximum cost" />
                        <label className="mt-4 fs-6 fw-bold" htmlFor="category">Category :</label>
                        <select id="category" className="mt-2">
                            <option selected value="">All</option>
                            <option value="1">Car</option>
                            <option value="2">Motorbike</option>
                            <option value="3">Bike</option>
                        </select>
                        <label className="mt-4 fs-6 fw-bold" htmlFor="type">Type :</label>
                        <select id="type" className="mt-2">
                            <option selected value="">All</option>
                            <option value="manual">Manual</option>
                            <option value="matic">Matic</option>
                        </select>
                        <label className="mt-4 fs-6 fw-bold" htmlFor="sortBy">Sort by : </label>
                        <select id="sortBy" className="mt-2">
                            <option selected value="id DESC">New Arrival</option>
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