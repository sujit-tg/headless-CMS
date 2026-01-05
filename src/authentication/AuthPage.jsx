import React, { useState } from "react";
import "./AuthPage.css";

const AuthPage = () => {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_BASE = "https://gos-testing.tantra-gyan.com";

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/wp-json/jwt-auth/v1/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Network error");
    }

    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/wp-json/reactauth/v1/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Signup successful! You can log in now.");
        setTimeout(() => setMode("login"), 1200); // smooth UX transition
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (err) {
      setMessage("Network error");
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "login" ? handleLogin() : handleSignup();
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${mode === "signup" ? "slide-left" : ""}`}>
        
        {/* Switch Buttons */}
        <div className="switch-wrapper">
          <button
            className={`switch-btn ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`switch-btn ${mode === "signup" ? "active" : ""}`}
            onClick={() => setMode("signup")}
          >
            Signup
          </button>
        </div>

        <h2 className="auth-title">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        {message && <p className="auth-message">{message}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            required
            placeholder="Email address"
            className="auth-input fade-in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="auth-input fade-in delay-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="auth-submit fade-in delay-3"
          >
            {loading ? "Processing..." : mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Switch link below form */}
        {mode === "signup" ? (
          <p className="switch-link fade-in delay-4">
            Already have an account?{" "}
            <span onClick={() => setMode("login")}>Login</span>
          </p>
        ) : (
          <p className="switch-link fade-in delay-4">
            Don’t have an account?{" "}
            <span onClick={() => setMode("signup")}>Signup</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
