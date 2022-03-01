import React, {Component} from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png'
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
export default class FooterB extends Component{
    render(){
        return(
            <footer className="mt-5">
                <div className="row">
                    <div className="col-12 col-lg-5">
                        <a href="index.html"><img alt="logo" width="40" height="40" src={logo}/></a>
                        <div className="about">Plan and book your perfect trip with 
                        expert advice, travel tips for vehicle
                        information from us
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
        )
    }
}
