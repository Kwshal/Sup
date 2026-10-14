import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function AuthPage({enterChats}) {
     const [isLoggingIn, setIsLoggingIn] = useState(true);

     return (
          <main className="auth-page">
               <section className="auth-panel">
                    <h1 className="auth-logo">Sup_</h1>
                    <p className="auth-intro">A simple space to catch up and stay connected.</p>
                    {isLoggingIn ? <LoginForm onLogIn={() => setIsLoggingIn(false)} onEnter={enterChats} /> : <SignupForm onSignUp={() => setIsLoggingIn(true)} onEnter={enterChats} />}
               </section>
          </main>
     );
}

export default AuthPage;
