const Menu = require("../models/Menu");
const Mess = require("../models/Mess");

// Create a new menu for a mess
exports.createMenu = async (req, res) => {
  try {
    const { messId } = req.params;
    const { date, items, specialOffers } = req.body;
    const { id: userId } = req.user;

    // Verify mess ownership
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
        message: "You can only create menus for your own mess",
      });
    }

    // Check if menu for this date already exists
    const existingMenu = await Menu.findOne({
      mess: messId,
      date: new Date(date || Date.now()).toDateString(),
    });

    if (existingMenu) {
      return res.status(400).json({
        success: false,
        message: "Menu for this date already exists. Use update instead.",
      });
    }

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one menu item is required",
      });
    }

    // Create the menu
    const menu = await Menu.create({
      mess: messId,
      date: date || Date.now(),
      items,
      specialOffers: specialOffers || [],
    });

    // Add menu to mess
    await Mess.findByIdAndUpdate(messId, {
      $push: { menus: menu._id },
    });

    const populatedMenu = await Menu.findById(menu._id)
      .populate("mess", "messName location")
      .populate({
        path: "mess",
        populate: {
          path: "owner",
          select: "firstName lastName",
        },
      });

    return res.status(201).json({
      success: true,
      message: "Menu created successfully",
      menu: populatedMenu,
    });
  } catch (error) {
    console.error("Error creating menu:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating menu",
      error: error.message,
    });
  }
};

// Update an existing menu
exports.updateMenu = async (req, res) => {
  try {
    const { messId, menuId } = req.params;
    const { id: userId } = req.user;
    const updateData = req.body;

    // Verify mess ownership
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
        message: "You can only update menus for your own mess",
      });
    }

    // Find and update menu
    const menu = await Menu.findOne({ _id: menuId, mess: messId });
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    const updatedMenu = await Menu.findByIdAndUpdate(menuId, updateData, {
      new: true,
    })
      .populate("mess", "messName location")
      .populate({
        path: "mess",
        populate: {
          path: "owner",
          select: "firstName lastName",
        },
      });

    return res.status(200).json({
      success: true,
      message: "Menu updated successfully",
      menu: updatedMenu,
    });
  } catch (error) {
    console.error("Error updating menu:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating menu",
      error: error.message,
    });
  }
};

// Delete a menu
exports.deleteMenu = async (req, res) => {
  try {
    const { messId, menuId } = req.params;
    const { id: userId } = req.user;

    // Verify mess ownership
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
        message: "You can only delete menus for your own mess",
      });
    }

    // Find and delete menu
    const menu = await Menu.findOne({ _id: menuId, mess: messId });
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    await Menu.findByIdAndDelete(menuId);

    // Remove menu from mess
    await Mess.findByIdAndUpdate(messId, {
      $pull: { menus: menuId },
    });

    return res.status(200).json({
      success: true,
      message: "Menu deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting menu:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting menu",
      error: error.message,
    });
  }
};

// Get a specific menu
exports.getMenu = async (req, res) => {
  try {
    const { messId, menuId } = req.params;

    const menu = await Menu.findOne({ _id: menuId, mess: messId })
      .populate("mess", "messName location contactInfo operatingHours")
      .populate({
        path: "mess",
        populate: {
          path: "owner",
          select: "firstName lastName",
        },
      });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    return res.status(200).json({
      success: true,
      menu,
    });
  } catch (error) {
    console.error("Error fetching menu:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching menu",
      error: error.message,
    });
  }
};

// Get all menus for a mess
exports.getMenusByMess = async (req, res) => {
  try {
    const { messId } = req.params;
    const { page = 1, limit = 10, sortBy = "date", sortOrder = "desc" } = req.query;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const menus = await Menu.find({ mess: messId, isActive: true })
      .populate("mess", "messName location")
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalMenus = await Menu.countDocuments({ mess: messId, isActive: true });

    return res.status(200).json({
      success: true,
      menus,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalMenus / limit),
        totalMenus,
        hasNext: page * limit < totalMenus,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching menus:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching menus",
      error: error.message,
    });
  }
};

// Get today's menu for a mess
exports.getTodaysMenu = async (req, res) => {
  try {
    const { messId } = req.params;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const menu = await Menu.findOne({
      mess: messId,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
      isActive: true,
    })
      .populate("mess", "messName location contactInfo operatingHours")
      .populate({
        path: "mess",
        populate: {
          path: "owner",
          select: "firstName lastName",
        },
      });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "No menu available for today",
      });
    }

    return res.status(200).json({
      success: true,
      menu,
    });
  } catch (error) {
    console.error("Error fetching today's menu:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching today's menu",
      error: error.message,
    });
  }
};

// Get menus by date
exports.getMenusByDate = async (req, res) => {
  try {
    const { messId, date } = req.params;

    const searchDate = new Date(date);
    searchDate.setHours(0, 0, 0, 0);

    const menu = await Menu.findOne({
      mess: messId,
      date: {
        $gte: searchDate,
        $lt: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000),
      },
      isActive: true,
    })
      .populate("mess", "messName location contactInfo operatingHours")
      .populate({
        path: "mess",
        populate: {
          path: "owner",
          select: "firstName lastName",
        },
      });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "No menu available for this date",
      });
    }

    return res.status(200).json({
      success: true,
      menu,
    });
  } catch (error) {
    console.error("Error fetching menu by date:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching menu by date",
      error: error.message,
    });
  }
};