import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth();
  const URL = `${API}/api/auth/register`;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);
        setFormData({ username: '', email: '', phone: '', password: '', confirmPassword: '' });
        toast.success('Registration successful');
        navigate('/');
      } else {
        toast.error(res_data.extraDetails || res_data.message);
      }
    } catch (error) {
      toast.error('Something went wrong during registration');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Register</h2>

        <label className="block text-white mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          required
          className="w-full p-2 mb-4 rounded bg-white/5 border border-white/20 text-white"
        />

        <label className="block text-white mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
          className="w-full p-2 mb-4 rounded bg-white/5 border border-white/20 text-white"
        />

        <label className="block text-white mb-1">Phone</label>
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          required
          className="w-full p-2 mb-4 rounded bg-white/5 border border-white/20 text-white"
        />

        <label className="block text-white mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
            className="w-full p-2 pr-10 mb-4 rounded bg-white/5 border border-white/20 text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <label className="block text-white mb-1">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            required
            className="w-full p-2 pr-10 mb-4 rounded bg-white/5 border border-white/20 text-white"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-2 text-white"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded hover:from-purple-600 hover:to-blue-600 transition"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register Now'}
        </button>
      </form>
    </div>
  );
}
