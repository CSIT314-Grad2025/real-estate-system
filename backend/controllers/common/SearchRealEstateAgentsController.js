const UserProfile = require("../../entities/UserProfile");

class SearchRealEstateAgentsController {
    handleSearchRealEstateAgents = async (req, res, next) => {
        try {
            // Profile requested by accountId or profile id?
            let id = req.id;
            const realEstateAgentProfiles = await new UserProfile().getAllRealEstateAgentProfiles();

            res.status(200).json({
                realEstateAgentProfiles
            })

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = SearchRealEstateAgentsController;
