// import { Music, Plus } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Upload, Trash2, Music, Plus, Volume2, X } from 'lucide-react';

// Header Component
export const Header = ({ onAddClick }) => {
  return (
    <header className="bg-gradient-to-r from-purple-800/80 via-indigo-800/80 to-blue-900/80 shadow-xl border-b border-white/10 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="bg-purple-600/80 p-2 rounded-full shadow-lg">
              <Music className="w-10 h-10 text-white" />
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
              MusicStream
            </h1>
          </div>
          <button
            onClick={onAddClick}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <Plus className="w-5 h-5" />
            <span>Add Song</span>
          </button>
        </div>
      </div>
    </header>
  );
};