const Chat = () => {
  return (
    <main className="chat-page">
      <aside className="chat-sidebar">
        <h3>Chats</h3>

        <div className="user-card active">
          <span className="avatar">J</span>
          <div>
            <h4>Jitesh Anand</h4>
            <p>Online</p>
          </div>
        </div>

        <div className="user-card">
          <span className="avatar">A</span>
          <div>
            <h4>Alex</h4>
            <p>Offline</p>
          </div>
        </div>
      </aside>

      <section className="chat-box">
        <header className="chat-header">
          <div>
            <h3>Jitesh Anand</h3>
            <p>Online</p>
          </div>
        </header>

        <div className="messages-area">
          <div className="message received">Hey, welcome to ChatWave.</div>
          <div className="message sent">Thanks! Real-time chat coming soon.</div>
        </div>

        <form className="message-form">
          <input type="text" placeholder="Type a message..." />
          <button type="submit">Send</button>
        </form>
      </section>
    </main>
  );
};

export default Chat;