import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const users = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching users",
    });
  }
};