import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AddSongForm } from './components/AddSongForm';
import { SongGrid } from './components/SongGrid';
import { AudioPlayer } from './components/AudioPlayer';

const API_BASE = 'https://music-appliation.onrender.com/api';

const MusicStreamingApp = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/song/list`);
      const data = await response.json();
      if (data.songs) {
        setSongs(data.songs);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const playSong = (song) => {
    if (currentSong?.file === song.file) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const deleteSong = async (songId) => {
    if (!window.confirm('Are you sure you want to delete this song?')) return;

    try {
      const response = await fetch(`${API_BASE}/song/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: songId }),
      });

      if (response.ok) {
        setSongs(songs.filter(song => song._id !== songId));
        if (currentSong?._id === songId) {
          setCurrentSong(null);
          setIsPlaying(false);
        }
        alert('Song deleted successfully!');
      } else {
        alert('Failed to delete song');
      }
    } catch (error) {
      console.error('Error deleting song:', error);
      alert('Error deleting song');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header onAddClick={() => setShowAddForm(!showAddForm)} />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {showAddForm && (
          <AddSongForm 
            onSongAdded={fetchSongs} 
            onClose={() => setShowAddForm(false)} 
          />
        )}

        {loading ? (
          <div className="text-white text-center py-12">Loading songs...</div>
        ) : songs.length === 0 ? (
          <div className="text-white text-center py-12">No songs found. Add your first song!</div>
        ) : (
          <SongGrid 
            songs={songs}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlay={playSong}
            onDelete={deleteSong}
          />
        )}
      </div>

      {currentSong && (
        <AudioPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={() => playSong(currentSong)}
        />
      )}
    </div>
  );
};

export default MusicStreamingApp;