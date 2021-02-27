import React, { useState } from "react";
import { useAuth } from "./../../contexts/AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    password: "",
    password2: "",
    dob: "",
  });
  const { name, email, password, password2, category, dob } = formData;

  const { signup } = useAuth();

  const onChange = (e) => {
    // console.log(e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password, category, dob);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <h3>Singup</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <span>Sign up as</span>
            <input
              type="radio"
              value="patient"
              name="category"
              onChange={onChange}
              style={{ marginLeft: "2rem" }}
            />{" "}
            Patient
            <input
              type="radio"
              value="doctor"
              name="category"
              onChange={onChange}
              style={{ marginLeft: "2rem" }}
            />{" "}
            Doctor
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control"
              placeholder="Date of birth"
              value={dob}
              name="dob"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button className="btn-primary">Signup</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
