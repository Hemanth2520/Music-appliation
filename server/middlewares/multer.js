// Temporary fix: make multer optional for testing
let upload;

try {
    const multer = require('multer');

    const storage = multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });
    upload = multer({storage});
} catch (error) {
    console.warn('Multer not found, using mock upload middleware');
    // Mock upload middleware for testing
    upload = {
        fields: () => (req, res, next) => {
            console.warn('Mock upload middleware called - multer not installed');
            next();
        },
        single: () => (req, res, next) => {
            console.warn('Mock upload middleware called - multer not installed');
            next();
        }
    };
}

module.exports = upload;
