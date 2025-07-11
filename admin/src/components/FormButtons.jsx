// Form Buttons Component
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Upload, Trash2, Music, Plus, Volume2, X } from 'lucide-react';
export const FormButtons = ({ onSubmit, onCancel, uploading }) => {
  return (
    <div className="flex space-x-4 pt-4">
      <button
        onClick={onSubmit}
        disabled={uploading}
        className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        <Upload className="w-4 h-4" />
        <span>{uploading ? 'Uploading...' : 'Add Song'}</span>
      </button>
      
      <button
        onClick={onCancel}
        className="px-6 py-2 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
      >
        Cancel
      </button>
    </div>
  );
};
