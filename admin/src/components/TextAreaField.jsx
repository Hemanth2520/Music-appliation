// TextArea Field Component
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Upload, Trash2, Music, Plus, Volume2, X } from 'lucide-react';
export const TextAreaField = ({ label, value, onChange, placeholder, required = false }) => {
  return (
    <div>
      <label className="block text-white text-sm font-medium mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
        placeholder={placeholder}
        rows="3"
        required={required}
      />
    </div>
  );
};
