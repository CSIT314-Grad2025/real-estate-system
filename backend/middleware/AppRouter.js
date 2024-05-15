const BuyerLoginController = require('../controllers/BuyerLoginController');
const BuyerLogoutController = require('../controllers/BuyerLogoutController');
const RealEstateAgentLoginController = require('../controllers/RealEstateAgentLoginController');
const RealEstateAgentLogoutController = require('../controllers/RealEstateAgentLogoutController');
const SellerLoginController = require('../controllers/SellerLoginController');
const SellerLogoutController = require('../controllers/SellerLogoutController');
const SystemAdminCreateAccountController = require('../controllers/SystemAdminCreateAccountController');
const SystemAdminDeleteAccountController = require('../controllers/SystemAdminDeleteAccountController()');
const SystemAdminLoginController = require('../controllers/SystemAdminLoginController');
const SystemAdminLogoutController = require('../controllers/SystemAdminLogoutController');
const SystemAdminSearchAccountsController = require('../controllers/SystemAdminSearchAccountsController');
const SystemAdminUpdateAccountController = require('../controllers/SystemAdminUpdateAccountController');
const SystemAdminViewAccountController = require('../controllers/SystemAdminViewAccountController');
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
        this.router.post('/systemadmin/create', new SystemAdminCreateAccountController().handleCreateAccount);
        //
        // // Read User Account
        // this.router.post('/systemadmin/view', new SystemAdminViewAccountController().handleViewAccount);
        //
        // // Update User Accounts
        // this.router.post('/systemadmin/update', new SystemAdminUpdateAccountController().handleUpdateAccount);
        //
        // // Search User Accounts
        // this.router.post('/systemadmin/search', new SystemAdminSearchAccountsController().handleSearch);
        //
        // // Delete User Account
        // this.router.delete('/systemadmin/delete', new SystemAdminDeleteAccountController().handleDeleteAccount)
        //
        //
        // // Real Estate Agent Routes
        // this.router.post('/rea/login', new RealEstateAgentLoginController().login);
        // this.router.put('/rea/logout', new AuthMiddleware().protect, new RealEstateAgentLogoutController().logout,)
        //
        // // Buyer Routes
        // this.router.post('/buyer/login', new BuyerLoginController().login);
        // this.router.put('/buyer/logout', new AuthMiddleware().protect, new BuyerLogoutController().logout,)
        //
        // // Seller Routes
        // this.router.post('/seller/login', new SellerLoginController().login);
        // this.router.put('/seller/logout', new AuthMiddleware().protect, new SellerLogoutController().logout,)
    }
}

module.exports = AppRouter;
