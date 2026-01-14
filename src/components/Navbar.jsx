import { Link } from "react-router-dom";
import "./navbar.css";
import brandLogo from "../assets/brand-logo.svg"; // ✅ YOUR LOGO

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-left">
        <img src={brandLogo} alt="RepoSphere" className="logo"  style={{ width: 50, height: 60 }} />
        <span className="brand">RepoSphere</span>
        
      </Link>

      <div className="nav-right">
        <Link to="/create">New Repo</Link>
        <Link to="/issues">Issues</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
