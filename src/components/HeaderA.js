import React, {Component} from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png'

export default class HeaderA extends Component{
    render(){
        return(
            <>
            <div className="header-space"></div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top p-2">
                <div className="container">
                    <Link className="navbar-brand" to="/"><img className="img-fluid" alt="logo" width="40" height="40" src={logo} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/vehicles">Vehicle Type</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">History</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">About</Link>
                        </li>
                        <li className="text-center"><Link className="btn btn-primary login" to="/login" role="button">Login</Link></li>
                        <li className="text-center"><Link className="btn btn-primary register" to="/register" role="button">Register</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
            </>
        )
    }
}