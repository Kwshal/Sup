import { useState, useEffect, useRef } from "react";
import StatusMessage from "./StatusMessage";
import { getUser, setMyStatus } from "../db";

function LoginForm({onLogIn, onEnter}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 🟩 Clean: Use a ref instead of document.getElementById for focusing
  const usernameRef = useRef(null);

  // 🟩 Clean: Handle controlled input values correctly
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (statusMessage) setStatusMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (statusMessage) setStatusMessage("");
  };

  // 🟩 Clean: Handle authentication entirely inside the submit handler to prevent database hammer
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // 1. Client-side Validation Checks
    if (!trimmedUsername && !trimmedPassword) {
      return setStatusMessage("Please enter a username and password.");
    }
    if (!trimmedUsername) {
      return setStatusMessage("Please enter a username.");
    }
    if (!trimmedPassword) {
      return setStatusMessage("Please enter a password.");
    }

    setIsLoading(true);
    setStatusMessage("");

    try {
      // 2. Fetch data only when the user submits, not on every keystroke
      const user = await getUser(trimmedUsername);

      if (!user) {
        setStatusMessage("Username not found.");
        return;
      }

      // 3. Verify credentials
      if (user.password === trimmedPassword) {
        localStorage.setItem("user", trimmedUsername);
        onEnter();
        setMyStatus(); // Set the user's status to online after successful login
      } else {
        setStatusMessage("Incorrect password.");
      }
    } catch (error) {
      setStatusMessage("Error connecting to server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleFormSubmit}>
      <input
        ref={usernameRef}
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Username"
        required
      />
      <input
        type="password" 
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
        autoComplete="current-password"
        required
      />

      {statusMessage && <StatusMessage status={statusMessage} />}

      <div className="button-group">
        <button
          id="enterButton"
          type="submit"
          disabled={isLoading}
          onClick={handleFormSubmit}
        >
          {isLoading ? "Logging in..." : "Enter ChatApp"}
        </button>
        <button
          id="newButton"
          type="button"
          onClick={onLogIn}
        >
          New user? Sign Up
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
