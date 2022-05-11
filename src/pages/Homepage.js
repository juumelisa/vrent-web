import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import Layout from '../components/Layout';
import testimony from '../assets/images/edward-testimony.png';
import defaultImg from '../assets/images/default-img.png';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getVehicles } from '../redux/actions/vehicles';
import Helmets from '../components/Helmets';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { getDataUser } from '../redux/actions/auth';

export const Homepage=({getVehicles})=> {
  const {vehicles: vhc, auth} = useSelector(state => state)
  const token = window.localStorage.getItem('seranToken')
  const userData = window.localStorage.getItem('seranUserData')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'));
  useEffect(() => {
    getVehicles(4, null, 'totalRent+DESC');
    if (token && !userData) {
      dispatch(getDataUser(token))
    }
  }, [getVehicles]);

  const goToDetail = (id) => {
    if(auth.userData.role === 'admin') {
      navigate(`/edit-item/${id}`)
    } else {
      navigate(`/vehicle/${id}`);
    }
  };
  const handleSearch = () => {
    navigate(`/vehicles?name=${search}`, { replace: true });
  };
  return (
    <>
    <Layout>
      <Helmets title={'Home'} />
      <div className="search-section">
        <div className="search-background py-5">
          <div className="container">
            <h1 className="py-5">Explore and Travel</h1>
            <form onSubmit={handleSearch} className="fs-5" style={{ width: '100%' }}>
              <h2 className="fs-4 p-0 mb-5">Vehicle Finder</h2>
              <div className="line mb-5" />
              <Input placeholder="Type the vehicle (ex. motorbike)" variant="pink" value={search} onChange={e => setSearch(e.target.value)}/>
              <div className="location-date col-12 d-flex flex-column flex-md-row p-0">
                <Input placeholder="Location" variant={"pink"} />
                <div className="mx-1" />
                <Input type="date" variant={"pink"} value={date} onChange={e => setDate(e.target.value)} min={new Date().toLocaleDateString('en-CA')}/>
              </div>
              <Button variant={'dark'}>Search</Button>
            </form>
          </div>
        </div>
      </div>
      <main className="container">
        <div className="py-5">
          <div className="heading-section d-flex align-items-center my-3" style={{ width: '100%' }}>
            {auth.userData.role === 'admin' &&
              <div>
                <Link to="/add-item">Add New Item</Link>
              </div>
            }
            <h1 style={{ width: '50%' }}>Popular in town</h1>
            <div className="other-vehicles text-end" style={{ width: '50%' }}>
              <Link to="/popular-in-town" style={{ color: '#1572A1' }}>
                View all
                <FaChevronRight className="ms-3" />
              </Link>
            </div>
          </div>
          <div className="row">
            {vhc.vehicles.map((data) => (
              <div key={data.id} onClick={() => goToDetail(data.id)} className="col-12 col-md-6 col-lg-3 popular-vehicles position-relative py-3" style={{ cursor: 'pointer' }}>
                <img className="img-fluid" src={data.image} alt={data.name} onError={e => e.target.src=defaultImg} style={{height: "200px"}}/>
                <div className="location position-absolute bottom-0 bg-white p-2">
                  <h6 className="m-0">{data.name}</h6>
                  <p className="m-0">{data.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="testimony-section py-5">
          <h2 className="fw-bold">Testimonials</h2>
          <div className="user-testimony d-flex flex-column-reverse flex-md-row justify-content-center align-items-center mx-auto p-3">
            <div className="message p-2">
              <div className="star text-center text-md-start">
                <AiFillStar style={{ color: 'ffc40c' }} />
                <AiFillStar style={{ color: 'ffc40c' }} />
                <AiFillStar style={{ color: 'ffc40c' }} />
                <AiFillStar style={{ color: 'ffc40c' }} />
                <AiFillStar style={{ color: 'ffc40c' }} />
              </div>
              <div className="msg">
                <p className="text-center text-md-start fs-5 fw-normal">”It was the right decision to rent vehicle here, I spent less money and enjoy the trip. It was an amazing experience to have a ride for wildlife trip!”</p>
                <h6 className="text-center text-md-start fw-bold">Edward Newgate</h6>
                <p className="text-center text-md-start fs-6">Founder Circle</p>
              </div>
            </div>
            <div className="user">
              <img className="img-fluid mx-auto d-block" src={testimony} alt="user" width="100%" height="100%" />
            </div>
          </div>
        </div>
      </main>
    </Layout>
    </>
  );
}
const mapStateToProps = state => ({vehicles: state.vehicles})
const mapDispatchToProps = {getVehicles}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
