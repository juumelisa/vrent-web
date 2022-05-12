import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube,
} from 'react-icons/fa';
import logo from '../assets/images/logo.png';

export default class FooterB extends Component {
  render() {
    return (
      <footer className="container mt-5">
        <div className="row">
          <div className="col-12 col-lg-7">
            <div className="col-2">
              <Link to="/"><img alt="logo" width="40" height="40" src={logo} /></Link>
            </div>
            <div className="text-left">
              Plan and book your perfect trip with
              expert advice, travel tips for vehicle
              information from us
            </div>
          </div>
        </div>
        <p className="m-2 py-3">©2022 Seran Center. All rights reserved</p>
        <div className="d-flex flex-row justify-content-center border-top border-3 border-dark mt-4 py-3">
          <Link to="/" className="px-2 col-md-1 text-dark"><FaTwitter size={24}/></Link>
          <Link to="/" className="px-2 col-md-1 text-dark"><FaFacebookF size={24}/></Link>
          <Link to="/" className="px-2 col-md-1 text-dark"><FaInstagram size={24}/></Link>
          <Link to="/" className="px-2 col-md-1 text-dark"><FaLinkedinIn size={24}/></Link>
          <Link to="/" className="px-2 col-md-1 text-dark"><FaYoutube size={24}/></Link>
        </div>
      </footer>
    );
  }
}
