const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Users", deps: []
 * createTable() => "UserProfiles", deps: [Users]
 * createTable() => "PropertyListings", deps: [UserProfiles, UserProfiles]
 * createTable() => "Reviews", deps: [UserProfiles, UserProfiles]
 *
 */

const info = {
  revision: 1,
  name: "sprint5-migration5",
  created: "2024-05-18T12:45:06.644Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          field: "email",
          unique: true,
          allowNull: false,
        },
        password: { type: Sequelize.STRING, field: "password" },
        isLoggedIn: { type: Sequelize.BOOLEAN, field: "isLoggedIn" },
        accountType: { type: Sequelize.STRING, field: "accountType" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "UserProfiles",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        firstName: { type: Sequelize.STRING, field: "firstName" },
        lastName: { type: Sequelize.STRING, field: "lastName" },
        bio: { type: Sequelize.STRING, field: "bio" },
        contactNumber: { type: Sequelize.STRING, field: "contactNumber" },
        avatar: { type: Sequelize.STRING, field: "avatar" },
        accountId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Users", key: "id" },
          field: "accountId",
          unique: true,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "PropertyListings",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        title: { type: Sequelize.STRING, field: "title", allowNull: false },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: false,
        },
        propertyType: {
          type: Sequelize.STRING,
          field: "propertyType",
          allowNull: false,
        },
        livingArea: {
          type: Sequelize.INTEGER,
          field: "livingArea",
          allowNull: false,
        },
        bedrooms: {
          type: Sequelize.INTEGER,
          field: "bedrooms",
          allowNull: false,
        },
        bathrooms: {
          type: Sequelize.INTEGER,
          field: "bathrooms",
          allowNull: false,
        },
        listPrice: {
          type: Sequelize.DECIMAL,
          field: "listPrice",
          allowNull: false,
        },
        isAvailable: {
          type: Sequelize.BOOLEAN,
          field: "isAvailable",
          defaultValue: true,
        },
        sellerProfileId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "UserProfiles", key: "id" },
          field: "sellerProfileId",
          allowNull: false,
        },
        agentProfileId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "UserProfiles", key: "id" },
          field: "agentProfileId",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Reviews",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        rating: { type: Sequelize.INTEGER, field: "rating", allowNull: false },
        reviewBody: {
          type: Sequelize.STRING,
          field: "reviewBody",
          allowNull: true,
        },
        reviewerProfileId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "UserProfiles", key: "id" },
          field: "reviewerProfileId",
          allowNull: false,
        },
        agentProfileId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "UserProfiles", key: "id" },
          field: "agentProfileId",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["PropertyListings", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Reviews", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["UserProfiles", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
