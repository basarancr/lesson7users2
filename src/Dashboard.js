import { supabase } from './App';

export default function Dashboard({ setSession }) {
  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setSession(null);
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  }

  return (
    <div>
      <p>ログイン中です</p>
      <button onClick={signOut}>ログアウト</button>
    </div>
  );
}
