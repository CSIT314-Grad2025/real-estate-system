const PropertyListing = require("../entities/PropertyListing");

// @UserStory
// As a buyer, I want to calculate mortgage value which is estimating monthly payments based
// on the price of the property, interest rate and other relevant factors,
// so that I can determine if a property is within my budget.

class BuyerCalculateMortgageController {
    // Controller Method
    handleViewPropertyListing = async (req, res, next) => {
        const { id, interestRate, loanTermYears } = req.body;
        try {
            if (!id) {
                let err = new Error('Missing field(s): id');
                err.status = 400;
                throw err;
            }

            // Entity Method Call
            let propertyListing = await new PropertyListing().getPropertyListingByID(id);

            // Calculate mortgage
            let propertyPrice = propertyListing.listPrice;
            const monthlyInterestRate = interestRate / 100 / 12;
            const totalPayments = loanTermYears * 12;
            const mortgage = propertyPrice * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
                (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

            // Mortgage value sent to the boundary
            res.status(200).json({
                mortgage
            })

        } catch (err) {
            err.status = 400;
            next(err);
        }
    }
}

module.exports = BuyerCalculateMortgageController;
