// Song Info Component
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Upload, Trash2, Music, Plus, Volume2, X } from 'lucide-react';
export const SongInfo = ({ song }) => {
  return (
    <div className="space-y-1">
      <h3 className="text-white font-semibold truncate">{song.name}</h3>
      <p className="text-gray-300 text-sm truncate">{song.album}</p>
      <p className="text-gray-400 text-xs">{song.duration}</p>
    </div>
  );
};