// Progress Bar Component
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Upload, Trash2, Music, Plus, Volume2, X } from 'lucide-react';
export const ProgressBar = ({ currentTime, duration, onSeek, formatTime }) => {
  return (
    <div className="flex items-center space-x-2 text-xs text-gray-400">
      <span>{formatTime(currentTime)}</span>
      <div
        className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer"
        onClick={onSeek}
      >
        <div
          className="h-full bg-white rounded-full"
          style={{
            width: `${duration ? (currentTime / duration) * 100 : 0}%`,
          }}
        />
      </div>
      <span>{formatTime(duration)}</span>
    </div>
  );
};
