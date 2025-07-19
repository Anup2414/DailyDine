const Review = require("../models/Review");
const Mess = require("../models/Mess");
const User = require("../models/User");

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { messId, rating, comment, categories } = req.body;
    const { id: userId } = req.user;

    // Validate required fields
    if (!messId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Mess ID, rating, and comment are required",
      });
    }

    // Check if mess exists
    const mess = await Mess.findById(messId);
    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "Mess not found",
      });
    }

    // Check if user has already reviewed this mess
    const existingReview = await Review.findOne({
      user: userId,
      mess: messId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this mess. Use update instead.",
      });
    }

    // Create the review
    const review = await Review.create({
      user: userId,
      mess: messId,
      rating,
      comment,
      categories: categories || {},
    });

    // Add review to mess
    await Mess.findByIdAndUpdate(messId, {
      $push: { reviews: review._id },
    });

    // Update mess rating
    await updateMessRating(messId);

    const populatedReview = await Review.findById(review._id)
      .populate("user", "firstName lastName image")
      .populate("mess", "messName");

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      review: populatedReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
};

// Update an existing review
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { id: userId } = req.user;
    const updateData = req.body;

    // Find review and verify ownership
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own reviews",
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(reviewId, updateData, {
      new: true,
    })
      .populate("user", "firstName lastName image")
      .populate("mess", "messName");

    // Update mess rating if rating was changed
    if (updateData.rating) {
      await updateMessRating(review.mess);
    }

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating review",
      error: error.message,
    });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { id: userId } = req.user;

    // Find review and verify ownership
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own reviews",
      });
    }

    // Remove review from mess
    await Mess.findByIdAndUpdate(review.mess, {
      $pull: { reviews: reviewId },
    });

    await Review.findByIdAndDelete(reviewId);

    // Update mess rating
    await updateMessRating(review.mess);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
};

// Get a specific review
exports.getReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId)
      .populate("user", "firstName lastName image")
      .populate("mess", "messName location");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    console.error("Error fetching review:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching review",
      error: error.message,
    });
  }
};

// Get all reviews for a mess
exports.getReviewsByMess = async (req, res) => {
  try {
    const { messId } = req.params;
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      minRating,
      maxRating,
    } = req.query;

    let query = { mess: messId, isVisible: true };

    // Add rating filter if provided
    if (minRating || maxRating) {
      query.rating = {};
      if (minRating) query.rating.$gte = parseInt(minRating);
      if (maxRating) query.rating.$lte = parseInt(maxRating);
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const reviews = await Review.find(query)
      .populate("user", "firstName lastName image")
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalReviews = await Review.countDocuments(query);

    // Calculate rating statistics
    const ratingStats = await Review.aggregate([
      { $match: { mess: messId, isVisible: true } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: "$rating",
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      reviews,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalReviews / limit),
        totalReviews,
        hasNext: page * limit < totalReviews,
        hasPrev: page > 1,
      },
      stats: ratingStats[0] || null,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

// Get all reviews by a user
exports.getReviewsByUser = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { page = 1, limit = 10 } = req.query;

    const reviews = await Review.find({ user: userId })
      .populate("mess", "messName location")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalReviews = await Review.countDocuments({ user: userId });

    return res.status(200).json({
      success: true,
      reviews,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalReviews / limit),
        totalReviews,
        hasNext: page * limit < totalReviews,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user reviews",
      error: error.message,
    });
  }
};

// Mark a review as helpful
exports.markReviewHelpful = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { $inc: { helpfulCount: 1 } },
      { new: true }
    )
      .populate("user", "firstName lastName image")
      .populate("mess", "messName");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review marked as helpful",
      review,
    });
  } catch (error) {
    console.error("Error marking review as helpful:", error);
    return res.status(500).json({
      success: false,
      message: "Error marking review as helpful",
      error: error.message,
    });
  }
};

// Report a review
exports.reportReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { reason } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { $inc: { reportCount: 1 } },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // If review has been reported too many times, hide it
    if (review.reportCount >= 5) {
      await Review.findByIdAndUpdate(reviewId, { isVisible: false });
    }

    return res.status(200).json({
      success: true,
      message: "Review reported successfully",
    });
  } catch (error) {
    console.error("Error reporting review:", error);
    return res.status(500).json({
      success: false,
      message: "Error reporting review",
      error: error.message,
    });
  }
};

// Helper function to update mess rating
async function updateMessRating(messId) {
  try {
    const reviews = await Review.find({ mess: messId, isVisible: true });
    
    if (reviews.length === 0) {
      await Mess.findByIdAndUpdate(messId, {
        "rating.average": 0,
        "rating.count": 0,
      });
      return;
    }

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    await Mess.findByIdAndUpdate(messId, {
      "rating.average": Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      "rating.count": reviews.length,
    });
  } catch (error) {
    console.error("Error updating mess rating:", error);
  }
}