import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './assets/css/header.css';
import './assets/css/chat.css';
import './assets/css/style.css';
import './assets/css/footer.css';
import './assets/css/vehicles.css';
import './assets/css/login.css';
import './assets/css/forgot-password.css';
import './assets/css/payment.css';
import './assets/css/vehicle-detail.css';
import './assets/css/reservation.css';
import './assets/css/profile.css';
import './assets/css/checkbox.css';
import './assets/sass/custom.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
