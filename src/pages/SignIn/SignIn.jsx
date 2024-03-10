import React, { useState } from "react";
import "./SignIn.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signin } from "../../api/userApi";
import { useAuth } from "../../context/AuthContext";

function SignIn() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async e => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    const response = await signin(data);
    if (response.status === 200) {
      setAuth({
        ...auth,
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
    <div className="signInn mt-5">
      <ToastContainer theme="dark" />
      <form className="signInForm" onSubmit={handleSignIn}>
        <h2 className="signInHeader mb-5">Sign In</h2>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control"
            id="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-control"
            id="password"
          />
        </div>

        <button
          type="submit"
          onClick={handleSignIn}
          className="btn btn-primary btn-sm loginBtn"
        >
          Sign In
        </button>
        <div className="mt-3">
          <span>
            <strong>Don't have an account ? </strong>
            <button className="signUpBtn" onClick={() => navigate("/signup")}>
              Register
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
