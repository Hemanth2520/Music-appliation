// File Input Component
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Upload, Trash2, Music, Plus, Volume2, X } from 'lucide-react';
export const FileInput = ({ label, accept, onChange, required = false }) => {
  return (
    <div>
      <label className="block text-white text-sm font-medium mb-2">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files[0])}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-purple-600 file:text-white hover:file:bg-purple-700"
        required={required}
      />
    </div>
  );
};