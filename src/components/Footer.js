import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube,
} from 'react-icons/fa';
import logo from '../assets/images/logo.png';

export default class Footer extends Component {
  render() {
    return (
      <footer className="mt-5">
        <div className="row container">
          <div className="col-12 col-lg-5">
            <Link to="/"><img alt="logo" width="40" height="40" src={logo} /></Link>
            <div className="about">
              Plan and book your perfect trip with
              expert advice, travel tips for vehicle
              information from us
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-2">
            <div className="destinations">
              <h5>Destinations</h5>
              <Link to="/">Bali</Link>
              <Link to="/">Yogyakarta</Link>
              <Link to="/">Jakarta</Link>
              <Link to="/">Kalimantan</Link>
              <Link to="/">Malang</Link>
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-2">
            <div className="vehicles">
              <h5>Vehicles</h5>
              <Link to="/">Bike</Link>
              <Link to="/">Cars</Link>
              <Link to="/">Motorbike</Link>
              <Link to="/">Return Times</Link>
              <Link to="/">FAQs</Link>
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <div className="interests">
              <h5>Interests</h5>
              <Link to="/">Adventure Travel</Link>
              <Link to="/">Art and Culture</Link>
              <Link to="/">Wildlife and Nature</Link>
              <Link to="/">Family Holidays</Link>
              <Link to="/">Culinary Trip</Link>
            </div>
          </div>
        </div>
        <div className="copyright">©2022 Seran Center. All rights reserved</div>
        <div className="socmeds">
          <Link to="/"><FaTwitter /></Link>
          <Link to="/"><FaFacebookF /></Link>
          <Link to="/"><FaInstagram /></Link>
          <Link to="/"><FaLinkedinIn /></Link>
          <Link to="/"><FaYoutube /></Link>
        </div>
      </footer>
    );
  }
}
