const cloudinary = require('cloudinary').v2

exports.cloudinaryConnect = () => {
	try {
		// Check if required environment variables are present
		if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
			throw new Error("Missing Cloudinary configuration environment variables");
		}

		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});

		console.log("Cloudinary configuration successful");
	} catch (error) {
		console.error("Cloudinary configuration failed:", error.message);
	}
};
