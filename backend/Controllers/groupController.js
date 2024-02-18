const Group = require("../models/group");
const User = require("../models/user");

const GroupController = {};

// Create a new group
GroupController.createGroup = async (req, res) => {
  try {
    const { name, description, members } = req.body;

    const newGroup = new Group({
      name,
      description,
      members,
    });

    await newGroup.save();

    res
      .status(201)
      .json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create group", error: error.message });
  }
};

// Get all groups with member details
GroupController.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("members", "username email"); // Populate member details

    res.status(200).json({ groups });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch groups", error: error.message });
  }
};

// Get a specific group by ID with member details
GroupController.getGroupById = async (req, res) => {
  try {
    const groupId = req.params.id;

    const group = await Group.findById(groupId).populate(
      "members",
      "username email"
    ); // Populate member details

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ group });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch group", error: error.message });
  }
};

// Update a group
GroupController.updateGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const { name, description, members } = req.body;

    await Group.findByIdAndUpdate(groupId, { name, description, members });

    res.status(200).json({ message: "Group updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update group", error: error.message });
  }
};

// Delete a group
GroupController.deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.id;

    await Group.findByIdAndRemove(groupId);

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete group", error: error.message });
  }
};

module.exports = GroupController;
