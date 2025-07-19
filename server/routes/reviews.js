const express = require("express");
const Review = require("../models/Review");
const { auth } = require("../middleware/auth");
const router = express.Router();

// Get reviews for a mess
router.get("/mess/:messId", async (req, res) => {
  try {
    const { messId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const skip = (page - 1) * limit;
    
    const reviews = await Review.find({ messOwnerId: messId })
      .populate("userId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Review.countDocuments({ messOwnerId: messId });
    
    // Calculate average rating
    const avgRating = await Review.aggregate([
      { $match: { messOwnerId: messId } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);

    res.json({
      reviews,
      total,
      averageRating: avgRating.length > 0 ? avgRating[0].avgRating : 0,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

// Create a review
router.post("/", auth, async (req, res) => {
  try {
    const { messOwnerId, rating, comment, foodQuality, cleanliness, service, valueForMoney } = req.body;
    
    // Check if user has already reviewed this mess
    const existingReview = await Review.findOne({
      userId: req.user.userId,
      messOwnerId,
    });

    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this mess" });
    }

    const review = new Review({
      userId: req.user.userId,
      messOwnerId,
      rating,
      comment,
      foodQuality,
      cleanliness,
      service,
      valueForMoney,
    });

    await review.save();
    
    const populatedReview = await Review.findById(review._id).populate("userId", "name");
    
    res.status(201).json({ message: "Review submitted successfully", review: populatedReview });
  } catch (error) {
    console.error("Create review error:", error);
    res.status(500).json({ message: "Failed to submit review" });
  }
});

// Update a review
router.put("/:reviewId", auth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment, foodQuality, cleanliness, service, valueForMoney } = req.body;
    
    const review = await Review.findOne({
      _id: reviewId,
      userId: req.user.userId,
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Update fields
    if (rating) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    if (foodQuality) review.foodQuality = foodQuality;
    if (cleanliness) review.cleanliness = cleanliness;
    if (service) review.service = service;
    if (valueForMoney) review.valueForMoney = valueForMoney;

    await review.save();
    
    const updatedReview = await Review.findById(reviewId).populate("userId", "name");
    
    res.json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    console.error("Update review error:", error);
    res.status(500).json({ message: "Failed to update review" });
  }
});

// Delete a review
router.delete("/:reviewId", auth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    const review = await Review.findOneAndDelete({
      _id: reviewId,
      userId: req.user.userId,
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(500).json({ message: "Failed to delete review" });
  }
});

// Get user's reviews
router.get("/my-reviews", auth, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.userId })
      .populate("messOwnerId", "messName")
      .sort({ createdAt: -1 });

    res.json({ reviews });
  } catch (error) {
    console.error("Get my reviews error:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

// Get review statistics for a mess
router.get("/stats/:messId", async (req, res) => {
  try {
    const { messId } = req.params;
    
    const stats = await Review.aggregate([
      { $match: { messOwnerId: messId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
          averageFoodQuality: { $avg: "$foodQuality" },
          averageCleanliness: { $avg: "$cleanliness" },
          averageService: { $avg: "$service" },
          averageValueForMoney: { $avg: "$valueForMoney" },
        },
      },
    ]);

    const ratingDistribution = await Review.aggregate([
      { $match: { messOwnerId: messId } },
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    res.json({
      stats: stats.length > 0 ? stats[0] : {
        averageRating: 0,
        totalReviews: 0,
        averageFoodQuality: 0,
        averageCleanliness: 0,
        averageService: 0,
        averageValueForMoney: 0,
      },
      ratingDistribution,
    });
  } catch (error) {
    console.error("Get review stats error:", error);
    res.status(500).json({ message: "Failed to fetch review statistics" });
  }
});

module.exports = router;