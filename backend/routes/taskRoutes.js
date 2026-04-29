const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.use(verifyToken);

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;