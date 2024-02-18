const express = require("express");
const router = express.Router();
const GroupController = require("../Controllers/groupController");

const { authVerify } = require("../Controllers/authController");
// Create a new group
router.post("/", authVerify, GroupController.createGroup);

// Get a specific group by ID
router.get("/:id", authVerify, GroupController.getGroupById);

// Update a group
router.put("/:id", authVerify, GroupController.updateGroup);

// Delete a group
router.delete("/:id", authVerify, GroupController.deleteGroup);

module.exports.groupRouter = router;
