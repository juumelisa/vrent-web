import React, { Component } from "react";
import Footer from "../components/Footer";

export default class ForgotPassword extends Component{
    render(){
        return(
            <>
                <section>
                <div className="wrapper">
                    <div className="back-arrow">
                    <a href="login.html" className="d-inline-flex justify-content-start">
                        <i className="fa-solid fa-chevron-left sm-me-2 me-5"></i>
                        <p>Back</p>
                    </a>
                    </div>
                    <h1 className="text-center">Don’t worry, we got your back!</h1>
                    <form>
                    <input className="mb-4" type="email" name="email" placeholder="Enter your email address" />
                    <button>Send Link</button>
                    </form>
                    <div className="message">
                    <p>You will receive a link to reset your password.
                        If you haven’t received any link, click <a href="#">Resend Link</a>
                    </p>
                    </div>
                </div>
                </section>
                <Footer/>
            </>
        )
    }
}