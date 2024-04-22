import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage';
import SellerHomePage from './pages/SellerHomePage';
import BuyerHomePage from './pages/BuyerHomePage';
import SystemAdminHomePage from './pages/SystemAdminHomePage'
import RealEstateAgentHomePage from './pages/RealEstateAgentHomePage'
import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class AppComponent extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h1>Real Estate Management System</h1>
                </div>
                <Routes>
                    <Route path='/' Component={LoginPage} />
                    <Route path='/Seller' Component={SellerHomePage} />
                    <Route path='/Buyer' Component={BuyerHomePage} />
                    <Route path='/RealEstateAgent' Component={SystemAdminHomePage} />
                    <Route path='/SystemAdmin' Component={LoginPage} />
                </Routes>
            </Router>
        );
    }
}

export default AppComponent;
