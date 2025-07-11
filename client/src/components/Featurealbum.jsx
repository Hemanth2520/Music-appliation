import React, { useState, useRef } from 'react';
import { Play, Pause, Heart } from 'lucide-react';

const Featurealbum = ({ albums = [] }) => {
  const featuredAlbums = albums.slice(0, 8);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(new Audio());

  const handlePlayPause = (album) => {
    const audio = audioRef.current;

    if (currentTrack?.id === album.id) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      audio.src = album.url; // ✅ corrected audio URL
      audio.play();
      setCurrentTrack(album);
    }

    audio.onended = () => setCurrentTrack(null);
  };

  return (
    <div>
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Featured Albums</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredAlbums.map((album) => {
            const isPlaying = currentTrack?.id === album.id && !audioRef.current.paused;

            return (
              <div key={album.id} className="group cursor-pointer">
                <div className="relative aspect-square rounded-xl mb-4 overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400">
                  {album.img ? (
                    <img
                      src={album.img}
                      alt={album.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      🎵
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handlePlayPause(album)}
                      className="bg-green-500 hover:bg-green-400 p-4 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-300"
                    >
                      {isPlaying ? (
                        <Pause size={24} className="text-white" />
                      ) : (
                        <Play size={24} className="text-white" />
                      )}
                    </button>
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
                    <Heart size={20} className="text-white hover:text-pink-400 cursor-pointer" />
                  </div>
                </div>
                <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {album.name}
                </h4>
                <p className="text-gray-400 text-sm">{album.artist}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Featurealbum;
