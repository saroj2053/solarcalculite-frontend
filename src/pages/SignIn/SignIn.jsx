import React, { useState } from "react";
import "./SignIn.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signin } from "../../api/userApi";

import solarCalculiteLogo from "../../images/solarCalculiteLogo.png";
import useAuthUserStore from "../../store/userStore";
import signInBgImage from "../../images/pexels-solar-panel.jpg";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthUser } = useAuthUserStore();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    const response = await signin(data);
    if (response.status === 200) {
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
    <div className="signIn">
      <div className="signInBgImage">
        <img src={signInBgImage} alt="" />
        <div className="slogan__contents">
          <h2>Sign In to Power Up: Your Solar Journey Begins Here!</h2>
        </div>
      </div>
      <div className="signInForm">
        <div className="text-center mb-5">
          <img src={solarCalculiteLogo} alt="" />
        </div>
        <form onSubmit={handleSignIn}>
          <h2 className="signInHeader mb-5">Sign In</h2>
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

          <button
            type="submit"
            onClick={handleSignIn}
            className="btn btn-primary btn-md"
          >
            Sign In
          </button>
          <div className="mt-3">
            <span className="toSignUpPage">
              Don't have an account? {"  "}
              <button className="signUpBtn" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default SignIn;
