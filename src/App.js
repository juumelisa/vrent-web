import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register'
import Homepage from './pages/Homepage';
import Reservation from './pages/Reservation';
import VehicleType from './pages/VehicleType';
import History from './pages/History';
import VehicleDetail from './pages/VehicleDetail';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Vehicles from './pages/Vehicles';
import PopularInTown from './pages/PopularInTown';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="forgot-password" element={<ForgotPassword/>} />
        <Route path="vehicle-list" element={<VehicleType/>} />
        <Route path="popular-in-town" element={<PopularInTown/>} />
        <Route path="vehicle-detail/:id" element={<VehicleDetail/>} />
        <Route path="reservation" element={<Reservation/>} />
        <Route path="history" element={<History/>} />
        <Route path="profile" element={<Profile/>} />
        <Route path="vehicles" element={<Vehicles/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
