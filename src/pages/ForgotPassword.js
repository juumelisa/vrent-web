import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { FaChevronLeft} from "react-icons/fa"

export default class ForgotPassword extends Component{
    render(){
        return(
            <>
                <section>
                <div className="wrapper">
                    <div className="back-arrow">
                    <Link to="/login" className="d-inline-flex justify-content-start">
                    <FaChevronLeft className="fs-3 me-5" />
                        <p>Back</p>
                    </Link>
                    </div>
                    <h1 className="text-center">Don’t worry, we got your back!</h1>
                    <form className="forgot">
                        <input className="mb-4" type="email" name="email" placeholder="Enter your email address" />
                        <button>Send Link</button>
                    </form>
                    <div className="message">
                    <p>You will receive a link to reset your password.
                        If you haven’t received any link, click <Link to="/" style={{textDecoration: "underline"}}>Resend Link</Link>
                    </p>
                    </div>
                </div>
                </section>
                <Footer/>
            </>
        )
    }
}