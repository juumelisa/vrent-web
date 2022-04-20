import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube,
} from 'react-icons/fa';
import logo from '../assets/images/logo.png';

export default class Footer extends Component {
  render() {
    return (
      <footer className="mt-5 mx-auto">
        <div className="container position-relative row mx-auto px-0 pb-5 pb-lg-0">
          <div className="col-12 col-lg-5 mx-auto ms-lg-0 p-0">
            <div className="text-lg-start">
              <div className="col-12 col-lg-1">
                <Link to="/"><img alt="logo" width="40" height="40" src={logo} /></Link>
              </div>
              <p className="col-12 col-lg-9">Plan and book your perfect trip with
              expert advice, travel tips for vehicle
              information from us</p>
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-2">
            <h5>Destinations</h5>
            <Link to="/">Bali</Link>
            <Link to="/">Yogyakarta</Link>
            <Link to="/">Jakarta</Link>
            <Link to="/">Kalimantan</Link>
            <Link to="/">Malang</Link>
          </div>
          <div className="col-12 col-md-4 col-lg-2">
            <h5>Vehicles</h5>
            <Link to="/">Bike</Link>
            <Link to="/">Cars</Link>
            <Link to="/">Motorbike</Link>
            <Link to="/">Return Times</Link>
            <Link to="/">FAQs</Link>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <h5>Interests</h5>
            <Link to="/">Adventure Travel</Link>
            <Link to="/">Art and Culture</Link>
            <Link to="/">Wildlife and Nature</Link>
            <Link to="/">Family Holidays</Link>
            <Link to="/">Culinary Trip</Link>
          </div>
          <div className="position-absolute bottom-0 m-0 p-0 col-12">
            <p className="m-0 pb-1 pb-lg-0">©2022 Seran Center. All rights reserved</p>
          </div>
          {/* <div className="position-absolute bottom-0 start-0 col-12 p-0">
            <p>©2022 Seran Center. All rights reserved</p>
          </div> */}

        </div>
        <div className="socmeds">
          <Link to="/"><FaTwitter /></Link>
          <Link to="/"><FaFacebookF /></Link>
          <a href="https://instagram.com/juumelisa" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://linkedin.com/in/jumelisah" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          <Link to="/"><FaYoutube /></Link>
        </div>
      </footer>
    );
  }
}
