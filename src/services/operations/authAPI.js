import { toast } from "react-hot-toast"

import { setLoading, setToken, setError, logout } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import apiConnector from "../apiConnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  // LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      console.log("here");
      console.log(email);
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("here");
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))
      navigate("/dashboard")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error(error.response?.data?.message || "Signup Failed")
      dispatch(setError(error.response?.data?.message || "Signup Failed"))
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector.post("/auth/login", {
        email,
        password,
      })

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))
      navigate("/dashboard")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error(error.response?.data?.message || "Login Failed")
      dispatch(setError(error.response?.data?.message || "Login Failed"))
    }
    dispatch(setLoading(false))
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })

      console.log("RESETPASSTOKEN RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      setEmailSent(true)
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error)
      toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      navigate("/login")
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function logoutUser(navigate) {
  return async (dispatch) => {
    try {
      await apiConnector.post("/auth/logout")
      toast.success("Logged Out")
      dispatch(logout())
      dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      navigate("/")
    } catch (error) {
      console.log("LOGOUT API ERROR............", error)
      toast.error("Logout Failed")
    }
  }
}

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector.get("/auth/me")
      dispatch(setUser(response.data.user))
    } catch (error) {
      console.log("GET USER DETAILS API ERROR............", error)
      dispatch(logout())
      navigate("/")
    }
    dispatch(setLoading(false))
  }
}

export function updateUserProfile(profileData) {
  return async (dispatch) => {
    try {
      const response = await apiConnector.put("/users/profile", profileData)
      if (response.data.success) {
        dispatch(setUser(response.data.user))
        return { success: true, user: response.data.user }
      }
      return { success: false, message: response.data.message }
    } catch (error) {
      console.log("UPDATE USER PROFILE API ERROR............", error)
      throw error
    }
  }
}

export function signup(signupData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector.post("/auth/register", signupData)

      console.log("SIGNUP API RESPONSE............", response)

      if (response.data.success || response.data.user) {
        toast.success("Signup Successful")
        dispatch(setToken(response.data.token))
        dispatch(setUser(response.data.user))
        navigate("/dashboard")
      } else {
        throw new Error(response.data.message || "Signup failed")
      }
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error(error.response?.data?.message || "Signup Failed")
      dispatch(setError(error.response?.data?.message || "Signup Failed"))
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}
