import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "../../contexts/AlertContext";
import { useAuth } from "./../../contexts/AuthContext";
import Loader from "react-loader-spinner";
import Alert from "../layout/Alert";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const { login } = useAuth();
  const { alert, onSetAlert } = useAlert();

  const history = useHistory();

  const onChange = (e) => {
    // console.log(e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);

      onSetAlert([{ msg: "You are logged in", type: "success" }]);
      setTimeout(() => {
        history.push("/posts/all");
      }, 2000);
    } catch (err) {
      setLoading(false);
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
            <button>
              {loading ? (
                <Loader type="TailSpin" color="#ffff" height={40} width={40} />
              ) : (
                "Login"
              )}
            </button>
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
