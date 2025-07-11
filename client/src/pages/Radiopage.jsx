import React, { useState, useRef, useEffect } from "react";
import { Play } from 'lucide-react';
import MusicPlayer from '../components/Musicplayer';
import { songs as SongsArray } from '../components/songs/Songs';
import { songService } from '../services/songService';

const Radiopage = () => {
  const [playingStationId, setPlayingStationId] = useState(null);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef(new Audio());
  // Music tracks state
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRadioBar, setShowRadioBar] = useState(false);

  const stations = [
    {
      id: 1,
      name: "Jazz FM",
      genre: "Jazz",
      url: "https://stream.antenne1.de/a1stg/livestream2.mp3",
      frequency: "101.1 FM",
      description: "Smooth jazz and contemporary sounds",
      icon: "🎷",
      color: "from-purple-400 to-indigo-500",
      listeners: "6.2K"
    },
    {
      id: 2,
      name: "Rock Central",
      genre: "Rock",
      url: "https://streams.ilovemusic.de/iloveradio14.mp3",
      frequency: "103.5 FM",
      description: "Classic and modern rock hits",
      icon: "🎸",
      color: "from-gray-700 to-red-600",
      listeners: "9.8K"
    },
    {
      id: 3,
      name: "AR",
      genre: "Electronic",
      url: "https://stream.zeno.fm/z78dpahfewzuv",
      frequency: "105.7 FM",
      description: "Electronic dance music 24/7",
      icon: "⚡",
      color: "from-cyan-400 to-blue-600",
      listeners: "11.4K"
    },
    {
      id: 4,
      name: "Imusic",
      genre: "Classical",
      url: "https://stream.zeno.fm/f8fzwccs44zuv",
      frequency: "107.3 FM",
      description: "Beautiful classical compositions",
      icon: "🎼",
      color: "from-green-400 to-yellow-500",
      listeners: "5.5K"
    },
    {
      id: 5,
      name: "Ilove Radio",
      genre: "Pop",
      url: "https://streams.ilovemusic.de/iloveradio1.mp3",
      frequency: "109.1 FM",
      description: "Today's biggest pop hits",
      icon: "🎤",
      color: "from-pink-400 to-red-500",
      listeners: "13.2K"
    },
    {
      id: 6,
      name: "Testing Stream",
      genre: "Pop",
      url: "https://listen.openstream.co/4603/audio",
      frequency: "92.7 FM",
      description: "Openstream testing station",
      icon: "🧪",
      color: "from-orange-400 to-yellow-500",
      listeners: "1.2K"
    },
    {
      id: 7,
      name: "Zeno Test 1",
      genre: "Talk",
      url: "https://stream.zeno.fm/tqhegaztqfhvv",
      frequency: "100.0 FM",
      description: "Zeno FM testing stream",
      icon: "📻",
      color: "from-lime-400 to-emerald-500",
      listeners: "1.1K"
    },
    {
      id: 8,
      name: "Zeno Test 2",
      genre: "Indie",
      url: "https://stream.zeno.fm/43cs967p6rhvv",
      frequency: "106.4 FM",
      description: "Indie streaming test",
      icon: "📻",
      color: "from-fuchsia-500 to-purple-600",
      listeners: "1.1K"
    },
    {
      id: 9,
      name: "poyera ",
      genre: "Indie",
      url: "https://aac.saavncdn.com/078/725f26fe79427d28857dd6d3bccb6c37_160.mp4",
      frequency: "106.4 FM",
      description: "Indie streaming test",
      icon: "📻",
      color: "from-fuchsia-500 to-purple-600",
      listeners: "1.1K"
    }
  ];

  const togglePlay = (station) => {
    const audio = audioRef.current;

    if (playingStationId === station.id) {
      audio.pause();
      setPlayingStationId(null);
      setShowRadioBar(false);
    } else {
      audio.pause();
      audio.src = station.url;
      audio.volume = volume / 100;
      audio.play().catch((err) => {
        console.error("Audio playback failed:", err);
        alert("Unable to play this station.");
      });
      setPlayingStationId(station.id);
      setShowRadioBar(true);
      setCurrentTrackIndex(null); // Hide music player if radio is playing
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  // Add handler to play a music track
  const handleTrackClick = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setPlayingStationId(null); // Pause radio if music is played
    if (audioRef.current) audioRef.current.pause();
  };

  useEffect(() => {
    const fetchSongs = async () => {
      let songs = [];
      try {
        songs = await songService.getSongsForFrontend();
      } catch (err) {
        songs = SongsArray;
      }
      setTracks(songs);
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      audioRef.current.pause();
    };
  }, []);

  const currentStation = stations.find((s) => s.id === playingStationId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            Radio Waves 🎙️
          </h1>
          <p className="text-gray-400 mt-3 text-lg">
            Stream live radio from around the world — genres for every mood!
          </p>
        </div>

        {/* Now Playing */}
        {currentStation && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-10 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 animate-pulse">
                <span className="text-3xl">{currentStation.icon}</span>
              </div>
              <div>
                <p className="text-sm text-gray-300">Now Playing</p>
                <h3 className="text-xl font-semibold">{currentStation.name}</h3>
                <p className="text-sm text-gray-400">{currentStation.genre}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span>🔊</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="slider w-24"
              />
              <span className="w-10">{volume}%</span>
            </div>
          </div>
        )}

        {/* Station Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((station) => (
            <div
              key={station.id}
              className={`bg-gradient-to-br ${station.color} p-1 rounded-2xl hover:scale-[1.03] transition-transform shadow-xl`}
            >
              <div className="bg-black/30 p-5 rounded-xl h-full backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl">{station.icon}</div>
                  <div className="text-right">
                    <div className="text-sm font-mono text-white/90">
                      {station.frequency}
                    </div>
                    <div className="text-xs text-white/60">
                      {station.listeners} listeners
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-1">{station.name}</h2>
                <p className="text-white/70 mb-4 text-sm">{station.description}</p>
                <button
                  onClick={() => togglePlay(station)}
                  className={`w-full py-2 rounded-lg text-sm font-semibold transition ${
                    playingStationId === station.id
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {playingStationId === station.id ? "⏸️ Pause" : "▶️ Play"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Music Tracks Section */}
        {tracks.length > 0 && (
          <div className="my-12">
            <h2 className="text-2xl font-bold mb-4">Music Tracks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tracks.map((track, idx) => (
                <div key={track.id} className={`bg-black/20 rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-all ${currentTrackIndex === idx && isPlaying ? 'border border-purple-500' : ''}`}
                  onClick={() => handleTrackClick(idx)}>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                    <Play size={20} fill="white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{track.title}</h4>
                    <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                  </div>
                  <span className="text-gray-400 text-xs">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-gray-400 mt-10 text-sm">
          🎧 High-quality streaming • 24/7 global stations 
        </p>
      </div>

      {/* Music Player for tracks */}
      {currentTrackIndex !== null && tracks.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full">
          <MusicPlayer
            tracks={tracks}
            currentTrackIndex={currentTrackIndex}
            isPlaying={isPlaying}
            volume={volume}
            setIsPlaying={setIsPlaying}
            setVolume={setVolume}
            onNext={() => setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)}
            onPrev={() => setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1))}
          />
        </div>
      )}

      {/* Radio Bar at bottom when radio is playing */}
      {showRadioBar && playingStationId && (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-2xl">{stations.find(s => s.id === playingStationId)?.icon}</span>
            <span className="font-semibold">{stations.find(s => s.id === playingStationId)?.name}</span>
            <span className="text-gray-400 text-sm">{stations.find(s => s.id === playingStationId)?.frequency}</span>
          </div>
          <button
            onClick={() => togglePlay(stations.find(s => s.id === playingStationId))}
            className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            ⏸️ Pause
          </button>
        </div>
      )}

      {/* Slider Style */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #f59e0b;
          border: 2px solid white;
        }
        .slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #f59e0b;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default Radiopage;
