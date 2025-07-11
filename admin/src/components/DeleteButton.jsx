import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Upload, Trash2, Music, Plus, Volume2, X } from 'lucide-react';
export const DeleteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-3 w-full flex items-center justify-center space-x-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 px-3 rounded-lg transition-colors text-sm"
    >
      <Trash2 className="w-4 h-4" />
      <span>Delete</span>
    </button>
  );
};