import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaMapMarkerAlt, FaPhone, FaClock, FaStore } from "react-icons/fa"
import { signUp } from "../services/operations/authAPI"

const MessSignup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    messName: "",
    phoneNumber: "",
    address: "",
    description: "",
    openingHours: "",
    latitude: "",
    longitude: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    name,
    email,
    password,
    confirmPassword,
    messName,
    phoneNumber,
    address,
    description,
    openingHours,
    latitude,
    longitude,
  } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }))
        },
        (error) => {
          console.log("Error getting location:", error)
          alert("Could not get your location. Please enter coordinates manually.")
        }
      )
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (!latitude || !longitude) {
      alert("Please provide location coordinates")
      return
    }

    const signupData = {
      name,
      email,
      password,
      accountType: "mess_owner",
      messName,
      phoneNumber,
      address,
      description,
      openingHours,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    }

    dispatch(signup(signupData, navigate))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center">
            <FaStore className="text-white text-xl" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Register Your Mess
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join DailyDine and showcase your daily menus to customers
          </p>
        </div>
        
        <form className="bg-white shadow-lg rounded-lg p-8 space-y-6" onSubmit={handleOnSubmit}>
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Owner Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={handleOnChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Enter owner name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={handleOnChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mess Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mess Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="messName" className="block text-sm font-medium text-gray-700">
                  Mess Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaStore className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="messName"
                    name="messName"
                    type="text"
                    required
                    value={messName}
                    onChange={handleOnChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Enter mess name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={handleOnChange}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700">
                    Opening Hours
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaClock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="openingHours"
                      name="openingHours"
                      type="text"
                      value={openingHours}
                      onChange={handleOnChange}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="e.g., 7:00 AM - 10:00 PM"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={address}
                    onChange={handleOnChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Enter complete address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={description}
                  onChange={handleOnChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm p-2"
                  placeholder="Brief description about your mess"
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Location Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                  Latitude
                </label>
                <input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  required
                  value={latitude}
                  onChange={handleOnChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm p-2"
                  placeholder="e.g., 28.6139"
                />
              </div>

              <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                  Longitude
                </label>
                <input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  required
                  value={longitude}
                  onChange={handleOnChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm p-2"
                  placeholder="e.g., 77.2090"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Get Current Location
                </button>
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Account Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={handleOnChange}
                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Enter password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={handleOnChange}
                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Confirm password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{" "}
              <button type="button" className="text-orange-600 hover:text-orange-500 underline">
                Terms and Conditions
              </button>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                "Register Mess"
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MessSignup