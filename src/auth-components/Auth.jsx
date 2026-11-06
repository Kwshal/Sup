import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function AuthPage({enterChats}) {
     const [isLoggingIn, setIsLoggingIn] = useState(true);

     return (
          <main className="auth-page">
               <section className="auth-panel">
                    <h1 className="auth-logo">Sup</h1>
                    {/* <p className="auth-intro">Catch up. Stay connected.</p> */}
                    {isLoggingIn ? <LoginForm onLogIn={() => setIsLoggingIn(false)} onEnter={enterChats} /> : <SignupForm onSignUp={() => setIsLoggingIn(true)} onEnter={enterChats} />}
               </section>
          </main>
     );
}

export default AuthPage;
