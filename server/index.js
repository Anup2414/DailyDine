// Importing necessary modules and packages
const express = require("express");
const app = express();
const authRoutes = require("./routes/Auth");
const profileRoutes = require("./routes/Profile");
const messRoutes = require("./routes/Mess");
const reviewRoutes = require("./routes/Review");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();
 
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/mess", messRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "DailyDine server is up and running...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`DailyDine app is listening at ${PORT}`);
});

// End of code.
