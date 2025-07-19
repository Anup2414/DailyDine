// Importing necessary modules and packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menus");
const messRoutes = require("./routes/messes");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");
const dotenv = require("dotenv");

// Setting up port number
const PORT = process.env.PORT || 5000;

// Loading environment variables from .env file
dotenv.config();

// Security middleware
const app = express();
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:3000",
		credentials: true,
	})
);

// Serve static files for uploaded images
app.use('/uploads', express.static('uploads'));


// Database connection
mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("MongoDB connection error:", error);
	});

// Setting up routes
app.use("/api/auth", authRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/messes", messRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);

// Health check route
app.get("/api/health", (req, res) => {
	res.status(200).json({ message: "DailyDine API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
	res.status(404).json({ message: "Route not found" });
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// End of code.
