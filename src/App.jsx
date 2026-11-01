import { useEffect, useState } from 'react'
import './App.css'
import AuthPage from './auth-components/Auth.jsx'
import Homepage from './chat-components/Homepage.jsx'

function applyTheme(preference = "system") {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const updateTheme = () => {
    const theme =
      preference === "system"
        ? mediaQuery.matches ? "dark" : "light"
        : preference;

    document.documentElement.dataset.theme = theme;
  };

  updateTheme();

  if (preference === "system") {
    mediaQuery.addEventListener("change", updateTheme);
  }

  return () => {
    mediaQuery.removeEventListener("change", updateTheme);
  };
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let storedUser;
  
  useEffect(() => {
    storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "system";
    const storedColor = localStorage.getItem('baseColor');
    document.documentElement.style.setProperty('--base-color', storedColor || '#4d8b9b');
    
    const cleanup = applyTheme(storedTheme);
    return cleanup;
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  }

  return (
    <div className={`App${isLoggedIn ? " is-chat-app" : ""}`}>
      {isLoggedIn ? <Homepage onLogOut={handleLogOut} user={storedUser} /> : <AuthPage enterChats={() => setIsLoggedIn(true)} />}
    </div>
  )
}

export default App