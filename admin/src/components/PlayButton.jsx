// Play Button Component
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Upload, Trash2, Music, Plus, Volume2, X } from 'lucide-react';
export const PlayButton = ({ isPlaying, onClick, size = 'w-12 h-12' }) => {
  return (
    <button
      onClick={onClick}
      className={`${size} bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform`}
    >
      {isPlaying ? (
        <Pause className="w-6 h-6 text-black" />
      ) : (
        <Play className="w-6 h-6 text-black ml-0.5" />
      )}
    </button>
  );
};
