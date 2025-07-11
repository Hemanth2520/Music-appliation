import React, { useState, useEffect, useRef } from 'react';
import { Play, Heart, MoreVertical } from 'lucide-react';

const Trendingsongs = ({ tracks = [], likedSongIds = new Set(), onLikeToggle = () => {} }) => {
  // Use passed tracks or fallback to empty array
  const trendingTracks = tracks.map((track, index) => ({
    ...track,
    liked: false, // Default to not liked
    audioUrl: track.audio || track.audioUrl, // Use audio field from backend
  }));

  // If no tracks available, show placeholder
  if (trendingTracks.length === 0) {
    return (
      <section>
        <h3 className="text-2xl font-bold mb-6">Trending Now</h3>
        <div className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 p-8 text-center">
          <p className="text-gray-400">No trending songs available. Add some songs to get started!</p>
        </div>
      </section>
    );
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying && audio && trendingTracks.length > 0) {
      audio.src = trendingTracks[currentTrack]?.audioUrl;
      audio.play().catch(console.error);
    } else if (audio) {
      audio.pause();
    }

    const updateProgress = () => {
      if (audio && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [isPlaying, currentTrack, trendingTracks]);

  return (
    <section>
      <h3 className="text-2xl font-bold mb-6">Trending Now</h3>
      <div className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
        {trendingTracks.map((track, index) => (
          <div
            key={track.id}
            className={`flex items-center p-4 hover:bg-white/5 transition-all cursor-pointer ${
              currentTrack === index ? 'bg-purple-500/20' : ''
            }`}
            onClick={() => {
              if (currentTrack === index && isPlaying) {
                setIsPlaying(false); // Pause if clicking current
              } else {
                setCurrentTrack(index);
                setIsPlaying(true); // Play new track
              }
            }}
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-8 text-gray-400 text-sm font-medium">
                {currentTrack === index && isPlaying ? (
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-green-500 animate-pulse"></div>
                    <div
                      className="w-1 h-4 bg-green-500 animate-pulse"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="w-1 h-4 bg-green-500 animate-pulse"
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                  </div>
                ) : (
                  index + 1
                )}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Play size={16} fill="white" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium truncate">{track.title}</h4>
                <p className="text-gray-400 text-sm truncate">{track.artist} • {track.album}</p>
              </div>
            </div>
            <button
              className={`ml-2 ${likedSongIds.has(track.id) ? 'text-pink-400' : 'text-white/80 hover:text-pink-400'}`}
              onClick={e => { e.stopPropagation(); onLikeToggle(track.id); }}
            >
              <Heart className={`w-5 h-5 ${likedSongIds.has(track.id) ? 'fill-current' : ''}`} />
            </button>
            <span className="text-gray-400 text-xs ml-2">{track.duration}</span>
          </div>
        ))}
      </div>
      <audio ref={audioRef} />
    </section>
  );
};

export default Trendingsongs;
