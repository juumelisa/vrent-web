import React, { Component } from "react";
import Layout from "../components/Layout";

export default class Profile extends Component{
    render(){
        return(
            <Layout>

                <main>
                <h1>Profile</h1>
                <div class="user-profile position-relative">
                    <div className="user-avatar">
                    <img className="rounded-circle" alt="avatar" width="200" height="200" src="./assets/images/image-profile.webp" />
                    </div>
                    <a className="edit-avatar position-absolute bottom-0 end-0" href="#">
                    <div className="edit-icon position-relative">
                        <i className="fa-solid fa-pencil position-absolute top-50 start-50 translate-middle"></i>
                    </div>
                    </a>
                </div>
                <div className="identity-section">
                    <h1>Samantha Doe</h1>
                    <div className="contact-section">
                    <p className="m-0">samanthadoe@mail.com</p>
                    <p className="m-0">+62833467823</p>
                    <p>Has been active since 2013</p>
                    </div>
                </div>
                <form className="form-section">
                    <div className="contact-section">
                    <h2>Contacts</h2>
                    <label for="email">Email address :</label>
                    <input type="email" name="email" id="email" value="zulaikha17@gmail.com" />
                    <label for="address">Addres :</label>
                    <input type="text" name="address" id="address" value="Iskandar Street no. 67 Block A Near Bus Stop" />
                    <label for="phone-number">Mobile number :</label>
                    <input type="text" name="phone-number" id="phone-number" value="(+62)813456782" />
                    </div>
                    <div className="identity-section">
                    <h2>Identity</h2>
                    <div className="identity-form d-flex flex-wrap">
                        <div className="input-identity part-1">
                        <label for="username">Display name :</label>
                        <input type="text" name="username" id="username" value="zulaikha" />
                        </div>
                        <div className="input-identity part-2">
                        <label for="birthdate">DD/MM/YY :</label>
                        <input type="text" name="birthdate" id="birthdate" value="03/09/2003" />
                        </div>
                    </div>
                    </div>
                    <div className="form-button d-flex flex-wrap justify-content-center">
                    <div className="button p-2">
                        <button className="btn btn-primary">Save Change</button>
                    </div>
                    <div className="button p-2">
                        <a className="btn btn-secondary" href="#">Change password</a>
                    </div>
                    <div className="button p-2">
                        <a className="btn btn-light" href="#">Cancel</a>
                    </div>
                    </div>
                </form>
                </main>
            </Layout>
        )
    }
}