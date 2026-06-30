import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home-page">
      <section className="hero-card">
        <p className="eyebrow">Real-time MERN chat application</p>

        <h1>Chat instantly, smoothly, and securely.</h1>

        <p className="hero-text">
          A full-stack chat website built with React, Node.js, MongoDB and
          Socket.io.
        </p>

        <div className="hero-actions">
          <Link to="/register" className="btn primary-btn">
            Get Started
          </Link>

          <Link to="/login" className="btn secondary-btn">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;