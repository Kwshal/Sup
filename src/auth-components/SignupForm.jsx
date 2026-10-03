import { useState, useEffect, use } from "react";
import StatusMessage from "./StatusMessage";
import { writeUserData, getUser } from "../db";


function SignupForm({ onSignUp, onEnter }) {
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");
     const [user, setUser] = useState(null);
     const [statusMessage, setStatusMessage] = useState("");

     useEffect(() => {
          const username = document.getElementById("username");
          username.focus();
     }, []);

     useEffect(() => {
          username && getUser(username)
               .then(data => {
                    if (data) {
                         // console.log("Fetched user data:", data);
                         setUser(data);
                         setStatusMessage("User already exists.");
                    }
               })
               .catch(() => {
                    setStatusMessage("Error fetching user data.");
               })
     }, []);


     // mock data
     let userList = [
          { username: "user1", password: "pass1" },
          { username: "user2", password: "pass2" },
          { username: "user3", password: "pass3" }
     ];

     const handleNewButtonClick = (e) => {
          e.preventDefault();
          const username = document.getElementById("username");
          const password = document.getElementById("password");
          const confirmPassword = document.getElementById("confirmPassword");

          if (username.value.trim() === "") {
               setStatusMessage("Please enter a username.");
          } else if (userList.some(user => user.username === username.value.trim())) {
               setStatusMessage("Username already exists.");
          } else if (password.value.trim() === "") {
               setStatusMessage("Please enter a password.");
          } else if (confirmPassword.value.trim() === "") {
               setStatusMessage("Please confirm your password.");
          } else if (password.value !== confirmPassword.value) {
               setStatusMessage("Passwords do not match.");
          } else if (!user) {
               setStatusMessage("Welcome to ChatApp!");
               localStorage.setItem("user", username.value.trim());
               localStorage.setItem("password", password.value.trim());
               writeUserData(username.value.trim(), password.value.trim());
          }
          onEnter();
     }

     const handleUsernameInput = () => {
          const username = document.getElementById("username");
          setUsername(username.value);
          setStatusMessage("");
     };
     const handlePasswordInput = () => {
          const passwordInput = document.getElementById("password");
          setPassword(passwordInput.value);
          setStatusMessage("");
     };


     const handleConfirmPasswordInput = () => {
          const confirmPasswordInput = document.getElementById("confirmPassword");
          setConfirmPassword(confirmPasswordInput.value);
          setStatusMessage("");
     };


     return (
          <form className="auth-form">
               <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    autoComplete="username"
                    value={username}
                    onChange={handleUsernameInput}
               />
               <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordInput}
               />
               <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordInput}
               />
               {statusMessage && <StatusMessage status={statusMessage} />}
               <div className="button-group">
                    <button id="enterButton" type="submit" onClick={handleNewButtonClick}>Sign Up</button>
                    <button id="newButton" type="button" onClick={onSignUp}>Aleady have an account? Login</button>
               </div>
          </form>
     );
}

export default SignupForm;