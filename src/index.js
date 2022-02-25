import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import './assets/css/home.css'
import './assets/css/header.css'
import './assets/css/footer.css'
import './assets/css/login.css'
import './assets/css/forgot-password.css'
import './assets/css/vehicle-type.css'
import './assets/css/vehicle-detail.css'
import './assets/css/history.css'
import './assets/css/reservation.css'
import './assets/css/profile.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/js/bootstrap.bundle'
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
