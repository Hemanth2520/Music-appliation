import api from './api';

export const albumService = {
  // Get all albums
  getAllAlbums: async () => {
    try {
      const response = await api.get('/album/list');
      return response.albums || [];
    } catch (error) {
      console.error('Error fetching albums:', error);
      // Check if it's a network error (server not running)
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        console.warn('Backend server appears to be down');
        return []; // Return empty array to trigger fallback
      }
      throw error;
    }
  },

  // Add a new album
  addAlbum: async (albumData) => {
    try {
      const response = await api.post('/album/add', albumData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error('Error adding album:', error);
      throw error;
    }
  },

  // Remove an album
  removeAlbum: async (albumId) => {
    try {
      const response = await api.post('/album/remove', { id: albumId });
      return response;
    } catch (error) {
      console.error('Error removing album:', error);
      throw error;
    }
  },

  // Transform backend album data to frontend format
  transformAlbumData: (backendAlbum) => {
    return {
      id: backendAlbum._id,
      title: backendAlbum.name,
      artist: backendAlbum.name, // Using name as artist for now
      description: backendAlbum.desc,
      cover: backendAlbum.image,
      bgcolor: backendAlbum.bgcolor,
      plays: "0", // Default value since backend doesn't track plays yet
      audio: "/audio/default.mp3", // Default audio file
    };
  },

  // Get albums in frontend format
  getAlbumsForFrontend: async () => {
    try {
      const albums = await albumService.getAllAlbums();
      if (albums.length === 0) {
        // Return fallback data if no albums in database
        return [
          {
            id: 'fallback-album-1',
            title: 'Sample Album 1',
            artist: 'Sample Artist',
            cover: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            bgcolor: '#667eea',
            plays: '1.2M',
            audio: '/audio/sample.mp3',
          },
          {
            id: 'fallback-album-2',
            title: 'Sample Album 2',
            artist: 'Sample Artist 2',
            cover: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            bgcolor: '#f093fb',
            plays: '2.1M',
            audio: '/audio/sample2.mp3',
          }
        ];
      }
      return albums.map(albumService.transformAlbumData);
    } catch (error) {
      console.error('Error getting albums for frontend:', error);
      // Return fallback data on error
      return [
        {
          id: 'fallback-album-1',
          title: 'Sample Album 1',
          artist: 'Sample Artist',
          cover: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          bgcolor: '#667eea',
          plays: '1.2M',
          audio: '/audio/sample.mp3',
        }
      ];
    }
  },
};
