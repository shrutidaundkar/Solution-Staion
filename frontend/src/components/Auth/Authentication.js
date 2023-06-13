import React, { useEffect, useState } from "react";
import { Google } from "@mui/icons-material";
import "./css/Authentication.css";

import { useNavigate } from "react-router-dom";

import { UserAuth } from "../context/AuthContext";

function Authentication() {
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { googleSignIn, user, normalSignIn, normalSignUp } = UserAuth();

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    try {
      googleSignIn();
      setLoading(false);
    } catch (err) {
      console.log(error);
      setLoading(false);
      setError(err.message);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (email !== "" && password !== "") {
      normalSignIn(email, password);
      setLoading(false);
    } else {
      setError("Email and password required!");
      setLoading(false);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (email !== "" && password !== "") {
      normalSignUp(email, password);
      setLoading(false);
    } else {
      setError("Email and password required!");
      setLoading(false);
    }
  };
  return (
    <div className="auth">
      <div className="auth-container">
        <h2>Login/ Sign up to continue...</h2>
        <div className="sign-in-options">
          <div className="single-sign-in">
            <h5 onClick={handleGoogleSignIn}>
              Sign in with <Google /> Google
            </h5>
          </div>
          <h4>--OR--</h4>
          <div className="sign-up-form-container">
            {signup ? (
              <>
                <h5>Sign Up</h5>

                <div className="sign-up-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </div>
                <div className="sign-up-form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                  />
                </div>
                <div className="sign-up-form-group">
                  <button onClick={handleSignup} disabled={loading}>
                    {" "}
                    {loading ? "Signing up.." : "Sign up"}
                  </button>
                </div>
                {error !== "" && (
                  <div className="sign-up-form-group">
                    <small>{error}</small>
                  </div>
                )}
              </>
            ) : (
              <>
                <h5>Login</h5>
                <div className="sign-up-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </div>
                <div className="sign-up-form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                  />
                </div>
                <div className="sign-up-form-group">
                  <button onClick={handleLogin} disabled={loading}>
                    {" "}
                    {loading ? "Logging in.." : "Log in"}
                  </button>
                </div>
                {error !== "" && (
                  <div className="sign-up-form-group">
                    <small>{error}</small>
                  </div>
                )}
              </>
            )}
            <div className="sign-up-form-group">
              {signup ? (
                <p>
                  Already an user?{" "}
                  <span onClick={() => setSignup(false)}>Login</span>
                </p>
              ) : (
                <p>
                  New user? <span onClick={() => setSignup(true)}>Signup</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
