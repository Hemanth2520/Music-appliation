// Volume Control Component
import React from 'react';
import { Volume2 } from 'lucide-react';

export const VolumeControl = ({ volume, onVolumeChange }) => (
  <div className="flex items-center space-x-2">
    <Volume2 className="text-white" />
    <input
      type="range"
      min={0}
      max={1}
      step={0.01}
      value={volume}
      onChange={e => onVolumeChange(Number(e.target.value))}
      className="w-24"
    />
  </div>
);