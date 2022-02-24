import React, { Component } from "react";
import Layout from "../components/Layout";

export default class History extends Component{
    render(){
        return(
            <Layout>
  
            <div class="wrapper position-relative">
              <div class="history-section me-2">
                <form class="position-relative">
                  <input type="text" name="search" placeholder="Search History" />
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Filter</button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><button name="filter" type="submit" value="type">Type</button></li>
                      <li><button name="filter" type="submit" value="data-added">Data Added</button></li>
                      <li><button name="filter" type="submit" value="name">Name</button></li>
                      <li class="favorite"><button name="filter" type="submit" value="favorite">Favorite Product</button></li>
                    </ul>
                  </div>
                  <button class="position-absolute"><i class="fa-solid fa-magnifying-glass"></i></button>
                </form>
                <div class="selection position-relative">
                  <div class="select-all position-absolute">
                    <label class="container">Delete
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div class="notification">
                  <div class="today-section">
                    <h5>Today</h5>
                    <div class="select position-relative">
                      <div class="notif position-relative">
                        <p>Please finish your payment for vespa for Vespa Rental Jogja</p>
                        <div class="notif-arrow position-absolute">
                          <i class="fa-solid fa-chevron-right"></i>
                        </div>
                      </div>
                      <div class="history position-absolute">
                        <label class="container">
                          <input type="checkbox" name="history-1" />
                          <span class="checkmark"></span>
                        </label>
                      </div>
                    </div>
                    <div class="select position-relative">
                      <div class="notif position-relative">
                        <p>Your payment has been confirmed!</p>
                        <div class="notif-arrow position-absolute">
                          <i class="fa-solid fa-chevron-right"></i>
                        </div>
                      </div>
                      <div class="history position-absolute">
                        <label class="container">
                          <input type="checkbox" name="history-2" />
                          <span class="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="week-section">
                    <h5>A week ago</h5>
                    <div class="select position-relative">
                      <div class="history position-absolute">
                        <label class="container">
                          <input type="checkbox" name="history-3" />
                          <span class="checkmark"></span>
                        </label>
                      </div>
                      <div class="vehicles d-flex flex-wrap">
                        <img src="./assets/images/history-1.png/" />
                        <div class="rent-details">
                          <div class="date-detai">
                            <h6>Vespa Matic</h6>
                            <p>Jan 18 to 21 2021</p>
                          </div>
                          <div class="payment-status">
                            <h6>Prepayment: Rp.245.000</h6>
                            <p>Has been returned</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="select position-relative">
                      <div class="history position-absolute">
                        <label class="container">
                          <input type="checkbox" name="history-4" />
                          <span class="checkmark"></span>
                        </label>
                      </div>
                      <div class="vehicles d-flex flex-wrap">
                        <img src="./assets/images/history-2.png/" />
                        <div class="rent-details">
                          <div class="date-detai">
                            <h6>Vespa Matic</h6>
                            <p>Jan 18 to 21 2021</p>
                          </div>
                          <div class="payment-status">
                            <h6>Prepayment: Rp.245.000</h6>
                            <p>Has been returned</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="delete-button">
                  <button>Delete selected item</button>
                </div>
              </div>
              <div class="new-arrival-section position-absolute">
                <h1>New Arrival</h1>
                <div class="new-vehicles d-flex flex-wrap justify-content-center">
                  <div class="vehicle-images position-relative">
                    <img src="./assets/images/new-1.png/" />
                    <div class="location position-absolute">
                      <h6>Lamborghini</h6>
                      <p>South Jakarta</p>
                    </div>
                  </div>
                  <div class="vehicle-images position-relative">
                    <img src="./assets/images/new-2.png/" />
                    <div class="location position-absolute">
                      <h6>White Jeep</h6>
                      <p>Kalimantan</p>
                    </div>
                  </div>
                </div>
                <div class="another-vehicle">
                  <a href="#">View more<i class="fa-solid fa-chevron-down"></i></a>
                </div>
              </div>
            </div>
        </Layout>
        )
    }
}