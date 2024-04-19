import React, { useState } from "react";
import "./SignUp.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/userApi";

import solarCalculiteLogo from "../../images/solarCalculiteLogo.png";
import useAuthUserStore from "../../store/userStore";
import signUpBgImage from "../../images/pexels-solar-panel.jpg";

function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { authUser, setAuthUser } = useAuthUserStore();

  const handleRegister = async (evt) => {
    evt.preventDefault();

    const data = {
      name,
      username,
      email,
      password,
      confirmPassword,
    };

    const response = await signup(data);
    if (response.status === 201) {
      setAuthUser({
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem("auth", JSON.stringify(response.data));

      navigate("/projects");
    } else if (response.code === "ERR_BAD_REQUEST") {
      toast.error(response.response.data.message);
    }
  };

  return (
    <div className="signUp">
      <div className="signUpPageBg">
        <img src={signUpBgImage} alt="" />
        <div className="signup__slogan">
          <h2>Join Us to Ignite Solar Energy: Register and Shine!</h2>
        </div>
      </div>

      <div className="signUpForm">
        <div className="text-center mb-5">
          <img src={solarCalculiteLogo} alt="" />
        </div>
        <form>
          <h2 className="signUpHeader">Sign Up</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              id="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              id="confirmPassword"
            />
          </div>

          <button
            type="submit"
            onClick={handleRegister}
            className="btn btn-primary btn-md"
          >
            Sign Up
          </button>
          <div className="mt-3">
            <span className="cta__toSignInPage">
              Already have an account? {"  "}
              <button className="signInBtn" onClick={() => navigate("/")}>
                Sign In
              </button>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default SignUp;
