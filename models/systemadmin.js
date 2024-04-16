'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SystemAdmin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            SystemAdmin.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE' // Optional: Specify the behavior on user deletion
            });
        }
    }
    SystemAdmin.init({
        contactNumber: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'SystemAdmin',
    });
    return SystemAdmin;
};
