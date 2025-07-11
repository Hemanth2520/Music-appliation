
// Audio Player Component
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Upload, Trash2, Music, Plus, Volume2, X } from 'lucide-react';
import { CurrentSongInfo } from './CurrentSongInfo';
import { PlayerControls } from './PlayerControls';
import { VolumeControl } from './VolumeControl';


export const AudioPlayer = ({ currentSong, isPlaying, onPlayPause }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => onPlayPause();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong, onPlayPause]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const seekAudio = (e) => {
    const audio = audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-4">
          <CurrentSongInfo song={currentSong} />
          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={onPlayPause}
            currentTime={currentTime}
            duration={duration}
            onSeek={seekAudio}
            formatTime={formatTime}
          />
          <VolumeControl />
        </div>
      </div>
      
      <audio
        ref={audioRef}
        src={currentSong?.file}
        preload="metadata"
      />
    </div>
  );
};