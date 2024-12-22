const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,        // Correct
    api_key: process.env.CLOUD_API_KEY,       // Correct key name
    api_secret: process.env.CLOUD_API_SECRET  // Correct key name
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'gohelpimages',
    allowedFormats: ["png", "jpg", "jpeg"]  // Fixed typo: allowedFormats
  },
});

module.exports = {
  cloudinary,
  storage
};
