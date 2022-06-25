import React, { useEffect } from 'react';
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { createBrowserHistory } from 'history';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Reservation from './pages/Reservation';
import VehicleType from './pages/VehicleType';
import History from './pages/History';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Vehicles from './pages/Vehicles';
import PopularInTown from './pages/PopularInTown';
import NotFound from './pages/NotFound';
import PopularCar from './pages/PopularCar';
import ListOfPopularBike from './pages/ListOfPopularBike';
import ListOfPopularCar from './pages/ListOfPopularCar';
import ListOfPopularMotorbike from './pages/ListOfPopularMotorbike';
import Payment from './pages/Payment';
import Counter from './pages/Counter';
import Header from './components/Header';
import {Detail} from './pages/Detail';
import { useDispatch, useSelector } from 'react-redux';
import ChangePassword from './pages/ChangePassword';
import AccountConfirmation from './pages/AccountConfirmation';
// eslint-disable-next-line no-unused-vars
import { getDataUser } from './redux/actions/auth';
import { AddItem } from './pages/AddItem';
import { EditItem } from './pages/EditItem';
import EditPassword from './pages/EditPassword';
import Chat from './pages/Chat';

const App = ()=> {
  const auth = useSelector(state=>state.auth)
  const history = createBrowserHistory({window})
  const dispatch = useDispatch()
  useEffect(()=>{
    const token = window.localStorage.getItem('seranToken')
    if(token){
      dispatch({
        type: 'AUTH_LOGIN_FULFILLED',
        payload: {
          data: {
            result: {
              token
            }
          }
        }
      })
      // dispatch(getDataUser(token))
    }
  }, [dispatch, auth.token])

    return (
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="account-confirmation" element={<AccountConfirmation />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="edit-password" element={<EditPassword />} />
          <Route path="vehicle-list" element={<VehicleType />} />
          <Route path="popular-in-town" element={<PopularInTown />} />
          <Route path="popular-car" element={<ListOfPopularCar />} />
          <Route path="popular-motorbike" element={<ListOfPopularMotorbike />} />
          <Route path="popular-bike" element={<ListOfPopularBike />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="vehicles/:id" element={<Detail history={history} />} />
          <Route path="vehicle/:id" element={<Detail history={history} />} />
          <Route path="vehicles/car" element={<PopularCar />} />
          <Route path="reservation/:id" element={<Reservation />} />
          <Route path="payment/:id" element={<Payment />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
          <Route path="404" element={<NotFound />} />
          <Route path="counter" element={<Counter />} />
          <Route path="header" element={<Header />} />
          <Route path="add-item" element={<AddItem />} />
          <Route path="edit-item/:id" element={<EditItem />} />
          <Route path="chat" element={<Chat />} />
        </Routes>
      </HistoryRouter>
    );
}

export default App