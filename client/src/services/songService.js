import api from './api';

export const songService = {
  // Get all songs
  getAllSongs: async () => {
    try {
      const response = await api.get('/song/list');
      return response.songs || [];
    } catch (error) {
      console.error('Error fetching songs:', error);
      // Check if it's a network error (server not running)
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        console.warn('Backend server appears to be down');
        return []; // Return empty array to trigger fallback
      }
      throw error;
    }
  },

  // Add a new song
  addSong: async (songData) => {
    try {
      const response = await api.post('/song/add', songData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error('Error adding song:', error);
      throw error;
    }
  },

  // Remove a song
  removeSong: async (songId) => {
    try {
      const response = await api.post('/song/remove', { id: songId });
      return response;
    } catch (error) {
      console.error('Error removing song:', error);
      throw error;
    }
  },

  // Transform backend song data to frontend format
  transformSongData: (backendSong) => {
    return {
      id: backendSong._id,
      title: backendSong.name,
      artist: backendSong.album, // Using album as artist for now
      description: backendSong.desc,
      album: backendSong.album,
      cover: backendSong.image,
      audio: backendSong.file,
      duration: backendSong.duration,
      audioUrl: backendSong.file, // For compatibility with existing components
    };
  },

  // Get songs in frontend format
  getSongsForFrontend: async () => {
    try {
      const songs = await songService.getAllSongs();
      if (songs.length === 0) {
        // Return fallback data if no songs in database
        return [
          {
            id: 'fallback-1',
            title: 'Sample Song 1',
            artist: 'Sample Artist',
            cover: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            duration: '3:24',
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          },
          {
            id: 'fallback-2',
            title: 'Sample Song 2',
            artist: 'Sample Artist 2',
            cover: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            duration: '4:12',
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
          }
        ];
      }
      return songs.map(songService.transformSongData);
    } catch (error) {
      console.error('Error getting songs for frontend:', error);
      // Return fallback data on error
      return [
        {
          id: 'fallback-1',
          title: 'Sample Song 1',
          artist: 'Sample Artist',
          cover: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          duration: '3:24',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        }
      ];
    }
  },
};
