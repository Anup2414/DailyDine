import { toast } from "react-hot-toast"
import apiConnector from "../apiConnector"
import { setMenus, setCurrentMenu, setLoading, setError } from "../../slices/menuSlice"

// Get today's menus
export const getTodayMenus = () => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector.get("/menus/today")
      dispatch(setMenus(response.data.menus))
    } catch (error) {
      console.log("GET TODAY MENUS API ERROR............", error)
      toast.error("Failed to fetch today's menus")
      dispatch(setError("Failed to fetch today's menus"))
    }
    dispatch(setLoading(false))
  }
}

// Get menus by date
export const getMenusByDate = (date) => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector.get(`/menus/date/${date}`)
      dispatch(setMenus(response.data.menus))
    } catch (error) {
      console.log("GET MENUS BY DATE API ERROR............", error)
      toast.error("Failed to fetch menus")
      dispatch(setError("Failed to fetch menus"))
    }
    dispatch(setLoading(false))
  }
}

// Get my menu (mess owner)
export const getMyMenu = () => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector.get("/menus/my-menu")
      dispatch(setCurrentMenu(response.data.menu))
    } catch (error) {
      console.log("GET MY MENU API ERROR............", error)
      toast.error("Failed to fetch your menu")
      dispatch(setError("Failed to fetch your menu"))
    }
    dispatch(setLoading(false))
  }
}

// Save menu (mess owner)
export const saveMenu = (menuData) => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector.post("/menus", menuData)
      dispatch(setCurrentMenu(response.data.menu))
      toast.success("Menu saved successfully")
    } catch (error) {
      console.log("SAVE MENU API ERROR............", error)
      toast.error(error.response?.data?.message || "Failed to save menu")
      dispatch(setError(error.response?.data?.message || "Failed to save menu"))
    }
    dispatch(setLoading(false))
  }
}

// Get nearby menus
export const getNearbyMenus = (latitude, longitude, radius = 5000) => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector.get("/menus/nearby", {
        params: { latitude, longitude, radius }
      })
      dispatch(setMenus(response.data.menus))
    } catch (error) {
      console.log("GET NEARBY MENUS API ERROR............", error)
      toast.error("Failed to fetch nearby menus")
      dispatch(setError("Failed to fetch nearby menus"))
    }
    dispatch(setLoading(false))
  }
}

// Create menu
export const createMenu = (menuData) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector.post("/menus", menuData)
      return { success: true, menu: response.data.menu }
    } catch (error) {
      console.log("CREATE MENU API ERROR............", error)
      return { success: false, message: error.response?.data?.message || "Failed to create menu" }
    }
  }
}

// Update menu
export const updateMenu = (menuId, menuData) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector.put(`/menus/${menuId}`, menuData)
      return { success: true, menu: response.data.menu }
    } catch (error) {
      console.log("UPDATE MENU API ERROR............", error)
      return { success: false, message: error.response?.data?.message || "Failed to update menu" }
    }
  }
}

// Get mess menu
export const getMessMenu = (messId) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector.get(`/menus/mess/${messId}`)
      return { success: true, menu: response.data.menu }
    } catch (error) {
      console.log("GET MESS MENU API ERROR............", error)
      return { success: false, message: "Failed to fetch mess menu" }
    }
  }
}