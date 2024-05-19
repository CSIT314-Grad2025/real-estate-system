const BuyerLoginController = require('../controllers/BuyerLoginController');
const BuyerLogoutController = require('../controllers/BuyerLogoutController');
const RealEstateAgentCreateListingController = require('../controllers/RealEstateAgentCreateListingController');
const RealEstateAgentDeleteListingController = require('../controllers/RealEstateAgentDeleteListingController');
const RealEstateAgentLoginController = require('../controllers/RealEstateAgentLoginController');
const RealEstateAgentLogoutController = require('../controllers/RealEstateAgentLogoutController');
const RealEstateAgentSearchListingsController = require('../controllers/RealEstateAgentSearchListingsController');
const RealEstateAgentUpdateListingController = require('../controllers/RealEstateAgentUpdateListingController');
const RealEstateAgentViewMyListingsController = require('../controllers/RealEstateAgentViewMyListingsController');
const SellerCreateReviewController = require('../controllers/SellerCreateReviewController');
const SellerLoginController = require('../controllers/SellerLoginController');
const SellerLogoutController = require('../controllers/SellerLogoutController');
const SellerRateAgentController = require('../controllers/SellerRateAgentController');
const SellerViewMyListingsController = require('../controllers/SellerViewMyListingsController');
const SellerViewPropertyController = require('../controllers/SellerViewPropertyController');
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
const SearchRealEstateAgentsController = require('../controllers/common/SearchRealEstateAgentsController');
const ViewListingController = require('../controllers/common/ViewListingController');
const ViewMyProfileController = require('../controllers/common/ViewMyProfileController');
const ViewProfileController = require('../controllers/common/ViewProfileController');
const ViewReviewsController = require('../controllers/common/ViewReviewsController');
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
        // Create Property Listing
        this.router.post('/realestateagent/create/listing', new AuthMiddleware().protect, new RealEstateAgentCreateListingController().handleCreateListing);
        // Search Property Listing
        this.router.get('/realestateagent/search/listing', new AuthMiddleware().protect, new RealEstateAgentSearchListingsController().handleSearchListings);
        // View my listings
        this.router.get('/realestateagent/view/my/listing', new AuthMiddleware().protect, new RealEstateAgentViewMyListingsController().handleViewListings);
        // Update listing
        this.router.put('/realestateagent/update/listing/:id', new AuthMiddleware().protect, new RealEstateAgentUpdateListingController().handleUpdateListing);
        // Delete listing
        this.router.delete('/realestateagent/delete/listing/:id', new AuthMiddleware().protect, new RealEstateAgentDeleteListingController().handleDeleteListing);

        // Buyer Routes
        this.router.post('/buyer/login', new BuyerLoginController().handleLogin);
        this.router.put('/buyer/logout', new AuthMiddleware().protect, new BuyerLogoutController().logout)

        // Seller Routes
        this.router.post('/seller/login', new SellerLoginController().handleLogin);
        this.router.put('/seller/logout', new AuthMiddleware().protect, new SellerLogoutController().logout,)
        this.router.get('/seller/view/listing/:id', new AuthMiddleware().protect, new SellerViewPropertyController().handleViewPropertyListing);
        this.router.get('/seller/view/my/listing', new AuthMiddleware().protect, new SellerViewMyListingsController().handleViewListings);
        this.router.post('/seller/create/review/:agentProfileId', new AuthMiddleware().protect, new SellerRateAgentController().handleRateAgent);
        this.router.put('/seller/update/review/:agentProfileId', new AuthMiddleware().protect, new SellerCreateReviewController().handleCreateReview);


        // Common Routes
        
        // View User Profile
        this.router.get('/common/view/myprofile', new AuthMiddleware().protect, new ViewMyProfileController().handleViewMyProfile);
        // View Property Listing
        this.router.get('/common/view/listing/:id', new AuthMiddleware().protect, new ViewListingController().handleViewListing);
        // View Real Estate Agents
        this.router.get('/common/search/realestateagent', new AuthMiddleware().protect, new SearchRealEstateAgentsController().handleSearchRealEstateAgents);
        // View Real Estate Agent
        this.router.get('/common/view/realestateagent/:id', new AuthMiddleware().protect, new ViewProfileController().handleViewProfile);
        // View Reviews
        this.router.get('/common/view/reviews/:id', new AuthMiddleware().protect, new ViewReviewsController().handleViewReviews);
    }
}

module.exports = AppRouter;
