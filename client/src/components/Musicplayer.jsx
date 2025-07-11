import React, { useEffect, useRef, useState } from 'react';
import {
  Play, Pause, Heart, Shuffle,
  SkipBack, SkipForward, MoreVertical, Volume2
} from 'lucide-react';

const MusicPlayer = ({
  tracks = [],
  currentTrackIndex = 0,
  isPlaying = false,
  volume = 50,
  setIsPlaying = () => {},
  setVolume = () => {},
  onNext = () => {},
  onPrev = () => {},
}) => {
  const audioRef = useRef(null);
  const track = tracks[currentTrackIndex] || {};
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume / 100;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const current = audio.currentTime;
      const total = audio.duration;
      setCurrentTime(current);
      setDuration(total);
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [currentTrackIndex]);

  return (
    <div>
      <audio
        ref={audioRef}
        src={track.audio}
        onEnded={() => setIsPlaying(false)}
        hidden
      />

      <div className="flex-1 fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-t border-white/10 p-3">

        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          {/* Current Track Info */}
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              {track.cover && track.cover.startsWith('http') ? (
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <Play size={20} fill="white" />
              )}
            </div>
            <div className="min-w-0">
              <h4 className="font-medium truncate">
                {track.title || "No Track"}
              </h4>
              <p className="text-gray-400 text-sm truncate">
                {track.artist || "Unknown Artist"}
              </p>
            </div>
            <Heart size={16} className="text-gray-400 hover:text-pink-400 cursor-pointer flex-shrink-0" />
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
            <div className="flex items-center space-x-4">
              <Shuffle size={16} className="text-gray-400 hover:text-white cursor-pointer" />
              <SkipBack size={20} className="text-gray-400 hover:text-white cursor-pointer" onClick={onPrev} />
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-white text-black p-2 rounded-full hover:scale-110 transition-transform"
              >
                {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" />}
              </button>
              <SkipForward size={20} className="text-gray-400 hover:text-white cursor-pointer" onClick={onNext} />
              <MoreVertical size={16} className="text-gray-400 hover:text-white cursor-pointer" />
            </div>
            <div className="flex items-center space-x-2 w-full">
              <span className="text-xs text-gray-400">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1 bg-gray-600 h-1 rounded-full overflow-hidden cursor-pointer"
                   onClick={(e) => {
                     const audio = audioRef.current;
                     if (audio && duration > 0) {
                       const rect = e.currentTarget.getBoundingClientRect();
                       const x = e.clientX - rect.left;
                       const newTime = (x / rect.width) * duration;
                       audio.currentTime = newTime;
                     }
                   }}>
                <div
                  className="bg-white h-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400">
                {track.duration || formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-3 flex-1 justify-end">
            <Volume2 size={18} className="text-gray-400" />
            <div className="w-24 bg-gray-600 h-1 rounded-full overflow-hidden cursor-pointer relative"
                 onClick={(e) => {
                   const rect = e.currentTarget.getBoundingClientRect();
                   const x = e.clientX - rect.left;
                   const newVolume = Math.round((x / rect.width) * 100);
                   setVolume(Math.max(0, Math.min(100, newVolume)));
                 }}>
              <div
                className="bg-white h-full transition-all"
                style={{ width: `${volume}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
