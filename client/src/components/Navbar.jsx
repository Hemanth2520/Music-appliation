import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Home, Library, Radio, User, LogOut
} from 'lucide-react';

const Navbar = () => {
  return (
    <aside className="z-50 w-64 hidden md:flex flex-col justify-between h-screen bg-black/20 backdrop-blur-xl border-r border-white/10 p-6 fixed left-0 top-0">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-8">
          SoundWave
        </h1>

        <nav className="space-y-4">
          <Link to="/home" className="flex items-center space-x-3 text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-lg">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/search" className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-white/10 transition-all">
            <Search size={20} />
            <span>Search</span>
          </Link>
          <Link to="/library" className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-white/10 transition-all">
            <Library size={20} />
            <span>Your Library</span>
          </Link>
          <Link to="/radio" className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-white/10 transition-all">
            <Radio size={20} />
            <span>Radio</span>
          </Link>
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-white/10">
          <h3 className="font-semibold mb-2">Create Playlist</h3>
          <p className="text-sm text-gray-300 mb-3">Save your favorite tracks</p>
          <button className="w-full bg-white text-black py-2 rounded-full font-medium hover:scale-105 transition-transform">
            Create
          </button>
        </div>
      </div>

      {/* Footer Section: Profile & Logout */}
      <div className="pt-6 border-t border-white/10 space-y-4">
        <div className="flex items-center space-x-3 text-white">
          <User size={24} />
          <span className="text-sm font-medium">Your Profile</span>
        </div>

        <Link
          to="/logout"
          className="flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-white/10 transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Navbar;
