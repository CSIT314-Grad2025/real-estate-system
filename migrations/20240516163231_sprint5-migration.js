const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Users", deps: []
 * createTable() => "UserProfiles", deps: [Users]
 *
 */

const info = {
  revision: 1,
  name: "sprint5-migration",
  created: "2024-05-16T16:32:31.579Z",
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
];

const rollbackCommands = (transaction) => [
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
