const {addsong, listsong,removesong} = require('../controllers/song-controller');
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer'); // Assuming multer is set up in this file

// const songRoute = express.Router();

// songRoute.post('/add', upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]), addsong);
router.route('/add').post( upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]), addsong);
// songRoute.get('/list', listsong);

router.route('/list').get(listsong);

// songRoute.post('/remove', removesong);
router.route('/remove').post( removesong);
// router.route("/service").get(services);

module.exports = router;