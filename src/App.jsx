import { useEffect, useState } from 'react'
import './App.css'
import AuthPage from './auth-components/Auth.jsx'
import ChatsPage from './chat-components/ChatsPage.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  }

  return (
    <div className="App">
      {isLoggedIn ? <ChatsPage onLogOut={handleLogOut} /> : <AuthPage enterChats={() => setIsLoggedIn(true)} />}
    </div>
  )
}

export default App
