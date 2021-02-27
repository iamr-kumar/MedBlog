import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./../../contexts/AuthContext";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const { login, currentUser } = useAuth();

  const history = useHistory();

  const onChange = (e) => {
    // console.log(e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      history.push("/posts/all");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="body-login">
        <div className="content">
          <div className="text">Login</div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              {/* <label>Email</label> */}
              <span className="fas fa-user"></span>
              <input
                type="text"
                required
                onChange={onChange}
                value={email}
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="field">
              <span className="fas fa-lock"></span>
              <input
                type="password"
                onChange={onChange}
                value={password}
                name="password"
                placeholder="Password"
              />
              {/* <label>Password</label> */}
            </div>
            <button>Sign in</button>
            <div className="signup">
              Not a member?
              <Link to="/signup"> SignUp</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
