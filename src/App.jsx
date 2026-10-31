import { useEffect, useState } from 'react'
import './App.css'
import AuthPage from './auth-components/Auth.jsx'
import Homepage from './chat-components/Homepage.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let storedUser;
  
  useEffect(() => {
    storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
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