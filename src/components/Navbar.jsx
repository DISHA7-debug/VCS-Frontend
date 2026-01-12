import { Link } from "react-router-dom";
import "./navbar.css";
import githubLogo from "../assets/github-mark-white.svg"; // ✅ CORRECT PATH

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img
          src={githubLogo}
          alt="GitHub"
          className="logo"
        />
        <span className="brand">GitHub</span>
      </div>

      <div className="nav-right">
        <Link to="/create">Create a Repository</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
