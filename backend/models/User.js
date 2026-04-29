const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("User", {
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
  });