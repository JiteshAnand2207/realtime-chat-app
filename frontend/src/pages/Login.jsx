import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="auth-page">
      <form className="auth-card">
        <h2>Welcome Back</h2>
        <p>Login to continue your conversations.</p>

        <label>Email</label>
        <input type="email" placeholder="Enter your email" />

        <label>Password</label>
        <input type="password" placeholder="Enter your password" />

        <button type="submit" className="btn primary-btn full-btn">
          Login
        </button>

        <span className="auth-switch">
          New here? <Link to="/register">Create account</Link>
        </span>
      </form>
    </main>
  );
};

export default Login;