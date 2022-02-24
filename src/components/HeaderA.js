import React, {Component} from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png'

export default class HeaderA extends Component{
    render(){
        return(
            <>
                <div className="header-space"></div>
                <nav className="navbar navbar-expand-lg">
                <Link to="/" className="navbar-brand"><img src={logo} alt="logo" /></Link>
                <button className="navbar-toggler ms-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa-solid fa-bars"></i>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/vehicle-list">Vehicle Type</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/history">History</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/history">About</Link>
                    </li>
                    <li className="text-center"><Link to="/login" className="btn btn-primary login" role="button">Login</Link></li>
                    <li className="text-center"><Link className="btn btn-primary register" to="/register" role="button">Register</Link></li>
                    </ul>
                </div>
                </nav>
                <div className="header-space-two"></div>
            </>
        )
    }
}