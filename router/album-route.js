const express = require('express');
const { addAlbum, listAlbums, removeAlbum } = require('../controllers/album-controller');

const upload = require('../middlewares/multer'); // Assuming multer is set up in this file
const albumRoute = express.Router();

albumRoute.post('/add', upload.single('image'), addAlbum);
albumRoute.get('/list', listAlbums);
albumRoute.post('/remove', removeAlbum);

module.exports = albumRoute;