const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "snacks", "beverages"],
    required: true,
  },
  isVegetarian: {
    type: Boolean,
    default: true,
  },
  isVegan: {
    type: Boolean,
    default: false,
  },
  isGlutenFree: {
    type: Boolean,
    default: false,
  },
  spiceLevel: {
    type: String,
    enum: ["mild", "medium", "spicy"],
    default: "mild",
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
  discount: {
    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    startTime: Date,
    endTime: Date,
  },
});

const menuSchema = new mongoose.Schema(
  {
    mess: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Mess",
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    items: [itemSchema],
    specialOffers: [
      {
        title: String,
        description: String,
        discountPercentage: Number,
        validUntil: Date,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    totalItemsCount: {
      type: Number,
      default: 0,
    },
    averagePrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Create compound index for mess and date for efficient queries
menuSchema.index({ mess: 1, date: 1 });

// Pre-save middleware to calculate derived fields
menuSchema.pre("save", function (next) {
  if (this.items && this.items.length > 0) {
    this.totalItemsCount = this.items.length;
    const totalPrice = this.items.reduce((sum, item) => sum + item.price, 0);
    this.averagePrice = totalPrice / this.items.length;
  }
  next();
});

module.exports = mongoose.model("Menu", menuSchema);