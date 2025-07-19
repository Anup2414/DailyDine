const express = require("express");
const Menu = require("../models/Menu");
const { auth, messOwnerAuth } = require("../middleware/auth");
const { localUpload } = require("../utils/imageUpload");
const router = express.Router();

// Get all menus for today
router.get("/today", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const menus = await Menu.find({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
      isActive: true,
    }).populate("messOwnerId", "messName address location phoneNumber openingHours");

    res.json({ menus });
  } catch (error) {
    console.error("Get today's menus error:", error);
    res.status(500).json({ message: "Failed to fetch menus" });
  }
});

// Get menus by date
router.get("/date/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const menus = await Menu.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
      isActive: true,
    }).populate("messOwnerId", "messName address location phoneNumber openingHours");

    res.json({ menus });
  } catch (error) {
    console.error("Get menus by date error:", error);
    res.status(500).json({ message: "Failed to fetch menus" });
  }
});

// Get menu by mess owner for today
router.get("/my-menu", messOwnerAuth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let menu = await Menu.findOne({
      messOwnerId: req.user.userId,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    if (!menu) {
      // Create a new menu for today if it doesn't exist
      menu = new Menu({
        messOwnerId: req.user.userId,
        date: today,
        items: [],
      });
      await menu.save();
    }

    res.json({ menu });
  } catch (error) {
    console.error("Get my menu error:", error);
    res.status(500).json({ message: "Failed to fetch menu" });
  }
});

// Upload menu item image
router.post("/upload-image", messOwnerAuth, localUpload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Return the file path or URL
    const imageUrl = `/uploads/food-images/${req.file.filename}`;
    
    res.json({ 
      message: "Image uploaded successfully", 
      imageUrl: imageUrl,
      filename: req.file.filename 
    });
  } catch (error) {
    console.error("Upload image error:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
});

// Create or update menu
router.post("/", messOwnerAuth, async (req, res) => {
  try {
    const { date, items, specialOffers } = req.body;
    
    const menuDate = date ? new Date(date) : new Date();
    menuDate.setHours(0, 0, 0, 0);

    let menu = await Menu.findOne({
      messOwnerId: req.user.userId,
      date: menuDate,
    });

    if (menu) {
      // Update existing menu
      menu.items = items || menu.items;
      menu.specialOffers = specialOffers || menu.specialOffers;
      menu.isActive = true;
    } else {
      // Create new menu
      menu = new Menu({
        messOwnerId: req.user.userId,
        date: menuDate,
        items: items || [],
        specialOffers: specialOffers || [],
      });
    }

    await menu.save();
    res.json({ message: "Menu saved successfully", menu });
  } catch (error) {
    console.error("Save menu error:", error);
    res.status(500).json({ message: "Failed to save menu" });
  }
});

// Delete menu
router.delete("/:menuId", messOwnerAuth, async (req, res) => {
  try {
    const { menuId } = req.params;
    
    const menu = await Menu.findOneAndDelete({
      _id: menuId,
      messOwnerId: req.user.userId,
    });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.error("Delete menu error:", error);
    res.status(500).json({ message: "Failed to delete menu" });
  }
});

// Get nearby menus (within specified radius)
router.get("/nearby", async (req, res) => {
  try {
    const { latitude, longitude, radius = 5000 } = req.query; // radius in meters
    
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and longitude are required" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const menus = await Menu.find({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
      isActive: true,
    }).populate({
      path: "messOwnerId",
      match: {
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
            $maxDistance: parseInt(radius),
          },
        },
      },
      select: "messName address location phoneNumber openingHours",
    });

    // Filter out menus where messOwnerId is null (outside radius)
    const filteredMenus = menus.filter(menu => menu.messOwnerId);

    res.json({ menus: filteredMenus });
  } catch (error) {
    console.error("Get nearby menus error:", error);
    res.status(500).json({ message: "Failed to fetch nearby menus" });
  }
});

module.exports = router;