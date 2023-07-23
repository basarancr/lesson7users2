import { useState } from "react";
import { supabase } from './App';

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

export default function SignUp({ setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");


  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }
  
    const { error } = await supabase.auth.signUp({ name, email, password });
    if (error) setError(error.message);
    else setLogin(true);
  };


  async function signUp() {
    try {
      const { user, error } = await supabase.auth.signUp({
        name,
        email,
        password,
      });
      if (error) throw error;
      alert("会員登録ありがとうございます。");
    } catch (error) {
      alert("会員登録を正常に行うことができませんでした。");
      console.error("Error signing up: ", error.message);
    }
  }



  return (
    <div>
      <h2>新規登録</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSignUp}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={signUp}>新規登録</button>
      <button onClick={() => setLogin(true)}>ログイン画面へ</button>
      </form>
    </div>
  );
}
