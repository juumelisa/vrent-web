import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Helmets from "../components/Helmets";
import Layout from "../components/Layout";
import { FaChevronLeft } from 'react-icons/fa';
import defaultImg from "../assets/images/default-img.png";
import { Input } from "../components/Input";

export const AddItem = () => {
	const {auth} = useSelector(state => state)
	const [picture, setPicture] = useState()
	const [name, setName] = useState()
	const [year, setYear] = useState()
	const [cost, setCost] = useState()
	const [location, setLocation] = useState()
	// const [category, setCategory] = useState()
	// const [type, setType] = useState();

	const navigate = useNavigate()
	useEffect(()=>{
		if(auth.userData.role !== 'admin') {
			navigate('/404')
		}
	})
  const goBack = () => {
    window.history.back();
  };
	const onFileChange = e => {
		console.log(e.target.files)
		setPicture(URL.createObjectURL(e.target.files[0]))
		console.log(picture)
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
						<div className="col-12 col-md-8 col-lg-6 mx-auto m-lg-0 position-relative">
							<img src={picture? picture : defaultImg} width="100%" height={300} style={{objectFit: "cover"}}/>
							<input type="file" onChange={onFileChange} id="uploaded"
							className="position-absolute start-50 top-50 translate-middle opacity-0"
							style={{height: "100%", width: "100%"}}/>
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
								id="cost"
								onChange={() => setCost(document.getElementById("cost").value)} variant={'border'}
								placeholder="Price"
							/>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}