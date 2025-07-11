import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, Search, Library, Radio } from 'lucide-react';
import Header from '../components/Header';
import RecentlyPlayed from '../components/Recentlyplayed';
import Featurealbum from '../components/Featurealbum';
import Trendingsongs from '../components/Trendingsongs';
import MusicPlayer from '../components/Musicplayer';
//import { songs as SongsArray } from '../components/songs/songs';
import { albumService } from '../services/albumService';
import { songService } from '../services/songService';
import {song} from '../components/singlesong';


const Home = () => {
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [likedSongIds, setLikedSongIds] = useState(new Set());

  // Fetch songs and albums from backend
  useEffect(() => {
    const fetchSongsAndAlbums = async () => {
      try {
        setLoading(true);
        let songsData = [];
        
        try {
          songsData = await songService.getSongsForFrontend();
        } catch (err) {
          // fallback to static array if backend fails
          songsData = SongsArray;
        }
        setTracks(songsData);
        const albumsData = await albumService.getAlbumsForFrontend();
        setAlbums(albumsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load music data');
        setAlbums([]);
        setTracks(SongsArray);
      } finally {
        setLoading(false);
      }
    };

    fetchSongsAndAlbums();
  }, []);

  const handleTrackSelect = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (tracks.length > 0) {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    if (tracks.length > 0) {
      setCurrentTrackIndex((prevIndex) =>
        prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
      );
      setIsPlaying(true);
    }
  };

  const handleLikeToggle = (songId) => {
    setLikedSongIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
    setTracks((prev) =>
      prev.map((song) =>
        song.id === songId ? { ...song, liked: !song.liked } : song
      )
    );
  };

  // Show loading state
  if (loading) {
    return (
     
      <div className="flex-1 bg-gray-900 text-white min-h-screen">
        <main className="p-8 overflow-y-auto w-full flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">Loading music...</p>
          </div>
        </main>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex-1 bg-gray-900 text-white min-h-screen">
        <main className="p-8 overflow-y-auto w-full flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-400 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-900 text-white">
      {/* Main Content */}
      
      <main className="p-8 overflow-y-auto w-full">
        <Header />
        <RecentlyPlayed
          tracks={tracks}
          onTrackSelect={handleTrackSelect}
          likedSongIds={likedSongIds}
          onLikeToggle={handleLikeToggle}
        />
        <Featurealbum albums={song} />
        <Trendingsongs
          tracks={tracks}
          likedSongIds={likedSongIds}
          onLikeToggle={handleLikeToggle}
        />
      </main>

      {/* Music Player */}
      {tracks.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full">
          <MusicPlayer
            tracks={tracks}
            currentTrackIndex={currentTrackIndex}
            isPlaying={isPlaying}
            volume={volume}
            setIsPlaying={setIsPlaying}
            setVolume={setVolume}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>
      )}
    </div>
    
  );
};

export default Home;
