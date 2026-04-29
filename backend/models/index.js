const UserModel = require("./User");
const TaskModel = require("./Task");

let User, Task;

const initModels = (sequelize) => {
  User = UserModel(sequelize);
  Task = TaskModel(sequelize);

  User.hasMany(Task, { foreignKey: "userId" });
  Task.belongsTo(User, { foreignKey: "userId" });
};

const getModels = () => ({ User, Task });

module.exports = { initModels, getModels };