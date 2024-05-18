'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Review.belongsTo(models.UserProfile, {
                foreignKey: 'reviewerProfileId',
                as: 'reviewerProfile',
            });

            Review.belongsTo(models.UserProfile, {
                foreignKey: 'agentProfileId',
                as: 'agentProfile',
            });
        }
    }
    Review.init({
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reviewBody: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reviewerProfileId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        agentProfileId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Review',
    });
    return Review;
};
