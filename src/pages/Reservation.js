import React, {Component} from "react";
import Layout from "../components/Layout";

export default class Reservation extends Component{
    render(){
        return (
            <Layout>
                <section>
                    <div className="back-arrow">
                        <a href="yogyakarta-fixie-gray.html" className="d-inline-flex justify-content-start">
                        <i className="fa-solid fa-chevron-left me-5"></i>
                        <p>Reservation</p>
                        </a>
                    </div>
                    <div className="vehicle">
                        <div className="vehicle-details d-flex flex-wrap justify-content-center">
                            <div className="vehicle-img p-3">
                                <img src="./assets/images/fixie-gray-detail.png" alt="fixie gray"/>
                            </div>
                            <div className="description">
                                <div className="details p-3">
                                    <div className="city">
                                        <h2>Fixie - Gray Only</h2>
                                        <h3>Yogyakarta</h3>
                                    </div>
                                    <div className="qty">
                                        <p>Qt : 2 bikes</p>
                                        <p>No prepayment</p>
                                    </div>
                                    <div className="detail">
                                        <h6>Details :</h6>
                                        <p>1 bike : Rp. 78.000</p>
                                        <p>1 bike : Rp. 78.000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form>
                        <div className="reservation d-flex flex-wrap justify-content-center">
                            <label>Reservation date:</label>
                            <input className="mx-3 my-1" type="datetime-local" name="rent-date" placeholder="Start Date"/>
                            <input className="mx-3 my-1" type="datetime-local" name="return-date" placeholder="Return Date"/>
                        </div>
                            <div className="link m-3">
                            <a href="#" className="btn btn-total my-3">Total : Rp. 178.000</a>
                            <button>Go to Payment</button>
                        </div>
                    </form>
                
                </section>
            </Layout>
        )
    }
}