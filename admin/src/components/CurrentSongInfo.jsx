// Current Song Info Component
import React from 'react';

export const CurrentSongInfo = ({ song }) => (
  <div className="flex items-center space-x-3">
    <img
      src={song?.image}
      alt={song?.name}
      className="w-12 h-12 object-cover rounded"
    />
    <div>
      <div className="text-white font-semibold">{song?.name}</div>
      <div className="text-gray-300 text-sm">{song?.artist}</div>
    </div>
  </div>
);