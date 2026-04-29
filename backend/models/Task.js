const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("Task", {
    title: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: "pending" },
  });