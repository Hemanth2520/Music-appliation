import React from 'react';
import { Search, User } from 'lucide-react';

const Header = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-left">
      <h2 className="text-4xl font-bold mb-2">Welcome to SoundWave 🎵</h2>
      
      
      <p className="text-gray-300">
Start exploring your favorite music and discover new artists!

      </p>
    </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search songs, artists..."
              className="bg-black/30 border border-white/20 rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:border-purple-400 transition-all"
            />
          </div>

          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
