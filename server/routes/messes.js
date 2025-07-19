const express = require("express");
const User = require("../models/User");
const { auth } = require("../middleware/auth");
const router = express.Router();

// Get all messes
router.get("/", async (req, res) => {
  try {
    const { search, category, rating } = req.query;
    
    let query = {
      accountType: "mess_owner",
      isActive: true,
    };

    // Search by mess name
    if (search) {
      query.messName = { $regex: search, $options: "i" };
    }

    const messes = await User.find(query)
      .select("messName address location phoneNumber openingHours description image")
      .sort({ messName: 1 });

    res.json({ messes });
  } catch (error) {
    console.error("Get messes error:", error);
    res.status(500).json({ message: "Failed to fetch messes" });
  }
});

// Get nearby messes
router.get("/nearby", async (req, res) => {
  try {
    const { latitude, longitude, radius = 5000 } = req.query; // radius in meters
    
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and longitude are required" });
    }

    const messes = await User.find({
      accountType: "mess_owner",
      isActive: true,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(radius),
        },
      },
    })
      .select("messName address location phoneNumber openingHours description image")
      .sort({ messName: 1 });

    res.json({ messes });
  } catch (error) {
    console.error("Get nearby messes error:", error);
    res.status(500).json({ message: "Failed to fetch nearby messes" });
  }
});

// Get mess by ID
router.get("/:messId", async (req, res) => {
  try {
    const { messId } = req.params;
    
    const mess = await User.findOne({
      _id: messId,
      accountType: "mess_owner",
      isActive: true,
    }).select("messName address location phoneNumber openingHours description image");

    if (!mess) {
      return res.status(404).json({ message: "Mess not found" });
    }

    res.json({ mess });
  } catch (error) {
    console.error("Get mess error:", error);
    res.status(500).json({ message: "Failed to fetch mess" });
  }
});

// Update mess profile (mess owner only)
router.put("/profile", auth, async (req, res) => {
  try {
    const { messName, phoneNumber, address, location, description, openingHours } = req.body;
    
    const user = await User.findById(req.user.userId);
    if (!user || user.accountType !== "mess_owner") {
      return res.status(403).json({ message: "Access denied. Mess owner privileges required." });
    }

    // Update fields
    if (messName) user.messName = messName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (address) user.address = address;
    if (location) user.location = location;
    if (description) user.description = description;
    if (openingHours) user.openingHours = openingHours;

    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ message: "Profile updated successfully", user: userResponse });
  } catch (error) {
    console.error("Update mess profile error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// Get mess statistics (mess owner only)
router.get("/stats/overview", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.accountType !== "mess_owner") {
      return res.status(403).json({ message: "Access denied. Mess owner privileges required." });
    }

    // This would typically include more complex statistics
    // For now, returning basic info
    const stats = {
      messName: user.messName,
      totalReviews: 0, // Would be calculated from reviews collection
      averageRating: 0, // Would be calculated from reviews collection
      totalMenus: 0, // Would be calculated from menus collection
    };

    res.json({ stats });
  } catch (error) {
    console.error("Get mess stats error:", error);
    res.status(500).json({ message: "Failed to fetch statistics" });
  }
});

module.exports = router;