import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FiMapPin, FiPhone, FiMail, FiClock, FiEdit, FiSave, FiX } from "react-icons/fi";
import { updateMessProfile } from "../services/operations/messAPI";
import GoogleMap from "../components/GoogleMap";

const MessProfile = () => {
  const { user } = useSelector((state) => state.auth);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    messName: "",
    phoneNumber: "",
    address: "",
    description: "",
    openingHours: "",
    location: {
      coordinates: [0, 0]
    }
  });

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        messName: user.messName || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        description: user.description || "",
        openingHours: user.openingHours || "",
        location: user.location || { coordinates: [0, 0] }
      });
    }
    getCurrentLocation();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          if (!user?.location?.coordinates[0]) {
            setProfileData(prev => ({
              ...prev,
              location: { coordinates: [longitude, latitude] }
            }));
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to get your location");
        }
      );
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationChange = (lat, lng) => {
    setProfileData(prev => ({
      ...prev,
      location: { coordinates: [lng, lat] }
    }));
  };

  const handleSave = async () => {
    if (!profileData.messName || !profileData.phoneNumber || !profileData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const result = await updateMessProfile({
        messName: profileData.messName,
        phoneNumber: profileData.phoneNumber,
        address: profileData.address,
        description: profileData.description,
        openingHours: profileData.openingHours,
        location: profileData.location
      });

      if (result?.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        // Update the user state with new data
        // You might need to dispatch an action to update the user state
      }
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      messName: user.messName || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      description: user.description || "",
      openingHours: user.openingHours || "",
      location: user.location || { coordinates: [0, 0] }
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mess Profile</h1>
              <p className="text-gray-600 mt-2">Manage your business information and location</p>
            </div>
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                  >
                    <FiSave className="mr-2" />
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                  >
                    <FiX className="mr-2" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <FiEdit className="mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mess Name *
                  </label>
                  <input
                    type="text"
                    value={profileData.messName}
                    onChange={(e) => handleInputChange("messName", e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder="Enter mess name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="flex items-center">
                    <FiPhone className="text-gray-400 mr-2" />
                    <input
                      type="tel"
                      value={profileData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      disabled={!isEditing}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="flex items-center">
                    <FiMail className="text-gray-400 mr-2" />
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
                      placeholder="Email address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <div className="flex items-start">
                    <FiMapPin className="text-gray-400 mr-2 mt-2" />
                    <textarea
                      value={profileData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Enter complete address"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={profileData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder="Describe your mess, specialties, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opening Hours
                  </label>
                  <div className="flex items-center">
                    <FiClock className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      value={profileData.openingHours}
                      onChange={(e) => handleInputChange("openingHours", e.target.value)}
                      disabled={!isEditing}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="e.g., 7:00 AM - 10:00 PM"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Status</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Account Type</span>
                  <span className="text-sm text-gray-900 capitalize">{user?.accountType}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Status</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    user?.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {user?.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Approved</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    user?.approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {user?.approved ? "Yes" : "Pending"}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Member Since</span>
                  <span className="text-sm text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Location and Map */}
          <div className="space-y-6">
            {/* Location Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coordinates
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={profileData.location.coordinates[1] || ""}
                      onChange={(e) => handleLocationChange(parseFloat(e.target.value), profileData.location.coordinates[0])}
                      disabled={!isEditing}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Latitude"
                      step="any"
                    />
                    <input
                      type="number"
                      value={profileData.location.coordinates[0] || ""}
                      onChange={(e) => handleLocationChange(profileData.location.coordinates[1], parseFloat(e.target.value))}
                      disabled={!isEditing}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Longitude"
                      step="any"
                    />
                  </div>
                </div>

                {isEditing && (
                  <button
                    onClick={getCurrentLocation}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Use Current Location
                  </button>
                )}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Map Location</h2>
              
              <div className="h-96 rounded-lg overflow-hidden">
                <GoogleMap
                  messes={[{
                    _id: user?._id,
                    messName: profileData.messName,
                    location: profileData.location,
                    address: profileData.address
                  }]}
                  userLocation={userLocation}
                  onLocationSelect={handleLocationChange}
                  isEditable={isEditing}
                />
              </div>
              
              <p className="text-sm text-gray-600 mt-2">
                {isEditing 
                  ? "Click on the map to set your location, or use the coordinates above."
                  : "This is your current location on the map."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessProfile;