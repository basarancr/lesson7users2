import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';

const supabaseUrl = "https://caskmxtgfshuzexeojam.supabase.co"; // ここにあなたのSupabase URLを設定します
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhc2tteHRnZnNodXpleGVvamFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk0ODAzOTUsImV4cCI6MjAwNTA1NjM5NX0.J7M2ivhTOHEF51H8IUV424I23-prjc1Xtb-VzbG67II"; // ここにあなたのSupabase keyを設定します
export const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [session, setSession] = useState(null);
  const [login, setLogin] = useState(false);

  return (
    <div className="App">
      {session ? (
        <Dashboard setSession={setSession} />
      ) : login ? (
        <SignIn setSession={setSession} setLogin={setLogin} />
      ) : (
        <SignUp setLogin={setLogin} />
      )}
    </div>
  );
}
