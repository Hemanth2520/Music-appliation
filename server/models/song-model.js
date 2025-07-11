const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    album: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    file:{
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
});
const songModel = mongoose.model("song", songSchema);
module.exports = songModel;