const express = require("express");
const router = express.Router();

const {
  createMess,
  updateMess,
  deleteMess,
  getMess,
  getAllMesses,
  getNearbyMesses,
  getMessesByOwner,
  uploadMessImage,
} = require("../controllers/mess");

const {
  createMenu,
  updateMenu,
  deleteMenu,
  getMenu,
  getMenusByMess,
  getTodaysMenu,
  getMenusByDate,
} = require("../controllers/menu");

const { auth, isMessOwner } = require("../middleware/auth");

// ********************************************************************************************************
//                                      Mess Management routes
// ********************************************************************************************************

// Route for creating a new mess (only mess owners)
router.post("/create", auth, isMessOwner, createMess);

// Route for updating mess details (only mess owners)
router.put("/update/:messId", auth, isMessOwner, updateMess);

// Route for deleting a mess (only mess owners)
router.delete("/delete/:messId", auth, isMessOwner, deleteMess);

// Route for getting a specific mess details
router.get("/:messId", getMess);

// Route for getting all messes
router.get("/", getAllMesses);

// Route for getting nearby messes based on user location
router.post("/nearby", getNearbyMesses);

// Route for getting messes by owner
router.get("/owner/messes", auth, isMessOwner, getMessesByOwner);

// Route for uploading mess image
router.post("/upload-image/:messId", auth, isMessOwner, uploadMessImage);

// ********************************************************************************************************
//                                      Menu Management routes
// ********************************************************************************************************

// Route for creating a new menu (only mess owners)
router.post("/:messId/menu/create", auth, isMessOwner, createMenu);

// Route for updating menu (only mess owners)
router.put("/:messId/menu/update/:menuId", auth, isMessOwner, updateMenu);

// Route for deleting menu (only mess owners)
router.delete("/:messId/menu/delete/:menuId", auth, isMessOwner, deleteMenu);

// Route for getting a specific menu
router.get("/:messId/menu/:menuId", getMenu);

// Route for getting all menus for a mess
router.get("/:messId/menus", getMenusByMess);

// Route for getting today's menu for a mess
router.get("/:messId/menu/today", getTodaysMenu);

// Route for getting menus by date
router.get("/:messId/menus/date/:date", getMenusByDate);

// Export the router for use in the main application
module.exports = router;