const BuyerLoginController = require('../controllers/BuyerLoginController');
const BuyerLogoutController = require('../controllers/BuyerLogoutController');
const RealEstateAgentLoginController = require('../controllers/RealEstateAgentLoginController');
const RealEstateAgentLogoutController = require('../controllers/RealEstateAgentLogoutController');
const SellerLoginController = require('../controllers/SellerLoginController');
const SellerLogoutController = require('../controllers/SellerLogoutController');
const SystemAdminCreateAccountController = require('../controllers/SystemAdminCreateAccountController');
const SystemAdminCreateProfileController = require('../controllers/SystemAdminCreateProfileController');
const SystemAdminDeleteAccountController = require('../controllers/SystemAdminDeleteAccountController');
const SystemAdminDeleteProfileController = require('../controllers/SystemAdminDeleteProfileController');
const SystemAdminLoginController = require('../controllers/SystemAdminLoginController');
const SystemAdminLogoutController = require('../controllers/SystemAdminLogoutController');
const SystemAdminSearchAccountsController = require('../controllers/SystemAdminSearchAccountsController');
const SystemAdminSearchProfilesController = require('../controllers/SystemAdminSearchProfilesController');
const SystemAdminUpdateAccountController = require('../controllers/SystemAdminUpdateAccountController');
const SystemAdminUpdateProfileController = require('../controllers/SystemAdminUpdateProfileController');
const SystemAdminViewAccountController = require('../controllers/SystemAdminViewAccountController');
const SystemAdminViewProfileController = require('../controllers/SystemAdminViewProfileController');
const AuthMiddleware = require('./AuthMiddleware');

class AppRouter {
    express;
    router;

    constructor() {
        this.express = require('express');
        this.router = this.express.Router();


        // System Admin Routes

        // Login / Logout
        this.router.post('/systemadmin/login', new SystemAdminLoginController().handleLogin);
        this.router.put('/systemadmin/logout', new AuthMiddleware().protect, new SystemAdminLogoutController().logout,)

        // Create User Account
        this.router.post('/systemadmin/create/account', new AuthMiddleware().protect, new SystemAdminCreateAccountController().handleCreateAccount);
        // Search User Accounts
        this.router.get('/systemadmin/search/account', new AuthMiddleware().protect, new SystemAdminSearchAccountsController().handleSearch);
        // View User Account
        this.router.get('/systemadmin/view/account/:id', new AuthMiddleware().protect, new SystemAdminViewAccountController().handleViewAccount);
        // Update User Accounts
        this.router.put('/systemadmin/update/account/:id', new AuthMiddleware().protect, new SystemAdminUpdateAccountController().handleUpdateAccount);
        // Delete User Account
        this.router.delete('/systemadmin/delete/account/:id', new AuthMiddleware().protect, new SystemAdminDeleteAccountController().handleDeleteAccount)

        // Create User Profile
        this.router.post('/systemadmin/create/profile/:accountId', new AuthMiddleware().protect, new SystemAdminCreateProfileController().handleCreateProfile);
        // Search User Profiles
        this.router.get('/systemadmin/search/profile', new AuthMiddleware().protect, new SystemAdminSearchProfilesController().handleSearch);
        // View User Profile
        this.router.get('/systemadmin/view/profile/:id', new AuthMiddleware().protect, new SystemAdminViewProfileController().handleViewProfile);
        this.router.get('/systemadmin/view/profile/byaccount/:accountId', new AuthMiddleware().protect, new SystemAdminViewProfileController().handleViewProfile);
        // Update User Profile
        this.router.put('/systemadmin/update/profile/:id', new AuthMiddleware().protect, new SystemAdminUpdateProfileController().handleUpdateProfile);
        // Delete User Profile
        this.router.delete('/systemadmin/delete/profile/:id', new AuthMiddleware().protect, new SystemAdminDeleteProfileController().handleDeleteProfile)

        // Real Estate Agent Routes
        this.router.post('/realestateagent/login', new RealEstateAgentLoginController().handleLogin);
        this.router.put('/realestateagent/logout', new AuthMiddleware().protect, new RealEstateAgentLogoutController().logout)

        // Buyer Routes
        this.router.post('/buyer/login', new BuyerLoginController().handleLogin);
        this.router.put('/buyer/logout', new AuthMiddleware().protect, new BuyerLogoutController().logout)

        // Seller Routes
        this.router.post('/seller/login', new SellerLoginController().handleLogin);
        this.router.put('/seller/logout', new AuthMiddleware().protect, new SellerLogoutController().logout,)
    }
}

module.exports = AppRouter;
