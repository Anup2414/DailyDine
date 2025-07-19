import { toast } from "react-hot-toast"
import apiConnector from "../apiConnector"
import { setMesses, setNearbyMesses, setCurrentMess, setLoading, setError } from "../../slices/messSlice"

// Get all messes
export const getAllMesses = (search = "") => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector.get("/messes", {
        params: { search }
      })
      dispatch(setMesses(response.data.messes))
    } catch (error) {
      console.log("GET ALL MESSES API ERROR............", error)
      toast.error("Failed to fetch messes")
      dispatch(setError("Failed to fetch messes"))
    }
    dispatch(setLoading(false))
  }
}

// Get nearby messes
export const getNearbyMesses = (latitude, longitude, radius = 5000) => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector.get("/messes/nearby", {
        params: { latitude, longitude, radius }
      })
      dispatch(setNearbyMesses(response.data.messes))
    } catch (error) {
      console.log("GET NEARBY MESSES API ERROR............", error)
      toast.error("Failed to fetch nearby messes")
      dispatch(setError("Failed to fetch nearby messes"))
    }
    dispatch(setLoading(false))
  }
}

// Get mess by ID
export const getMessById = (messId) => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector.get(`/messes/${messId}`)
      dispatch(setCurrentMess(response.data.mess))
    } catch (error) {
      console.log("GET MESS BY ID API ERROR............", error)
      toast.error("Failed to fetch mess details")
      dispatch(setError("Failed to fetch mess details"))
    }
    dispatch(setLoading(false))
  }
}

// Update mess profile (mess owner)
export const updateMessProfile = (profileData) => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector.put("/messes/profile", profileData)
      toast.success("Profile updated successfully")
      dispatch(setLoading(false))
      return { success: true, user: response.data.user }
    } catch (error) {
      console.log("UPDATE MESS PROFILE API ERROR............", error)
      toast.error(error.response?.data?.message || "Failed to update profile")
      dispatch(setError(error.response?.data?.message || "Failed to update profile"))
      dispatch(setLoading(false))
      return { success: false, message: error.response?.data?.message || "Failed to update profile" }
    }
  }
}

// Get mess details
export const getMessDetails = (messId) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector.get(`/messes/${messId}`)
      return { success: true, mess: response.data.mess }
    } catch (error) {
      console.log("GET MESS DETAILS API ERROR............", error)
      return { success: false, message: "Failed to fetch mess details" }
    }
  }
}

// Get mess reviews
export const getMessReviews = (messId) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector.get(`/reviews/mess/${messId}`)
      return { success: true, reviews: response.data.reviews }
    } catch (error) {
      console.log("GET MESS REVIEWS API ERROR............", error)
      return { success: false, message: "Failed to fetch reviews" }
    }
  }
}

// Get user reviews
export const getUserReviews = (userId) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector.get(`/reviews/user/${userId}`)
      return { success: true, reviews: response.data.reviews }
    } catch (error) {
      console.log("GET USER REVIEWS API ERROR............", error)
      return { success: false, message: "Failed to fetch user reviews" }
    }
  }
}

// Create review
export const createReview = (reviewData) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector.post("/reviews", reviewData)
      return { success: true, review: response.data.review }
    } catch (error) {
      console.log("CREATE REVIEW API ERROR............", error)
      return { success: false, message: error.response?.data?.message || "Failed to create review" }
    }
  }
}