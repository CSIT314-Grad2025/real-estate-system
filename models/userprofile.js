'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserProfile extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {
                foreignKey: 'accountId',
                onDelete: 'CASCADE', // Optional: Define the deletion behavior
            });

            UserProfile.hasMany(models.PropertyListing, {
                foreignKey: 'agentProfileId',
                onDelete: 'CASCADE', // Optional: Define the deletion behavior
            });

            UserProfile.hasMany(models.PropertyListing, {
                foreignKey: 'sellerProfileId',
                onDelete: 'CASCADE', // Optional: Define the deletion behavior
            });

        }
    }
    UserProfile.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        bio: DataTypes.STRING,
        contactNumber: DataTypes.STRING,
        avatar: DataTypes.STRING,
        // Foreign key for User association
        accountId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
    }, {
        sequelize,
        modelName: 'UserProfile',
    });
    return UserProfile;
};
