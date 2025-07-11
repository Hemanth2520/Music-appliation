import React, { useState, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Heart, 
  MoreHorizontal, 
  Search, 
  Filter, 
  Plus,
  Music,
  Clock,
  Grid,
  List,
  Shuffle,
  Volume2
} from "lucide-react";
import { songs as SongsArray } from '../components/songs/Songs';
import { songService } from '../services/songService';
import MusicPlayer from '../components/Musicplayer';

const Librarypage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const [likedSongIds, setLikedSongIds] = useState(new Set());
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [volume, setVolume] = useState(75);
  const [playlists] = useState([
    { 
      id: 1,
      name: "Chill Vibes", 
      desc: "Relaxing tracks for peaceful moments", 
      color: "from-purple-500 to-indigo-600",
      songCount: 42,
      duration: "2h 34m",
      lastPlayed: "2 days ago",
      cover: "🌙"
    },
    { 
      id: 2,
      name: "Workout Mix", 
      desc: "High-energy tracks to boost your workout", 
      color: "from-pink-500 to-red-500",
      songCount: 28,
      duration: "1h 45m",
      lastPlayed: "Yesterday",
      cover: "🔥"
    },
    { 
      id: 3,
      name: "Focus Flow", 
      desc: "Instrumental beats for deep concentration", 
      color: "from-green-400 to-teal-500",
      songCount: 35,
      duration: "2h 12m",
      lastPlayed: "Today",
      cover: "🎯"
    },
    { 
      id: 4,
      name: "Road Trip", 
      desc: "Perfect soundtrack for long drives", 
      color: "from-orange-500 to-yellow-500",
      songCount: 67,
      duration: "4h 23m",
      lastPlayed: "1 week ago",
      cover: "🚗"
    },
    { 
      id: 5,
      name: "Throwback Hits", 
      desc: "Classic songs that never get old", 
      color: "from-blue-500 to-cyan-500",
      songCount: 89,
      duration: "5h 56m",
      lastPlayed: "3 days ago",
      cover: "📻"
    },
    { 
      id: 6,
      name: "Indie Favorites", 
      desc: "Hidden gems and indie discoveries", 
      color: "from-violet-500 to-purple-600",
      songCount: 23,
      duration: "1h 28m",
      lastPlayed: "5 days ago",
      cover: "💎"
    }
  ]);

  useEffect(() => {
    const fetchSongs = async () => {
      let songs = [];
      try {
        songs = await songService.getSongsForFrontend();
      } catch (err) {
        songs = SongsArray;
      }
      setLikedSongs(songs);
      setLikedSongIds(new Set(songs.filter(s => s.liked).map(s => s.id)));
    };
    fetchSongs();
  }, []);

  const handleLikeToggle = (songId) => {
    setLikedSongIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
    setLikedSongs(prev => prev.map(song => song.id === songId ? { ...song, liked: !song.liked } : song));
    // Optionally: call backend to persist like/unlike
  };

  const filteredItems = () => {
    let items = [];
    if (selectedFilter === "all" || selectedFilter === "playlists") {
      items = [...items, ...playlists];
    }
    if (selectedFilter === "all" || selectedFilter === "songs") {
      items = [...items, ...likedSongs];
    }
    
    if (searchQuery) {
      return items.filter(item => 
        (item.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.title?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.artist?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return items;
  };

  const togglePlay = (song) => {
    if (currentPlaying?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentPlaying(song);
      setIsPlaying(true);
    }
  };

  const handleTrackClick = (song, index) => {
    setCurrentPlaying(song);
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const PlaylistCard = ({ playlist }) => (
    <div className={`group relative rounded-xl p-6 h-48 flex flex-col justify-between bg-gradient-to-br ${playlist.color} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 border border-white/10`}>
      <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="text-3xl mb-2">{playlist.cover}</div>
          <button className="opacity-0 group-hover:opacity-100 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300">
            <MoreHorizontal className="w-4 h-4 text-white" />
          </button>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{playlist.name}</h3>
          <p className="text-sm text-white/80 mb-3 line-clamp-2">{playlist.desc}</p>
          <div className="flex items-center justify-between text-xs text-white/70">
            <span>{playlist.songCount} songs</span>
            <span>{playlist.duration}</span>
          </div>
        </div>
      </div>
      <button className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-300 shadow-lg">
        <Play className="w-5 h-5" />
      </button>
    </div>
  );

  const SongItem = ({ song, index }) => (
    <div className="group flex items-center bg-white/5 backdrop-blur-sm rounded-lg p-3 hover:bg-white/10 transition-all duration-300 cursor-pointer border border-white/10 hover:border-purple-500/30"
      onClick={() => handleTrackClick(song, index)}>
      <div className="flex items-center w-8 text-gray-400 text-sm">
        <span className="group-hover:hidden">{index + 1}</span>
        <button 
          onClick={e => { e.stopPropagation(); handleTrackClick(song, index); }}
          className="hidden group-hover:block text-white hover:text-purple-400 transition-colors duration-200"
        >
          {currentPlaying?.id === song.id && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
      <div className="flex items-center flex-1 min-w-0 ml-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-xl mr-4 overflow-hidden">
          {song.cover && song.cover.startsWith('http') ? (
            <img src={song.cover} alt={song.title} className="w-full h-full object-cover rounded-lg" />
          ) : (
            song.cover || <span role="img" aria-label="cover">🎵</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold truncate ${currentPlaying?.id === song.id ? 'text-purple-400' : 'text-white'}`}>
            {song.title}
          </h3>
          <p className="text-gray-400 text-sm truncate">{song.artist}</p>
        </div>
      </div>
      <div className="hidden md:block text-gray-400 text-sm mr-4 min-w-0 flex-1">
        <span className="truncate">{song.album}</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          className={`transition-colors duration-200 ${likedSongIds.has(song.id) ? 'text-pink-400' : 'text-purple-400 hover:text-purple-300'}`}
          onClick={e => { e.stopPropagation(); handleLikeToggle(song.id); }}
        >
          <Heart className={`w-4 h-4 ${likedSongIds.has(song.id) ? 'fill-current' : ''}`} />
        </button>
        <span className="text-gray-400 text-sm min-w-[40px]">{song.duration}</span>
        <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all duration-200">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 text-white">
      <div className="p-6 max-w-7xl mx-auto pb-36"> {/* Add bottom padding for music player */}
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Your Library
            </h1>
            <p className="text-gray-400">
              {playlists.length} playlists • {likedSongs.length} liked songs
            </p>
          </div>
          <button className="mt-4 sm:mt-0 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2 shadow-lg">
            <Plus className="w-5 h-5" />
            Create Playlist
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search playlists and songs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">All</option>
              <option value="playlists">Playlists</option>
              <option value="songs">Songs</option>
            </select>
            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-purple-500" : "hover:bg-white/10"} transition-all duration-200`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-purple-500" : "hover:bg-white/10"} transition-all duration-200`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Playlists Section */}
        {(selectedFilter === "all" || selectedFilter === "playlists") && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Music className="text-purple-400 w-6 h-6" />
                Your Playlists
              </h2>
              <button className="text-purple-400 hover:text-purple-300 flex items-center gap-2 text-sm font-medium transition-colors duration-200">
                <Shuffle className="w-4 h-4" />
                Shuffle All
              </button>
            </div>
            
            <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "grid-cols-1 gap-4"}`}>
              {playlists
                .filter(playlist => 
                  !searchQuery || 
                  playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((playlist) => (
                  viewMode === "grid" ? (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ) : (
                    <div key={playlist.id} className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer border border-white/10 hover:border-purple-500/30">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${playlist.color} flex items-center justify-center text-2xl mr-4`}>
                        {playlist.cover}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-lg mb-1">{playlist.name}</h3>
                        <p className="text-gray-400 text-sm mb-1">{playlist.desc}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{playlist.songCount} songs</span>
                          <span>{playlist.duration}</span>
                          <span>Last played {playlist.lastPlayed}</span>
                        </div>
                      </div>
                      <button className="text-purple-400 hover:text-purple-300 p-2 rounded-full hover:bg-white/10 transition-all duration-200">
                        <Play className="w-5 h-5" />
                      </button>
                    </div>
                  )
                ))}
            </div>
          </section>
        )}

        {/* Liked Songs Section */}
        {(selectedFilter === "all" || selectedFilter === "songs") && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Heart className="text-red-500 w-6 h-6 fill-current" />
                Liked Songs
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{likedSongs.length} songs</span>
                <button className="text-red-400 hover:text-red-300 flex items-center gap-2 font-medium transition-colors duration-200">
                  <Shuffle className="w-4 h-4" />
                  Shuffle
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              {likedSongs
                .filter(song => 
                  !searchQuery || 
                  song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  song.artist.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((song, index) => (
                  <SongItem key={song.id} song={song} index={index} />
                ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredItems().length === 0 && searchQuery && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No results found</h3>
            <p className="text-gray-500">Try searching for something else</p>
          </div>
        )}
      </div>
      {/* Music Player for liked songs */}
      {currentTrackIndex !== null && likedSongs.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full">
          <MusicPlayer
            tracks={likedSongs}
            currentTrackIndex={currentTrackIndex}
            isPlaying={isPlaying}
            volume={volume}
            setIsPlaying={setIsPlaying}
            setVolume={setVolume}
            onNext={() => setCurrentTrackIndex((prev) => (prev + 1) % likedSongs.length)}
            onPrev={() => setCurrentTrackIndex((prev) => (prev === 0 ? likedSongs.length - 1 : prev - 1))}
          />
        </div>
      )}
    </div>
  );
};

export default Librarypage;