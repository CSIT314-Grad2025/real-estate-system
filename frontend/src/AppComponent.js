import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage';
import SellerHomePage from './pages/SellerHomePage';
import BuyerHomePage from './pages/BuyerHomePage';
import SystemAdminHomePage from './pages/SystemAdminHomePage'
import RealEstateAgentHomePage from './pages/RealEstateAgentHomePage'
import Unauthorized from './pages/Unauthorized';
import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import MissingPage from './pages/MissingPage';
import RequireAuth from './components/RequireAuth';

class AppComponent extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* public routes*/}
                    <Route path="login" element={<LoginPage />} />
                    <Route path="unauthorized" element={<Unauthorized />} />

                    {/* protected routes*/}
                    <Route element={<RequireAuth />} >
                        <Route path="/" element={<SellerHomePage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="buyer" element={<SellerHomePage />} />
                    </Route>

                    {/* catch all*/}
                    <Route path="missing" element={<MissingPage />} />
                </Route>
            </Routes>
        );
    }
}

export default AppComponent;
