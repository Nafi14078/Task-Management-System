const express = require("express");
const { createTask, getTasks } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createTask);  // ✅ This should be correct
router.get("/", protect, getTasks); 

module.exports = router;
