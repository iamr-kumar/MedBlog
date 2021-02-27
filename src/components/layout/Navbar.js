import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./../../contexts/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [searchVal, setSearchVal] = useState("");

  const history = useHistory();

  const { currentUser } = useAuth();
  console.log(currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/posts/search/${searchVal}`);
  };

  const guestLinks = (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>{" "}
    </div>
  );

  const authLinks = (
    <div>
      {currentUser.user.category === "doctor" ? (
        <Link to="#">My Mentions</Link>
      ) : (
        <div></div>
      )}
      <Link to="#">Logout</Link>
    </div>
  );

  return (
    <div className="nav">
      <nav className="nav">
        <div className="left-section">
          <h3>MedBlog</h3>
        </div>
        <form className="d-flex" onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="search"
            placeholder="Search by Disease"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button className="btn btn-outline-success">Search</button>
        </form>
        <div className="right-section">
          <div className="nav-links">
            {!currentUser.isAuthenticated ? guestLinks : authLinks}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
