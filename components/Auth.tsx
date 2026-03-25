import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function Auth({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Silently convert the username into a dummy email for Supabase
    const formattedEmail = `${username.trim().toLowerCase()}@marinasgarden.local`;

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email: formattedEmail, password })
      : await supabase.auth.signInWithPassword({ email: formattedEmail, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Don't set loading to false here, let the parent component take over
      onLogin();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h2 className="mb-6 text-center font-nunito text-3xl font-black text-gray-900">
          {isSignUp ? "Claim a Garden" : "Enter Your Garden"}
        </h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm font-bold text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">Username</label>
            <input
              type="text"
              required
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. Marina"
              className="w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 focus:border-green-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">Secret Passcode</label>
            <input
              type="password"
              required
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 focus:border-green-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-green-600 p-4 font-bold text-white transition-colors hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Loading..." : isSignUp ? "Create Garden" : "Enter"}
          </button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-4 w-full text-center text-sm font-bold text-gray-500 hover:text-gray-900"
        >
          {isSignUp ? "Already have a garden? Enter here" : "Need a garden? Claim one"}
        </button>
      </div>
    </div>
  );
}