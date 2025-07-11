import React, { useState } from 'react';
import { Eye, EyeOff, Music, Mail, Lock, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [activeInput, setActiveInput] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockToken = 'mock-jwt-token-' + Date.now();
      setIsLoading(false);

      if (mockToken) {
        localStorage.setItem('token', mockToken); // Save token
        setUser({ email: '', password: '' });
        navigate('/home'); // Redirect to home after login
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (err) {
      setIsLoading(false);
      alert(err?.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const FloatingNote = ({ delay, duration }) => (
    <div
      className={`absolute opacity-20 animate-bounce`}
      style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
    >
      <Music size={20} className="text-purple-300" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-indigo-500 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <FloatingNote delay={0} duration={3} />
        <FloatingNote delay={1} duration={2.5} />
        <FloatingNote delay={2} duration={3.5} />
        <div className="absolute top-1/4 left-1/4">
          <FloatingNote delay={0.5} duration={2.8} />
        </div>
        <div className="absolute top-3/4 right-1/4">
          <FloatingNote delay={1.5} duration={3.2} />
        </div>
        <div className="absolute bottom-1/4 left-3/4">
          <FloatingNote delay={2.5} duration={2.3} />
        </div>
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
              <Headphones size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Harmoni music app
            </h1>
            <p className="text-gray-300 text-lg">Your Music, Your World</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="relative">
                <label className="block text-white/90 text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${activeInput === 'email' ? 'text-purple-400' : 'text-gray-400'}`} />
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    onFocus={() => setActiveInput('email')}
                    onBlur={() => setActiveInput('')}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-white/90 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${activeInput === 'password' ? 'text-purple-400' : 'text-gray-400'}`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    onFocus={() => setActiveInput('password')}
                    onBlur={() => setActiveInput('')}
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6 pt-6 border-t border-white/20">
              <p className="text-white/60">
                Don't have an account?{' '}
                <a href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200">
                  Sign up now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
