import { useState } from 'react';
import { useNavigate } from 'react-router';

// LoginPage.jsx
// Tailwind-first styling. Default export is the component so you can import it directly.

export default function LoginPage({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const VALID_USERNAME = 'salesadmin';
  const VALID_PASSWORD = 'Feb/02/2016';

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // small UI delay to show a loading state
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        // simulate a token and call onSuccess if provided
        const fakeToken = btoa(`${username}:${Date.now()}`);
        try {
          localStorage.setItem('app_token', fakeToken);
        } catch (err) {
          // ignore localStorage errors in restricted environments
        }
        navigate("/search")
        if (typeof onSuccess === 'function') onSuccess({ username, token: fakeToken });
      } else {
        setError('Invalid username or password');
      }
    }, 600);
  }

  // function handleDemoFill() {
  //   setUsername(VALID_USERNAME);
  //   setPassword(VALID_PASSWORD);
  //   setError('');
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-white mb-2 flex justify-center">Sales Admin Portal</h1>
        <p className="text-sm text-gray-300 mb-6 flex justify-center">Sign in to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-xs text-gray-300">Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 text-white placeholder-gray-400 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter username"
              autoComplete="username"
            />
          </label>

          <label className="block">
            <span className="text-xs text-gray-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 text-white placeholder-gray-400 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </label>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              className={`flex-1 py-2 rounded-md font-medium text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer`}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            {/* <button
              type="button"
              onClick={handleDemoFill}
              className="text-sm px-3 py-2 rounded-md border border-white/10 text-white/90"
            >
              Fill demo
            </button> */}
          </div>
        </form>

        {/* <div className="mt-6 text-xs text-gray-400">
          <div>Demo credentials:</div>
          <div className="mt-1 select-all">username: <span className="font-medium text-white">salesadmin</span></div>
          <div className="select-all">password: <span className="font-medium text-white">salesadmin</span></div>
        </div> */}

        <div className="mt-6 text-center text-gray-400 text-xs">
          <em>Confidential, Only Chromaticaura is allowed to access</em>
        </div>
      </div>
    </div>
  );
}
