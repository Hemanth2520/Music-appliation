// Song Card Component
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { SongInfo } from './SongInfo';
import { DeleteButton } from './DeleteButton';
export const SongCard = ({ song, isCurrentSong, isPlaying, onPlay, onDelete }) => (
  <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-lg hover:bg-white/20 transition-all duration-300 ${isCurrentSong ? 'ring-2 ring-purple-400' : ''}`}>
    <div className="relative group mb-4">
      <img
        src={song.image}
        alt={song.name}
        className="w-full aspect-square object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
        <button
          onClick={onPlay}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3"
        >
          {isCurrentSong && isPlaying ? <Pause /> : <Play />}
        </button>
      </div>
    </div>
    <SongInfo song={song} />
    <div className="opacity-70 hover:opacity-100 transition-opacity">
      <DeleteButton onClick={onDelete} />
    </div>
  </div>
);