import { useState } from "react";
import { supabase } from './App';

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

export default function SignIn({ setSession, setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }
  
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) setError(error.message);
  };
  

  async function signIn() {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      setSession(user);
    } catch (error) {
      console.error("Error signing in: ", error.message);
    }
  }

  return (
    <div>
      <h2>ログイン</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={signIn}>ログイン</button>
      <button onClick={() => setLogin(false)}>新規登録</button>
    </div>
  );
}
