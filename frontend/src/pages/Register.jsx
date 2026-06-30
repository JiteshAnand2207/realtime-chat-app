import { Link } from "react-router-dom";

const Register = () => {
  return (
    <main className="auth-page">
      <form className="auth-card">
        <h2>Create Account</h2>
        <p>Join ChatWave and start messaging instantly.</p>

        <label>Name</label>
        <input type="text" placeholder="Enter your name" />

        <label>Email</label>
        <input type="email" placeholder="Enter your email" />

        <label>Password</label>
        <input type="password" placeholder="Create a password" />

        <button type="submit" className="btn primary-btn full-btn">
          Register
        </button>

        <span className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </main>
  );
};

export default Register;