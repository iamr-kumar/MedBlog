import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./../../contexts/AuthContext";
import { useAlert } from "./../../contexts/AlertContext";
import Alert from "../layout/Alert";
import "./Login.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    password: "",
    password2: "",
    dob: "",
  });
  const { alert, onSetAlert } = useAlert();
  const { name, email, password, password2, category, dob } = formData;

  const { signup } = useAuth();
  const history = useHistory();

  const onChange = (e) => {
    // console.log(e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password, category, dob);

      history.push("/posts/all");
    } catch (err) {
      if (err.response.status === 400) {
        const { errors } = err.response.data;
        const errorAlerts = errors.map((error) => ({
          msg: error.msg,
          type: "danger",
        }));
        onSetAlert(errorAlerts);
      } else {
        onSetAlert([
          { msg: "Something went wrong, try again!", type: "danger" },
        ]);
      }
    }
  };

  return (
    <>
      <div className="body-login">
        {alert &&
          alert.map((a, index) => (
            <Alert key={index} msg={a.msg} type={a.type} />
          ))}
        <div className="content">
          <div className="text">Signup</div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              {/* <label>Email</label> */}
              <span className="fas fa-user"></span>
              <input
                type="text"
                required
                onChange={onChange}
                value={name}
                name="name"
                placeholder="Name"
              />
            </div>
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
              {/* <label>Email</label> */}
              <span className="fas fa-user"></span>
              <input
                type="date"
                required
                onChange={onChange}
                value={dob}
                name="dob"
                placeholder="Date Of Birth"
              />
            </div>
            <div className="field" id="radio-input">
              {/* <label>Email</label> */}
              {/* <span>Sign up as</span> */}
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
            <div className="field">
              <span className="fas fa-lock"></span>
              <input
                type="password"
                onChange={onChange}
                value={password2}
                name="password2"
                placeholder="Confirm Password"
              />
              {/* <label>Password</label> */}
            </div>
            <button>Sign Up</button>
            <div className="signup">
              Already a member? <Link to="/login"> Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
