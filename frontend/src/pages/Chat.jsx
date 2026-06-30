import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Chat = () => {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchUsers();
  }, []);

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

        {users.map((chatUser) => (
          <div
            key={chatUser._id}
            className={`user-card ${
              selectedUser?._id === chatUser._id ? "active" : ""
            }`}
            onClick={() => setSelectedUser(chatUser)}
          >
            <span className="avatar">
              {chatUser.name?.charAt(0).toUpperCase()}
            </span>

            <div>
              <h4>{chatUser.name}</h4>
              <p>{chatUser.email}</p>
            </div>
          </div>
        ))}
      </aside>

      <section className="chat-box">
        {selectedUser ? (
          <>
            <header className="chat-header">
              <div>
                <h3>{selectedUser.name}</h3>
                <p>{selectedUser.email}</p>
              </div>
            </header>

            <div className="messages-area">
              <div className="empty-chat">
                <h2>Conversation with {selectedUser.name}</h2>
                <p>
                  Message APIs and real-time Socket.io connection will be added
                  in the next phases.
                </p>
              </div>
            </div>

            <form className="message-form">
              <input
                type="text"
                placeholder="Messaging comes in next phase..."
                disabled
              />
              <button type="submit" disabled>
                Send
              </button>
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