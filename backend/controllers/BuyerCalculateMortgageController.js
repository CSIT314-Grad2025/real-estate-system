const PropertyListing = require("../entities/PropertyListing");

// @UserStory
// As a buyer, I want to calculate mortgage value which is estimating monthly payments based
// on the price of the property, interest rate and other relevant factors,
// so that I can determine if a property is within my budget.

class BuyerCalculateMortgageController {
    // Controller Method
    handleCalcluateMortgage = async (req, res, next) => {
        try {
            // Checking if user is authorized
            if (req.requestingUser.accountType != "buyer") {
                console.log(1)
                let err = new Error('Unauthorized');
                err.status = 400;
                throw err;
            }

            const id = req.params.id;

            const { interestRate, loanTermYears } = req.body;

            // Entity Method Call
            let mortgage = await new PropertyListing().calculateMortgage(id, interestRate, loanTermYears);

            // Mortgage value sent to the boundary
            res.status(200).json({
                mortgage
            })

        } catch (err) {
            err.status = err.status || 400;
            next(err);
        }
    }
}

module.exports = BuyerCalculateMortgageController;
