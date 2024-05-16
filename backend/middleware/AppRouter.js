const SystemAdminCreateAccountController = require('../controllers/SystemAdminCreateAccountController');
const SystemAdminCreateProfileController = require('../controllers/SystemAdminCreateProfileController');
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

        // // Real Estate Agent Routes
        // this.router.post('/rea/login', new RealEstateAgentLoginController().login);
        // this.router.put('/rea/logout', new AuthMiddleware().protect, new RealEstateAgentLogoutController().logout,)
        //
        // // Buyer Routes
        // this.router.post('/buyer/login', new BuyerLoginController().handleLogin);
        // this.router.put('/buyer/logout', new AuthMiddleware().protect, new BuyerLogoutController().logout,)
        //
        // // Seller Routes
        // this.router.post('/seller/login', new SellerLoginController().login);
        // this.router.put('/seller/logout', new AuthMiddleware().protect, new SellerLogoutController().logout,)
    }
}

module.exports = AppRouter;
