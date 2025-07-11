import React from 'react';
import { Play, Heart } from 'lucide-react';

const RecentlyPlayed = ({ tracks = [], onTrackSelect, likedSongIds = new Set(), onLikeToggle = () => {} }) => {
  // Use passed tracks or fallback to empty array
  const recentlyPlayed = tracks.slice(0, 6); // Show first 6 tracks as recently played

  // If no tracks available, show placeholder
  if (recentlyPlayed.length === 0) {
    return (
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Recently Played</h3>
        <div className="flex space-x-6">
          <div className="text-gray-400 text-center py-8">
            <p>No songs available. Add some songs to get started!</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="mb-12">
      <h3 className="text-2xl font-bold mb-6">Recently Played</h3>
      <div className="flex space-x-6 overflow-x-auto">
        {recentlyPlayed.map((item, index) => (
          <div key={item.id} className="group cursor-pointer flex-shrink-0">
            <div
              className="w-32 h-32 rounded-lg mb-3 relative overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400"
              onClick={() => onTrackSelect(index)}
            >
              {/* Display album cover image if available */}
              {item.cover && item.cover.startsWith('http') ? (
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to gradient if image fails to load
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background: item.cover || "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
                  }}
                />
              )}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                  <Play size={16} fill="white" />
                </button>
              </div>
              {/* Like button */}
              <button
                className={`absolute top-2 right-2 z-10 p-1 rounded-full ${likedSongIds.has(item.id) ? 'text-pink-400' : 'text-white/80 hover:text-pink-400'}`}
                onClick={e => { e.stopPropagation(); onLikeToggle(item.id); }}
              >
                <Heart className={`w-5 h-5 ${likedSongIds.has(item.id) ? 'fill-current' : ''}`} />
              </button>
            </div>
            <h4 className="font-medium text-sm">{item.title}</h4>
            <p className="text-gray-400 text-xs">{item.artist}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyPlayed;
