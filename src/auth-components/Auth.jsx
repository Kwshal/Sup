import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function AuthPage({enterChats}) {
     const [isLoggingIn, setIsLoggingIn] = useState(true);

     return (
          <div className="auth-page">
               {isLoggingIn ? <LoginForm onLogIn={() => setIsLoggingIn(false)} onEnter={enterChats} /> : <SignupForm onSignUp={() => setIsLoggingIn(true)} onEnter={enterChats} />}
          </div>
     );
}

export default AuthPage;
