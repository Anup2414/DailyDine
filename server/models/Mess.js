const mongoose = require("mongoose");

const messSchema = new mongoose.Schema(
  {
    messName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
      address: {
        type: String,
        required: true,
      }
    },
    contactInfo: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
    },
    operatingHours: {
      breakfast: {
        start: String,
        end: String,
      },
      lunch: {
        start: String,
        end: String,
      },
      dinner: {
        start: String,
        end: String,
      },
    },
    image: {
      type: String,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    menus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    subscriptionPlan: {
      type: String,
      enum: ["Basic", "Premium"],
      default: "Basic",
    },
    subscriptionExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Create geospatial index for location-based queries
messSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Mess", messSchema);