import { useAuth } from "../context/AuthContext";

const Chat = () => {
  const { user } = useAuth();

  return (
    <main className="chat-page">
      <aside className="chat-sidebar">
        <h3>Chats</h3>

        <div className="user-card active">
          <span className="avatar">{user?.name?.charAt(0).toUpperCase()}</span>
          <div>
            <h4>{user?.name}</h4>
            <p>Logged in</p>
          </div>
        </div>
      </aside>

      <section className="chat-box">
        <header className="chat-header">
          <div>
            <h3>Welcome, {user?.name}</h3>
            <p>Your real-time chat dashboard is ready.</p>
          </div>
        </header>

        <div className="messages-area">
          <div className="message received">
            Auth connected successfully.
          </div>
          <div className="message sent">
            Next we will load users and create real chats.
          </div>
        </div>

        <form className="message-form">
          <input type="text" placeholder="Messaging comes in next phases..." disabled />
          <button type="submit" disabled>
            Send
          </button>
        </form>
      </section>
    </main>
  );
};

export default Chat;