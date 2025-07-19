const express = require("express");
const router = express.Router();

const {
  createReview,
  updateReview,
  deleteReview,
  getReview,
  getReviewsByMess,
  getReviewsByUser,
  markReviewHelpful,
  reportReview,
} = require("../controllers/review");

const { auth } = require("../middleware/auth");

// ********************************************************************************************************
//                                      Review Management routes
// ********************************************************************************************************

// Route for creating a new review (authenticated users only)
router.post("/create", auth, createReview);

// Route for updating a review (only review author)
router.put("/update/:reviewId", auth, updateReview);

// Route for deleting a review (only review author)
router.delete("/delete/:reviewId", auth, deleteReview);

// Route for getting a specific review
router.get("/:reviewId", getReview);

// Route for getting all reviews for a mess
router.get("/mess/:messId", getReviewsByMess);

// Route for getting all reviews by a user
router.get("/user/my-reviews", auth, getReviewsByUser);

// Route for marking a review as helpful
router.post("/:reviewId/helpful", auth, markReviewHelpful);

// Route for reporting a review
router.post("/:reviewId/report", auth, reportReview);

// Export the router for use in the main application
module.exports = router;