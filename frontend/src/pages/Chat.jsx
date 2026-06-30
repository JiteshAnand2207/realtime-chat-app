import { useEffect, useRef, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";

const Chat = () => {
  const { user } = useAuth();
  const { socket, onlineUsers } = useSocket();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      setError("");

      const { data } = await API.get("/users");

      setUsers(data.users);

      if (data.users.length > 0) {
        setSelectedUser(data.users[0]);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchMessages = async (chatUserId) => {
    try {
      setLoadingMessages(true);
      setError("");

      const { data } = await API.get(`/messages/${chatUserId}`);

      setMessages(data.messages);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load messages");
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !selectedUser) return;

    try {
      const { data } = await API.post(`/messages/send/${selectedUser._id}`, {
        message: newMessage,
      });

      setMessages((prev) => [...prev, data.data]);
      setNewMessage("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send message");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (
        selectedUser &&
        message.senderId === selectedUser._id &&
        message.receiverId === user.id
      ) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="chat-page">
      <aside className="chat-sidebar">
        <div className="sidebar-profile">
          <span className="avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </span>

          <div>
            <h4>{user?.name}</h4>
            <p>Logged in</p>
          </div>
        </div>

        <h3>Chats</h3>

        {loadingUsers && <p className="sidebar-message">Loading users...</p>}

        {error && <p className="sidebar-error">{error}</p>}

        {!loadingUsers && users.length === 0 && (
          <p className="sidebar-message">
            No users found. Register another account to start chatting.
          </p>
        )}

        {users.map((chatUser) => {
          const isOnline = onlineUsers.includes(chatUser._id?.toString());

          return (
            <div
              key={chatUser._id}
              className={`user-card ${
                selectedUser?._id === chatUser._id ? "active" : ""
              }`}
              onClick={() => setSelectedUser(chatUser)}
            >
              <span className="avatar online-avatar-wrap">
                {chatUser.name?.charAt(0).toUpperCase()}
                {isOnline && <span className="online-dot"></span>}
              </span>

              <div>
                <h4>{chatUser.name}</h4>
                <p>{isOnline ? "Online" : "Offline"}</p>
              </div>
            </div>
          );
        })}
      </aside>

      <section className="chat-box">
        {selectedUser ? (
          <>
            <header className="chat-header">
              <div>
                <h3>{selectedUser.name}</h3>
                <p>
                  {onlineUsers.includes(selectedUser._id?.toString())
  ? "Online"
  : selectedUser.email}
                </p>
              </div>
            </header>

            <div className="messages-area">
              {loadingMessages ? (
                <div className="empty-chat">
                  <h2>Loading messages...</h2>
                </div>
              ) : messages.length === 0 ? (
                <div className="empty-chat">
                  <h2>No messages yet</h2>
                  <p>Send the first message to {selectedUser.name}.</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`message ${
                      msg.senderId === user?.id ? "sent" : "received"
                    }`}
                  >
                    {msg.message}
                  </div>
                ))
              )}

              <div ref={messagesEndRef} />
            </div>

            <form className="message-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder={`Message ${selectedUser.name}...`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />

              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <h2>No chat selected</h2>
            <p>Select a user from the sidebar to start chatting.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Chat;