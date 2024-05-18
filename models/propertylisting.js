'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PropertyListing extends Model {
        static associate(models) {
            // Foreign key association to UserProfile as sellerProfile
            PropertyListing.belongsTo(models.UserProfile, {
                foreignKey: 'sellerProfileId',
                as: 'sellerProfile',
            });

            // Foreign key association to UserProfile as agentProfile
            PropertyListing.belongsTo(models.UserProfile, {
                foreignKey: 'agentProfileId',
                as: 'agentProfile',
            });
        }
    }

    PropertyListing.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        propertyType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        livingArea: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bedrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bathrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        listPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        sellerProfileId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        agentProfileId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'PropertyListing',
    });

    return PropertyListing;
};
