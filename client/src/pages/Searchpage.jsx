import React, { useState, useEffect, useRef } from 'react';
import { Search, Play, Pause, Heart, MoreVertical, Filter, Clock, User, Disc, Mic, Home, Library, Radio, Volume2, SkipBack, SkipForward, Shuffle, X, TrendingUp } from 'lucide-react';
import { songs as SongsArray } from '../components/songs/Songs';
import MusicPlayer from '../components/Musicplayer';
import { songService } from '../services/songService';

const trendingSearches = [
  "pop hits 2024",
  "chill vibes",
  "workout music",
  "jazz classics",
  "electronic dance"
];

const Searchpage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [tracks, setTracks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [volume, setVolume] = useState(75);
  const [recentSearches, setRecentSearches] = useState(['pop music', 'jazz', 'rock classics', 'chill beats']);
  const audioRef = useRef(null);

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

  // Filter results based on search query and active filter
  const getFilteredResults = () => {
    if (!searchQuery.trim()) return { tracks: [], artists: [], albums: [] };

    const query = searchQuery.toLowerCase();
    
    const filteredTracks = tracks.filter(track => 
      (track.title?.toLowerCase() || '').includes(query) ||
      (track.artist?.toLowerCase() || '').includes(query)
    );

    return { tracks: filteredTracks, artists: [], albums: [] };
  };

  const filteredResults = getFilteredResults();

  const handleTrackClick = (track, index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches(prev => [query.trim(), ...prev.slice(0, 4)]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const removeRecentSearch = (searchToRemove) => {
    setRecentSearches(prev => prev.filter(search => search !== searchToRemove));
  };

  return (
    <div className="flex-1 bg-gray-900 text-white">
      {/* Main Content */}
      <div className="p-8 pb-32">
        {/* Search Header */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-black/30 border border-white/20 rounded-full py-4 pl-12 pr-12 text-lg focus:outline-none focus:border-purple-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-6 mb-6">
            {['all', 'tracks', 'artists', 'albums'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results or Default Content */}
        {!searchQuery ? (
          <div>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Clock size={20} className="mr-2" />
                  Recent searches
                </h3>
                <div className="flex flex-wrap gap-3">
                  {recentSearches.map((search, index) => (
                    <div key={index} className="flex items-center bg-black/20 rounded-full px-4 py-2 group">
                      <button
                        onClick={() => setSearchQuery(search)}
                        className="text-gray-300 hover:text-white mr-2"
                      >
                        {search}
                      </button>
                      <button
                        onClick={() => removeRecentSearch(search)}
                        className="text-gray-500 hover:text-gray-300"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <TrendingUp size={20} className="mr-2" />
                Trending searches
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {trendingSearches.map((trend, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(trend)}
                    className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 rounded-lg p-4 text-left hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium group-hover:text-purple-300">{trend}</span>
                      <Search size={16} className="text-gray-400 group-hover:text-purple-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Browse Categories */}
            <div>
              <h3 className="text-xl font-bold mb-6">Browse all</h3>
              <div className="grid grid-cols-4 gap-6">
                {['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'Country', 'R&B'].map((genre, index) => (
                  <button
                    key={genre}
                    onClick={() => setSearchQuery(genre.toLowerCase())}
                    className="aspect-square rounded-lg p-6 text-left font-bold text-xl hover:scale-105 transition-transform"
                    style={{
                      background: [
                        'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                        'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                        'linear-gradient(135deg, #45b7d1 0%, #96c93d 100%)',
                        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      ][index]
                    }}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Search Results */}
            {filteredResults.tracks.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Disc size={20} className="mr-2" />
                  Songs ({filteredResults.tracks.length})
                </h3>
                <div className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                  {filteredResults.tracks.map((track, index) => (
                    <div
                      key={track.id}
                      className={`flex items-center p-4 hover:bg-white/5 transition-all cursor-pointer ${currentTrackIndex === index && isPlaying ? 'bg-purple-500/20' : ''}`}
                      onClick={() => handleTrackClick(track, index)}
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-8 text-gray-400 text-sm font-medium">
                          {currentTrackIndex === index && isPlaying ? (
                            <div className="flex space-x-1">
                              <div className="w-1 h-4 bg-green-500 animate-pulse"></div>
                              <div className="w-1 h-4 bg-green-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                              <div className="w-1 h-4 bg-green-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
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
                      <div className="flex items-center space-x-4">
                        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">{track.genre}</span>
                        <Heart size={16} className={`cursor-pointer ${track.liked ? 'text-pink-400 fill-current' : 'text-gray-400 hover:text-pink-400'}`} />
                        <span className="text-gray-400 text-sm">{track.duration}</span>
                        <MoreVertical size={16} className="text-gray-400 hover:text-white cursor-pointer" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredResults.tracks.length === 0 && (
              <div className="text-center py-16">
                <Search size={64} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found for "{searchQuery}"</h3>
                <p className="text-gray-400">Try searching for something else or check your spelling.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Music Player */}
      {currentTrackIndex !== null && tracks.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full">
          <MusicPlayer
            tracks={filteredResults.tracks.length > 0 ? filteredResults.tracks : tracks}
            currentTrackIndex={currentTrackIndex}
            isPlaying={isPlaying}
            volume={volume}
            setIsPlaying={setIsPlaying}
            setVolume={setVolume}
            onNext={() => setCurrentTrackIndex((prev) => (prev + 1) % (filteredResults.tracks.length > 0 ? filteredResults.tracks.length : tracks.length))}
            onPrev={() => setCurrentTrackIndex((prev) => (prev === 0 ? (filteredResults.tracks.length > 0 ? filteredResults.tracks.length : tracks.length) - 1 : prev - 1))}
          />
        </div>
      )}
    </div>
  );
};

export default Searchpage;