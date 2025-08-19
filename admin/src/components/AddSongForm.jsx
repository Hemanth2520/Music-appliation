// Add Song Form Component
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Upload, Trash2, Music, Plus, Volume2, X } from 'lucide-react';
import { FormHeader } from './FormHeader';
import { InputField } from './InputField';
import { TextAreaField } from './TextAreaField';
import { FileInput } from './FileInput';
import { FormButtons } from './FormButtons';



export const AddSongForm = ({ onSongAdded, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    album: '',
  });
  const [files, setFiles] = useState({
    image: null,
    audio: null,
  });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async () => {
    if (!files.image || !files.audio) {
      alert('Please select both image and audio files');
      return;
    }

    setUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('desc', formData.desc);
    formDataObj.append('album', formData.album);
    formDataObj.append('image', files.image);
    formDataObj.append('audio', files.audio);

    try {
      const response = await fetch(`https://music-appliation.onrender.com/api/song/add`, {
        method: 'POST',
        body: formDataObj,
      });

      if (response.ok) {
        alert('Song added successfully!');
        setFormData({ name: '', desc: '', album: '' });
        setFiles({ image: null, audio: null });
        onSongAdded();
        onClose();
      } else {
        alert('Failed to add song');
      }
    } catch (error) {
      console.error('Error adding song:', error);
      alert('Error adding song');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
      <FormHeader onClose={onClose} />
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Song Name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Enter song name"
            required
          />
          
          <InputField
            label="Album"
            value={formData.album}
            onChange={(value) => setFormData({ ...formData, album: value })}
            placeholder="Enter album name"
            required
          />
        </div>

        <TextAreaField
          label="Description"
          value={formData.desc}
          onChange={(value) => setFormData({ ...formData, desc: value })}
          placeholder="Enter song description"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileInput
            label="Image File"
            accept="image/*"
            onChange={(file) => setFiles({ ...files, image: file })}
            required
          />

          <FileInput
            label="Audio File"
            accept="audio/*"
            onChange={(file) => setFiles({ ...files, audio: file })}
            required
          />
        </div>

        <FormButtons
          onSubmit={handleSubmit}
          onCancel={onClose}
          uploading={uploading}
        />
      </div>
    </div>
  );
};