import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Helmets from "../components/Helmets";
import Layout from "../components/Layout";
import { FaChevronLeft } from 'react-icons/fa';
import defaultImg from "../assets/images/default-img.png";
import { Input } from "../components/Input";
import { editVehicle, getVehicleDetail } from "../redux/actions/vehicles";

export const EditItem = () => {
	const {auth, detail} = useSelector(state => state)
  const {id} = useParams();
	const [picture, setPicture] = useState()
	const [image, setImage] = useState()
	const [name, setName] = useState(detail.vehicle.name)
	const [year, setYear] = useState()
	const [cost, setCost] = useState()
	const [seat, setSeat] = useState()
	const [location, setLocation] = useState()
  const dispatch = useDispatch();
	// const [category, setCategory] = useState()
	// const [type, setType] = useState();

	const navigate = useNavigate()
	useEffect(()=>{
    dispatch(getVehicleDetail(id))
		if(auth.userData.role !== 'admin') {
			navigate('/404')
		}
	}, [])
  const goBack = () => {
    window.history.back();
  };
	const onFileChange = e => {
		setImage(e.target.files[0])
		setPicture(URL.createObjectURL(e.target.files[0]))
		console.log(picture)
	}
  const changeItem = () => {
    const data = {name, image}
    dispatch(editVehicle(auth.token, data, id))
  }
	return (
		<>
			<Helmets title={'Add New Item'} />
			<Layout>
				<div className="container">
					<div className="d-flex flex-row align-items-center">
						<div onClick={goBack}>
							<FaChevronLeft size={30}/>
						</div>
						<h1 className="fs-3 p-0 m-0 ms-3">Add New Item</h1>
					</div>
					<div className="d-flex flex-column flex-lg-row">
						<div className="col-12 col-md-8 col-lg-6 mx-auto m-lg-0">
              <div className="position-relative">
                <img src={picture? picture : detail.vehicle.image ? detail.vehicle.image : defaultImg} width="100%" height={300} style={{objectFit: "cover"}}
                className="rounded-3"/>
                <input type="file" onChange={onFileChange} id="uploaded"
                className="position-absolute start-50 top-50 translate-middle" style={{width: '100%', height: '100%'}}/>
              </div>
              <div className="d-flex flex-column flex-md-row col-12 col-md-8 col-lg-6">
                <div className="col-12 py-2 pe-1">
                  <img src={picture? picture : detail.vehicle.image ? detail.vehicle.image : defaultImg} width="100%" height={200} style={{objectFit: "cover"}}
                  className="rounded-3"/>
                  <input type="file" onChange={onFileChange}
                  className="position-absolute start-50 top-50 translate-middle opacity-0"/>
                </div>
                <div className="col-12 py-2 ps-1">
                  <img src={picture? picture : detail.vehicle.image ? detail.vehicle.image : defaultImg} width="100%" height={200} style={{objectFit: "cover"}}
                  className="rounded-3"/>
                  <input type="file" onChange={onFileChange}
                  className="position-absolute start-50 top-50 translate-middle opacity-0"/>
                </div>
              </div>
						</div>
						<div className="col-12 col-lg-6 ps-lg-5">
							<Input
								value={name}
								id="name"
								onChange={() => setName(document.getElementById("name").value)} variant={'border'}
								placeholder="Name"
							/>
							<Input
								value={year}
								id="year"
								onChange={() => setYear(document.getElementById("year").value)} variant={'border'}
								placeholder="Year"
							/>
							<Input
								value={location}
								id="location"
								onChange={() => setLocation(document.getElementById("location").value)} variant={'border'}
								placeholder="Location"
							/>
							<Input
								value={cost}
                type="number"
								id="cost"
								onChange={() => setCost(document.getElementById("cost").value)} variant={'border'}
								placeholder="Price"
							/>
							<Input
								value={seat}
								id="seat"
								onChange={() => setSeat(document.getElementById("seat").value)} variant={'border'}
								placeholder="Seat"
							/>
              <select className="form-select lh-lg py-3" aria-label="Default select example" id="category">
                <option selected>Select Status</option>
                <option value="1">Available</option>
                <option value="0">Full booked</option>
              </select>
						</div>
					</div>
          <div className="d-flex flex-column flex-md-row">
            <div className="col-12 col-md-4">
              <select className="form-select bg-color-2 lh-lg" aria-label="Default select example" id="category">
                <option selected>Add item to</option>
                <option value="1">Car</option>
                <option value="2">Bike</option>
                <option value="3">Motorbike</option>
              </select>
            </div>
            <div className="col-12 col-md-8">
              <button onClick={() => changeItem()}>Save item</button>
            </div>
          </div>
				</div>
			</Layout>
		</>
	)
}
