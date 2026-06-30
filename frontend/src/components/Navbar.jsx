import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleTheme = () => {
    const nextTheme =
      theme === "dark" ? "mid" : theme === "mid" ? "light" : "dark";

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        ChatWave
      </Link>

      <div className="nav-links">
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "dark" && "Dark"}
          {theme === "mid" && "Mid"}
          {theme === "light" && "Light"}
        </button>

        {user ? (
          <>
            <Link to="/chat">Chat</Link>
            <button className="nav-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;