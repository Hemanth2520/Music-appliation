const cloudinary = require('cloudinary').v2;
const songModel = require('../models/song-model');

const addsong=async(req,res)=>{
try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
   
    if (!req.files || !req.files.image || !req.files.audio) {
        return res.status(400).json({ message: "Image or audio file missing" });
    }
     const imagefile = req.files.image[0];
    const audiofile = req.files.audio[0];
    
    const audioupload = await cloudinary.uploader.upload(audiofile.path, {
        resource_type: 'video'
    });
    const imageupload = await cloudinary.uploader.upload(imagefile.path, {
        resource_type: 'image' });
const duration =`${Math.floor(audioupload.duration / 60)}:${Math.floor(audioupload.duration%60)}`; // Example duration calculation, adjust as needed
    console.log(name,desc,album,audioupload,imageupload);

    const songdata={
        name,
        desc,
        album,
        image: imageupload.secure_url,  
        file: audioupload.secure_url,
        duration
    }
    const song = await songModel(songdata);
    await song.save();
    res.status(201).json({message: "Song added successfully", song});

} catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
    
}
}
const listsong=async(req,res)=>{
try {
    const allsongs = await songModel.find({});
    res.status(200).json({message: "Songs fetched successfully",songs: allsongs});

    
} catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
    
}
}

const removesong=async(req,res)=>{
    try {
        const songId = req.body.id;
        const song = await songModel.findByIdAndDelete(songId);
        if (!song) {
            return res.status(404).json({message: "Song not found"});
        }
        res.status(200).json({message: "Song removed successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports={
    addsong,
    listsong,
    removesong
}