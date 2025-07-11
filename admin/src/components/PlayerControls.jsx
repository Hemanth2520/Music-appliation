import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Upload, Trash2, Music, Plus, Volume2, X } from 'lucide-react';
import { PlayButton } from './PlayButton';
import { ProgressBar } from './ProgressBar';


// Player Controls Component
export const PlayerControls = ({ isPlaying, onPlayPause, currentTime, duration, onSeek, formatTime }) => {
  return (
    <div className="flex-1 max-w-md">
      <div className="flex items-center justify-center mb-2">
        <PlayButton
          isPlaying={isPlaying}
          onClick={onPlayPause}
          size="w-10 h-10"
        />
      </div>
      
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onSeek={onSeek}
        formatTime={formatTime}
      />
    </div>
  );
};
