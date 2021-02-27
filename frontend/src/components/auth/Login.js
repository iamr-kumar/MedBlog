import React, { useState } from "react";
import { useAuth } from "./../../contexts/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const { login, currentUser } = useAuth();

  const onChange = (e) => {
    // console.log(e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log(currentUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button className="btn-primary">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
