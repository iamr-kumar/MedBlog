import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="nav-links">
          <h1 className="active">
            <Link to="/">HOME</Link>
          </h1>
          <h1>
            <Link to="#">BLOG</Link>
          </h1>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
