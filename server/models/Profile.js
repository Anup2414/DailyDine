const mongoose = require("mongoose");

// Define the Profile schema
const profileSchema = new mongoose.Schema({
	gender: {
		type: String,
		enum: ["Male", "Female", "Non-Binary", "Prefer not to say"],
	},
	dateOfBirth: {
		type: String,
	},
	about: {
		type: String,
		trim: true,
	},
	contactNumber: {
		type: String,
		trim: true,
	},
	// Dietary preferences for better mess recommendations
	dietaryPreferences: {
		isVegetarian: {
			type: Boolean,
			default: false,
		},
		isVegan: {
			type: Boolean,
			default: false,
		},
		isGlutenFree: {
			type: Boolean,
			default: false,
		},
		spicePreference: {
			type: String,
			enum: ["mild", "medium", "spicy"],
			default: "medium",
		},
		allergies: [String],
	},
	// Food categories preferences
	favoriteCategories: {
		type: [String],
		enum: ["breakfast", "lunch", "dinner", "snacks", "beverages"],
		default: [],
	},
	// Budget preference for mess recommendations
	budgetPreference: {
		min: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: 1000,
		},
	},
	// Location-based preferences
	preferredRadius: {
		type: Number, // in kilometers
		default: 5,
	},
	// User activity tracking
	favoriteMessesCount: {
		type: Number,
		default: 0,
	},
	reviewsCount: {
		type: Number,
		default: 0,
	},
	// Notification preferences
	notifications: {
		newMenus: {
			type: Boolean,
			default: true,
		},
		specialOffers: {
			type: Boolean,
			default: true,
		},
		nearbyMesses: {
			type: Boolean,
			default: true,
		},
	},
});

// Export the Profile model
module.exports = mongoose.model("Profile", profileSchema);
