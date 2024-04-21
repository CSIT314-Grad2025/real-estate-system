const BuyerLoginController = require('../controllers/BuyerLoginController');
const BuyerLogoutController = require('../controllers/BuyerLogoutController');
const RealEstateAgentLoginController = require('../controllers/RealEstateAgentLoginController');
const RealEstateAgentLogoutController = require('../controllers/RealEstateAgentLogoutController');
const SellerLoginController = require('../controllers/SellerLoginController');
const SellerLogoutController = require('../controllers/SellerLogoutController');
const SystemAdminLoginController = require('../controllers/SystemAdminLoginController');
const SystemAdminLogoutController = require('../controllers/SystemAdminLogoutController');
const AuthMiddleware = require('./AuthMiddleware');

class AppRouter {
    express;
    router;

    constructor() {
        this.express = require('express');
        this.router = this.express.Router();


        // System Admin Routes
        this.router.post('/systemadmin/login', new SystemAdminLoginController().login);
        this.router.put('/systemadmin/logout', new AuthMiddleware().protect, new SystemAdminLogoutController().logout,)

        // Real Estate Agent Routes
        this.router.post('/rea/login', new RealEstateAgentLoginController().login);
        this.router.put('/rea/logout', new AuthMiddleware().protect, new RealEstateAgentLogoutController().logout,)

        // Buyer Routes
        this.router.post('/buyer/login', new BuyerLoginController().login);
        this.router.put('/buyer/logout', new AuthMiddleware().protect, new BuyerLogoutController().logout,)

        // Seller Routes
        this.router.post('/seller/login', new SellerLoginController().login);
        this.router.put('/seller/logout', new AuthMiddleware().protect, new SellerLogoutController().logout,)
    }
}

module.exports = AppRouter;
