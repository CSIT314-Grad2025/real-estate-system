import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage'; import SellerHomePage from './pages/SellerHomePage';
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
import CreateUserAccountPage from './pages/CreateUserAccountPage';
import { withRouter } from './withRouter';
import ConfirmationPage from './pages/ConfirmationPage';
import SearchUserAccountsPage from './pages/SearchUserAccountsPage';
import ViewUserAccountPage from './pages/ViewUserAccountPage';
import UpdateUserAccountPage from './pages/UpdateUserAccountPage';
import CreateUserProfilePage from './pages/CreateUserProfilePage';
import UpdateUserProfilePage from './pages/UpdateUserProfilePage';
import SearchUserProfilesPage from './pages/SearchUserProfilesPage';
import CreatePropertyListingPage from './pages/CreatePropertyListingPage';
import RealEstateAgentProfilePage from './pages/RealEstateAgentProfilePage';
import ViewMyListingsPage from './pages/ViewMyListingsPage';
import UpdatePropertyListingPage from './pages/UpdatePropertyListingPage';
import SearchPropertyListingsPage from './pages/SearchPropertyListingsPage';
import SearchRealEstateAgentsPage from './pages/SearchRealEstateAgentsPage';

class AppComponent extends Component {
    state;

    roles = {
        BUYER: "buyer",
        SELLER: "seller",
        REALESTATEAGENT: "realestateagent",
        SYSTEMADMIN: "systemadmin",
    }

    componentDidMount() {
    }

    render() {
        return (
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* public routes*/}
                    {/* <Route path="/" element={<LinkPage />} /> */}
                    <Route path="/" element={<LoginPage />} />
                    <Route path="unauthorized" element={<Unauthorized />} />
                    <Route path="confirmation" element={<ConfirmationPage />} />

                    {/* protected routes*/}
                    <Route element={<RequireAuth allowedRoles={[this.roles.BUYER]} />} >
                        <Route path="buyer/home" element={<BuyerHomePage />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[this.roles.SELLER]} />} >
                        <Route path="seller/home" element={<SellerHomePage />} />
                        <Route path="seller/view/my/listing" element={<ViewMyListingsPage />} />
                        <Route path="seller/search/realestateagent" element={<SearchRealEstateAgentsPage />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[this.roles.REALESTATEAGENT]} />} >
                        <Route path="realestateagent/home" element={<RealEstateAgentHomePage />} />
                        <Route path="realestateagent/create/listing" element={<CreatePropertyListingPage />} />
                        <Route path="realestateagent/create/listing" element={<CreatePropertyListingPage />} />
                        <Route path="realestateagent/profile" element={<RealEstateAgentProfilePage />} />
                        <Route path="realestateagent/view/my/listing" element={<ViewMyListingsPage />} />
                        <Route path="realestateagent/update/listing/:id" element={<UpdatePropertyListingPage />} />
                        <Route path="realestateagent/search/listing" element={<SearchPropertyListingsPage />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[this.roles.SYSTEMADMIN]} />} >
                        <Route path="systemadmin/view/account/:id" element={<ViewUserAccountPage />} />
                        <Route path="systemadmin/update/account/:id" element={<UpdateUserAccountPage />} />
                        <Route path="systemadmin/create/profile/:id" element={<CreateUserProfilePage />} />
                        <Route path="systemadmin/update/profile/:id" element={<UpdateUserProfilePage />} />
                        <Route path="systemadmin/create" element={<CreateUserAccountPage />} />
                        <Route path="systemadmin/home" element={<SystemAdminHomePage />} />
                        <Route path="systemadmin/search" element={<SearchUserAccountsPage />} />
                        <Route path="systemadmin/search/profile" element={<SearchUserProfilesPage />} />
                    </Route>

                    {/* catch all*/}
                    <Route path="*" element={<MissingPage />} />
                </Route>
            </Routes>
        );
    }
}

export default AppComponent;
