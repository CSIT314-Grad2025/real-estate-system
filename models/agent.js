'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Agent extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Agent.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE' // Optional: Specify the behavior on user deletion
            });
        }
    }
    Agent.init({
    }, {
        sequelize,
        modelName: 'Agent',
    });
    return Agent;
};
