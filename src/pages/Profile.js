import React, { Component } from "react";
import LayoutB from "../components/LayoutB";
import avatar from "../assets/images/user.png"
import { Link } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";

export default class Profile extends Component{
    render(){
        return(
            <LayoutB>

                <main className="container mb-5">
                    <h1>Profile</h1>
                    <div className="user-profile position-relative text-center">
                        <div className="user-avatar">
                        <img className="rounded-circle" alt="avatar" width="200" height="200" src={avatar} />
                        </div>
                        <Link to="/profile" className="position-absolute bottom-0 end-0">
                            <div className="edit-icon position-relative">
                                <i className="fa-solid fa-pencil position-absolute top-50 start-50 translate-middle"></i>
                            </div>
                        </Link>
                    </div>
                    <div className="identity-section text-center">
                        <h1>Samantha Doe</h1>
                        <div className="contact-section">
                        <p className="fs-5 fw-bold m-0">samanthadoe@mail.com</p>
                        <p className="fs-5 fw-bold m-0">+62833467823</p>
                        <p className="fs-5 fw-bold">Has been active since 2013</p>
                        </div>
                    </div>
                    <form className="profile-form">
                        <div class="form-check gender-section d-flex">
                            <label for="male" className="gender-selection position-relative fs-5 ps-3 me-3">
                                <input className="position-absolute top-50 start-0 translate-middle" type="radio" name="gender" id="male" />Male
                            </label>
                            <label for="female" className="gender-selection position-relative ps-3 fs-5">
                                <input className="position-absolute top-50 start-0 translate-middle" type="radio" name="gender" id="female" />Female
                            </label>
                        </div>
                        <div className="contact-section">
                            <h2 className="fs-5 fw-bolder mb-4">Contacts</h2>
                            <label for="email" className="fs-5 mb-4">Email address :</label>
                            <input className="fs-5 mb-4" type="email" name="email" id="email" value="zulaikha17@gmail.com" />
                            <label for="address" className="fs-5 mb-4">Addres :</label>
                            <input className="fs-5 mb-4" type="text" name="address" id="address" value="Iskandar Street no. 67 Block A Near Bus Stop" />
                            <label for="phone-number" className="fs-5 mb-4">Mobile number :</label>
                            <input className="fs-5 mb-4" type="text" name="phone-number" id="phone-number" value="(+62)813456782" />
                        </div>
                        <div className="identity-section">
                            <h2 className="fs-5 fw-bolder mb-4">Identity</h2>
                            <div className="identity-form row">
                                <div className="input-identity col-12 col-md-6">
                                    <label for="username" className="fs-5 mb-4">Display name :</label>
                                    <input className="fs-5 mb-4" type="text" name="username" id="username" value="zulaikha" />
                                </div>
                                <div className="input-identity  col-12 col-md-6">
                                    <label for="birthdate" className="fs-5 mb-4">DD/MM/YY :</label>
                                    <input className="fs-5 mb-4" type="text" name="birthdate" id="birthdate" value="03/09/2003" />
                                </div>
                            </div>
                        </div>
                        <div className="user-button d-flex flex-wrap flex-md-row my-4">
                            <SubmitButton >Save Change</SubmitButton>
                            <div className="change-password btn fs-5 fw-bold mb-2">Change password</div>
                            <div className="cancel btn fs-5 fw-bold mb-2">Cancel</div>
                        </div>
                    </form>
                </main>
            </LayoutB>
        )
    }
}