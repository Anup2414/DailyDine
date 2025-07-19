import { apiConnector } from "../apiConnector"
import { messEndpoints } from "../apis"
import { toast } from "react-hot-toast"

const {
  GET_ALL_MESSES_API,
  GET_NEARBY_MESSES_API,
  GET_MESS_DETAILS_API,
  CREATE_MESS_API,
  UPDATE_MESS_API,
  DELETE_MESS_API,
  GET_MESSES_BY_OWNER_API,
  UPLOAD_MESS_IMAGE_API,
  GET_MESS_MENUS_API,
  CREATE_MENU_API,
  UPDATE_MENU_API,
  DELETE_MENU_API,
  GET_TODAY_MENU_API,
  GET_MENU_BY_DATE_API,
} = messEndpoints

// Get all messes with optional filters
export const getAllMesses = async (params = {}) => {
  const toastId = toast.loading("Loading messes...")
  let result = null
  try {
    const queryParams = new URLSearchParams(params).toString()
    const url = queryParams ? `${GET_ALL_MESSES_API}?${queryParams}` : GET_ALL_MESSES_API
    
    const response = await apiConnector("GET", url)
    
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data
    toast.success("Messes loaded successfully")
  } catch (error) {
    console.error("GET_ALL_MESSES_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could not fetch messes")
  }
  toast.dismiss(toastId)
  return result
}

// Get nearby messes based on location
export const getNearbyMesses = async (locationData) => {
  const toastId = toast.loading("Finding nearby messes...")
  let result = null
  try {
    const response = await apiConnector("POST", GET_NEARBY_MESSES_API, locationData)
    
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data
    toast.success(`Found ${result.messes?.length || 0} nearby messes`)
  } catch (error) {
    console.error("GET_NEARBY_MESSES_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could not find nearby messes")
  }
  toast.dismiss(toastId)
  return result
}

// Get specific mess details
export const getMessDetails = async (messId) => {
  const toastId = toast.loading("Loading mess details...")
  let result = null
  try {
    const response = await apiConnector("GET", GET_MESS_DETAILS_API.replace(":messId", messId))
    
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data
  } catch (error) {
    console.error("GET_MESS_DETAILS_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could not fetch mess details")
  }
  toast.dismiss(toastId)
  return result
}

// Create a new mess (mess owners only)
export const createMess = async (messData, token) => {
  const toastId = toast.loading("Creating mess...")
  let result = null
  try {
    const response = await apiConnector("POST", CREATE_MESS_API, messData, {
      Authorization: `Bearer ${token}`,
    })
    
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data
    toast.success("Mess created successfully!")
  } catch (error) {
    console.error("CREATE_MESS_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could not create mess")
  }
  toast.dismiss(toastId)
  return result
}

// Update mess details (mess owners only)
export const updateMess = async (messId, messData, token) => {
  const toastId = toast.loading("Updating mess...")
  let result = null
  try {
    const response = await apiConnector(
      "PUT", 
      UPDATE_MESS_API.replace(":messId", messId), 
      messData, 
      {
        Authorization: `Bearer ${token}`,
      }
    )
    
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data
    toast.success("Mess updated successfully!")
  } catch (error) {
    console.error("UPDATE_MESS_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could not update mess")
  }
  toast.dismiss(toastId)
  return result
}

// Delete mess (mess owners only)
export const deleteMess = async (messId, token) => {
  const toastId = toast.loading("Deleting mess...")
  let result = null
  try {
    const response = await apiConnector(
      "DELETE", 
      DELETE_MESS_API.replace(":messId", messId), 
      null, 
      {
        Authorization: `Bearer ${token}`,
      }
    )
    
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data
    toast.success("Mess deleted successfully!")
  } catch (error) {
    console.error("DELETE_MESS_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could not delete mess")
  }
  toast.dismiss(toastId)
  return result
}

