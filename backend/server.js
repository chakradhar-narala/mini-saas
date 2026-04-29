const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");
const { initModels } = require("./models");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// error handler (should be last)
app.use(errorHandler);

// DB init + sync
initModels(sequelize);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });