import { useState } from 'react';
import { Lock, Link as LinkIcon } from 'lucide-react';

type LoginPageProps = {
  onLogin: () => void;
};

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00ff00] rounded-lg mb-4">
            <LinkIcon size={32} className="text-black" />
          </div>
          <h1 className="text-3xl md:text-4xl text-white mb-2">SmartLinks</h1>
          <p className="text-[#a0a0a0]">Manage your links intelligently</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6 sm:p-8">
          <h2 className="text-2xl text-white mb-6">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label htmlFor="name" className="block text-sm text-[#a0a0a0] mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-[#1a1a1a] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#00ff00] transition-colors"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm text-[#a0a0a0] mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-[#1a1a1a] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#00ff00] transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-[#a0a0a0] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-[#1a1a1a] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#00ff00] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00ff00] text-black py-3 rounded-lg hover:bg-[#00cc00] transition-colors flex items-center justify-center gap-2 mt-6"
            >
              <Lock size={20} />
              {isSignup ? 'Sign Up' : 'Log In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-[#a0a0a0] hover:text-[#00ff00] transition-colors"
            >
              {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[#666] text-sm mt-8">
          High contrast • Accessible • Professional
        </p>
      </div>
    </div>
  );
}
