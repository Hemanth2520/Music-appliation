const cloudinary = require('cloudinary').v2;
const albumModel = require('../models/album-model');

const addAlbum = async (req, res) => {
try {
    const name = req.body.name;
    const desc = req.body.desc;
    const bgcolor = req.body.bgcolor;

    // if (!req.files || !req.files.image) {
    //     return res.status(400).json({ message: "Image file missing" });
    // }
    
    const imagefile = req.file;
    
    const imageupload = await cloudinary.uploader.upload(imagefile.path, {
        resource_type: 'image'
    });

    const albumData = {
        name,
        desc,
        bgcolor,
        image: imageupload.secure_url
    };

    const album = await albumModel(albumData);
    await album.save();
    
    res.status(201).json({ message: "Album added successfully", album });
    
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    
}
}

const listAlbums = async (req, res) => {
try {
    const allAlbums = await albumModel.find({});
    res.status(200).json({ message: "Albums fetched successfully", albums: allAlbums });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    
}

}

const removeAlbum = async (req, res) => {
try {
    const albumId = req.body.id;
    const album = await albumModel.findByIdAndDelete(albumId);
    
    if (!album) {
        return res.status(404).json({ message: "Album not found" });
    }
    
    res.status(200).json({ message: "Album removed successfully" });
    
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    
}
}

module.exports = {
    addAlbum,
    listAlbums,
    removeAlbum
};