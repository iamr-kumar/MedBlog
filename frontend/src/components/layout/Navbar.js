import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./../../contexts/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [searchVal, setSearchVal] = useState("");

  const history = useHistory();

  const { currentUser, logout } = useAuth();
  // console.log(currentUser);

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
      {currentUser &&
      currentUser.user &&
      currentUser.user.category === "doctor" ? (
        <Link to="/posts/my-mentions">My Mentions</Link>
      ) : (
        <Link to="/posts/create-post">Compose</Link>
      )}
      <a onClick={logout} href="#!">
        Logout
      </a>
    </div>
  );

  return (
    <div className="nav">
      <nav className="nav">
        <div className="left-section">
          <h3>MedBlog</h3>
        </div>
        {currentUser && currentUser.user && (
          <form className="d-flex" onSubmit={handleSubmit}>
            <div className="search-bar">
              <input
                className="search-field"
                type="search"
                placeholder="Search by Disease"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
              />
              <button className="btn search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
        )}
        <div className="right-section">
          <div className="nav-links">
            <Link to="/posts/all">Stories</Link>
            {currentUser && currentUser.isAuthenticated
              ? authLinks
              : guestLinks}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
