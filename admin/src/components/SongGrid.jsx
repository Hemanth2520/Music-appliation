// Song Grid Component
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Upload, Trash2, Music, Plus, Volume2, X } from 'lucide-react';
import { SongCard } from './SongCard';
export const SongGrid = ({ songs, currentSong, isPlaying, onPlay, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-32">
      {songs.map((song) => (
        <SongCard
          key={song._id}
          song={song}
          isCurrentSong={currentSong?._id === song._id}
          isPlaying={isPlaying}
          onPlay={() => onPlay(song)}
          onDelete={() => onDelete(song._id)}
        />
      ))}
    </div>
  );
};