// Get messes by owner (mess owners only)
export const getMessesByOwner = async (token) => {
  const toastId = toast.loading("Loading your mess...")
  let result = null
  try {
    const response = await apiConnector("GET", GET_MESSES_BY_OWNER_API, null, {
      Authorization: `Bearer ${token}`,
    })
    
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data
  } catch (error) {
    console.error("GET_MESSES_BY_OWNER_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could not fetch your mess")
  }
  toast.dismiss(toastId)
  return result
}

// Upload mess image (mess owners only)
export const uploadMessImage = async (messId, imageFile, token) => {
  const toastId = toast.loading("Uploading image...")
  let result = null
  try {
    const formData = new FormData()
    formData.append("image", imageFile)
    
    const response = await apiConnector(
      "POST", 
      UPLOAD_MESS_IMAGE_API.replace(":messId", messId), 
      formData, 
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    )
    
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data
    toast.success("Image uploaded successfully!")
  } catch (error) {
    console.error("UPLOAD_MESS_IMAGE_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could not upload image")
  }
  toast.dismiss(toastId)
  return result
}

// Get all menus for a mess
export const getMessMenus = async (messId, params = {}) => {
  const toastId = toast.loading("Loading menus...")
  let result = null
  try {
    const queryParams = new URLSearchParams(params).toString()
    const url = queryParams 
      ? `${GET_MESS_MENUS_API.replace(":messId", messId)}?${queryParams}` 
      : GET_MESS_MENUS_API.replace(":messId", messId)
    
    const response = await apiConnector("GET", url)
    
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data
  } catch (error) {
    console.error("GET_MESS_MENUS_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could not fetch menus")
  }
  toast.dismiss(toastId)
  return result
}

// Create a new menu (mess owners only)
export const createMenu = async (messId, menuData, token) => {
  const toastId = toast.loading("Creating menu...")
  let result = null
  try {
    const response = await apiConnector(
      "POST", 
      CREATE_MENU_API.replace(":messId", messId), 
      menuData, 
      {
        Authorization: `Bearer ${token}`,
      }
    )
    
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data
    toast.success("Menu created successfully!")
  } catch (error) {
    console.error("CREATE_MENU_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could not create menu")
  }
  toast.dismiss(toastId)
  return result
}

// Update menu (mess owners only)
export const updateMenu = async (messId, menuId, menuData, token) => {
  const toastId = toast.loading("Updating menu...")
  let result = null
  try {
    const response = await apiConnector(
      "PUT", 
      UPDATE_MENU_API.replace(":messId", messId).replace(":menuId", menuId), 
      menuData, 
      {
        Authorization: `Bearer ${token}`,
      }
    )
    
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data
    toast.success("Menu updated successfully!")
  } catch (error) {
    console.error("UPDATE_MENU_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could not update menu")
  }
  toast.dismiss(toastId)
  return result
}

// Delete menu (mess owners only)
export const deleteMenu = async (messId, menuId, token) => {
  const toastId = toast.loading("Deleting menu...")
  let result = null
  try {
    const response = await apiConnector(
      "DELETE", 
      DELETE_MENU_API.replace(":messId", messId).replace(":menuId", menuId), 
      null, 
      {
        Authorization: `Bearer ${token}`,
      }
    )
    
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data
    toast.success("Menu deleted successfully!")
  } catch (error) {
    console.error("DELETE_MENU_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could not delete menu")
  }
  toast.dismiss(toastId)
  return result
}

// Get today's menu for a mess
export const getTodayMenu = async (messId) => {
  let result = null
  try {
    const response = await apiConnector("GET", GET_TODAY_MENU_API.replace(":messId", messId))
    
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data
  } catch (error) {
    console.error("GET_TODAY_MENU_API ERROR............", error)
    // Don't show toast for this as it might be called frequently
  }
  return result
}

// Get menu by specific date
export const getMenuByDate = async (messId, date) => {
  let result = null
  try {
    const response = await apiConnector(
      "GET", 
      GET_MENU_BY_DATE_API.replace(":messId", messId).replace(":date", date)
    )
    
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data
  } catch (error) {
    console.error("GET_MENU_BY_DATE_API ERROR............", error)
  }
  return result
}