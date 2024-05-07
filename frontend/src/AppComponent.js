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
import LinkPage from './pages/LinkPage';

class AppComponent extends Component {
    roles = {
        BUYER: "buyer",
        SELLER: "seller",
        REALESTATEAGENT: "agent",
        SYSTEMADMIN: "systemadmin",
    }

    render() {
        return (
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* public routes*/}
                    <Route path="/" element={<LinkPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="unauthorized" element={<Unauthorized />} />

                    {/* protected routes*/}
                    <Route element={<RequireAuth allowedRoles={[this.roles.BUYER]} />} >
                        <Route path="buyer" element={<BuyerHomePage />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[this.roles.SELLER]} />} >
                        <Route path="seller" element={<SellerHomePage />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[this.roles.REALESTATEAGENT]} />} >
                        <Route path="agent" element={<RealEstateAgentHomePage />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[this.roles.SYSTEMADMIN]} />} >
                        <Route path="systemadmin" element={<SystemAdminHomePage />} />
                    </Route>

                    {/* catch all*/}
                    <Route path="missing" element={<MissingPage />} />
                </Route>
            </Routes>
        );
    }
}

export default AppComponent;
