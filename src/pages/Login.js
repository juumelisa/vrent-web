import React, {Component} from "react";
import { Link } from "react-router-dom";
import googleLogo from '../assets/images/google-logo.png'

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {email: '',
    password: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        const target = event.target
        const email = target.email
        this.setState({
            [email]: email
          });
          console.log(event.target, event.target.value)

    }
    handleSubmit(event) {
        // if(this.state.email!=="admin@mail.com" &&this.state.password!=="1234"){
        //     alert('Not Match '+this.state.email+this.state.password)
        // }
    }
    render(){
        return (
            <div className="right-container">
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <input type="email" name="email" placeholder="Email" onChange={this.handleChange}/>
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                    <input type="submit" value="Login"/>
                    <div></div>
                    <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
                </form>
                <div className="login-way">
                    <div className="line"></div>
                    <div className="way">or try another way</div>
                    <div className="line"></div>
                </div>
                <div className="login-choices">
                    <a className="btn btn-primary google" href="login.html" role="button"><img className="google-logo" alt="google logo" src={googleLogo}/> Login with Google</a>
                    <a className="btn btn-primary register" href="register.html" role="button">Sign Up</a>
                </div>
            </div>
        )
    }
}