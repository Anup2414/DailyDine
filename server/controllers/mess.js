const Mess = require("../models/Mess");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const geolib = require("geolib");

// Create a new mess
exports.createMess = async (req, res) => {
  try {
    const {
      messName,
      description,
      location,
      contactInfo,
      operatingHours,
    } = req.body;

    const { id: userId } = req.user;

    // Validate required fields
    if (!messName || !location || !contactInfo?.phone) {
      return res.status(400).json({
        success: false,
        message: "Mess name, location, and contact phone are required",
      });
    }

    // Check if user already has a mess
    const existingMess = await Mess.findOne({ owner: userId });
    if (existingMess) {
      return res.status(400).json({
        success: false,
        message: "You can only create one mess per account",
      });
    }

    // Create the mess
    const mess = await Mess.create({
      messName,
      description,
      owner: userId,
      location: {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
        address: location.address,
      },
      contactInfo,
      operatingHours,
    });

    // Update user with mess details
    await User.findByIdAndUpdate(userId, { messDetails: mess._id });

    const populatedMess = await Mess.findById(mess._id)
      .populate("owner", "firstName lastName email")
      .populate("reviews");

    return res.status(201).json({
      success: true,
      message: "Mess created successfully",
      mess: populatedMess,
    });
  } catch (error) {
    console.error("Error creating mess:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating mess",
      error: error.message,
    });
  }
};

// Update mess details
exports.updateMess = async (req, res) => {
  try {
    const { messId } = req.params;
    const { id: userId } = req.user;
    const updateData = req.body;

    // Find mess and verify ownership
    const mess = await Mess.findById(messId);
    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "Mess not found",
      });
    }

    if (mess.owner.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own mess",
      });
    }

    // Update location if provided
    if (updateData.location) {
      updateData.location = {
        type: "Point",
        coordinates: [updateData.location.longitude, updateData.location.latitude],
        address: updateData.location.address,
      };
    }

    const updatedMess = await Mess.findByIdAndUpdate(messId, updateData, {
      new: true,
    })
      .populate("owner", "firstName lastName email")
      .populate("reviews");

    return res.status(200).json({
      success: true,
      message: "Mess updated successfully",
      mess: updatedMess,
    });
  } catch (error) {
    console.error("Error updating mess:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating mess",
      error: error.message,
    });
  }
};

// Delete mess
exports.deleteMess = async (req, res) => {
  try {
    const { messId } = req.params;
    const { id: userId } = req.user;

    // Find mess and verify ownership
    const mess = await Mess.findById(messId);
    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "Mess not found",
      });
    }

    if (mess.owner.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own mess",
      });
    }

    await Mess.findByIdAndDelete(messId);

    // Update user to remove mess details
    await User.findByIdAndUpdate(userId, { $unset: { messDetails: 1 } });

    return res.status(200).json({
      success: true,
      message: "Mess deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting mess:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting mess",
      error: error.message,
    });
  }
};

// Get single mess details
exports.getMess = async (req, res) => {
  try {
    const { messId } = req.params;

    const mess = await Mess.findById(messId)
      .populate("owner", "firstName lastName email")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "firstName lastName",
        },
      })
      .populate("menus");

    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "Mess not found",
      });
    }

    return res.status(200).json({
      success: true,
      mess,
    });
  } catch (error) {
    console.error("Error fetching mess:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching mess",
      error: error.message,
    });
  }
};

// Get all messes
exports.getAllMesses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = "rating.average",
      sortOrder = "desc",
    } = req.query;

    let query = { isActive: true };

    // Add search functionality
    if (search) {
      query.$or = [
        { messName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { "location.address": { $regex: search, $options: "i" } },
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const messes = await Mess.find(query)
      .populate("owner", "firstName lastName")
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalMesses = await Mess.countDocuments(query);

    return res.status(200).json({
      success: true,
      messes,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalMesses / limit),
        totalMesses,
        hasNext: page * limit < totalMesses,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching messes:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching messes",
      error: error.message,
    });
  }
};

// Get nearby messes based on user location
exports.getNearbyMesses = async (req, res) => {
  try {
    const { latitude, longitude, radius = 5000 } = req.body; // radius in meters

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const messes = await Mess.find({
      isActive: true,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: radius,
        },
      },
    })
      .populate("owner", "firstName lastName")
      .populate("reviews");

    // Calculate distance for each mess
    const messesWithDistance = messes.map((mess) => {
      const distance = geolib.getDistance(
        { latitude, longitude },
        {
          latitude: mess.location.coordinates[1],
          longitude: mess.location.coordinates[0],
        }
      );

      return {
        ...mess.toObject(),
        distance: distance, // distance in meters
        distanceInKm: (distance / 1000).toFixed(2),
      };
    });

    // Sort by distance
    messesWithDistance.sort((a, b) => a.distance - b.distance);

    return res.status(200).json({
      success: true,
      messes: messesWithDistance,
      count: messesWithDistance.length,
    });
  } catch (error) {
    console.error("Error fetching nearby messes:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching nearby messes",
      error: error.message,
    });
  }
};

// Get messes by owner
exports.getMessesByOwner = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const mess = await Mess.findOne({ owner: userId })
      .populate("owner", "firstName lastName email")
      .populate("reviews")
      .populate("menus");

    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "No mess found for this owner",
      });
    }

    return res.status(200).json({
      success: true,
      mess,
    });
  } catch (error) {
    console.error("Error fetching owner's mess:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching owner's mess",
      error: error.message,
    });
  }
};

// Upload mess image
exports.uploadMessImage = async (req, res) => {
  try {
    const { messId } = req.params;
    const { id: userId } = req.user;

    // Find mess and verify ownership
    const mess = await Mess.findById(messId);
    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "Mess not found",
      });
    }

    if (mess.owner.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own mess",
      });
    }

    // Upload image to cloudinary
    const image = await uploadImageToCloudinary(
      req.files.image,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    // Update mess with image URL
    const updatedMess = await Mess.findByIdAndUpdate(
      messId,
      { image: image.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      mess: updatedMess,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading image",
      error: error.message,
    });
  }
};