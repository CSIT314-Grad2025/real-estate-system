'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SavedListing extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            SavedListing.belongsTo(models.UserProfile, {
                foreignKey: 'buyerProfileId',
            });

            SavedListing.belongsTo(models.PropertyListing, {
                foreignKey: 'propertyListingId',
            });
        }
    }
    SavedListing.init({
        propertyListingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        buyerProfileId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'SavedListing',
    });
    return SavedListing;
};
