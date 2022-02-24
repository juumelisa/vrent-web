import React, {Component} from "react";
import googleLogo from '../assets/images/google-logo.png'

export default class Register extends Component{
    render(){
        return (
            <div className="right-container">
                <form>
                    <h1>Sign Up</h1>
                    <input type="text" placeholder="Name"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button>Sign Up</button>
                </form>
                <div class="login-way">
                    <div class="line"></div>
                    <div class="way">or try another way</div>
                    <div class="line"></div>
                </div>
                <div class="login-choices">
                <a class="btn btn-primary google" href="#" role="button"><img src={googleLogo} alt="logo google"/>Signup with Google</a>
                <a class="btn btn-primary register" href="login.html" role="button">Login</a>
                </div>
            </div>
        )
    }
}