const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name is required"],
    trim: true,
    maxLength: [100, "Item name cannot be more than 100 characters"],
  },
  description: {
    type: String,
    trim: true,
    maxLength: [300, "Description cannot be more than 300 characters"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  category: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "snacks"],
    required: [true, "Category is required"],
  },
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
});

const menuSchema = new mongoose.Schema(
  {
    messOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Mess owner is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
    items: [menuItemSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    specialOffers: [
      {
        title: {
          type: String,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
        discount: {
          type: Number,
          min: 0,
          max: 100,
        },
        validUntil: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
menuSchema.index({ messOwnerId: 1, date: 1 });
menuSchema.index({ date: 1, isActive: 1 });

module.exports = mongoose.model("Menu", menuSchema);