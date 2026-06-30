import Message from "../models/Message.js";
import User from "../models/User.js";

export const getMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const otherUserId = req.params.userId;

    const otherUser = await User.findById(otherUserId);

    if (!otherUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: otherUserId,
        },
        {
          senderId: otherUserId,
          receiverId: myId,
        },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Get Messages Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching messages",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.userId;
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found",
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    const io = req.app.get("io");
    const userSocketMap = io.userSocketMap;

    if (userSocketMap && userSocketMap[receiverId]) {
      io.to(userSocketMap[receiverId]).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Send Message Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error while sending message",
    });
  }
};