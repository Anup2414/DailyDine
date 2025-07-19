const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dailydine",
  api_key: process.env.CLOUDINARY_API_KEY || "your_api_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "your_api_secret",
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "dailydine/food-images",
    format: async (req, file) => {
      // Support jpeg, jpg, png, webp
      const allowedFormats = ['jpeg', 'jpg', 'png', 'webp'];
      const fileFormat = file.mimetype.split('/')[1];
      return allowedFormats.includes(fileFormat) ? fileFormat : 'jpg';
    },
    public_id: (req, file) => {
      // Generate unique filename
      return `food-${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    },
    transformation: [
      { width: 600, height: 400, crop: "fill", quality: "auto" }
    ]
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// For local storage (fallback)
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/food-images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});

const localUpload = multer({
  storage: localStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

module.exports = {
  upload,
  localUpload,
  cloudinary
};