import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit, FiSave, FiX, FiStar, FiClock } from "react-icons/fi";
import { updateUserProfile } from "../services/operations/authAPI";
import { getUserReviews } from "../services/operations/messAPI";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [profileData, setProfileData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    location: {
      coordinates: [0, 0]
    }
  });

  // const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        location: user.location || { coordinates: [0, 0] }
      });
    }
    fetchUserReviews();
    getCurrentLocation();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // setUserLocation({ lat: latitude, lng: longitude });
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

  const fetchUserReviews = async () => {
    try {
      const result = await getUserReviews(user?._id);
      if (result?.reviews) {
        setReviews(result.reviews);
      }
    } catch (error) {
      console.error("Error fetching user reviews:", error);
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
    if (!profileData.name) {
      toast.error("Please fill in your name");
      return;
    }

    setIsLoading(true);
    try {
      const result = await updateUserProfile({
        name: profileData.name,
        phoneNumber: profileData.phoneNumber,
        address: profileData.address,
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
      name: user.name || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      location: user.location || { coordinates: [0, 0] }
    });
    setIsEditing(false);
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
              <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="flex items-center">
                    <FiUser className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      disabled={!isEditing}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Enter your full name"
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
                    Phone Number
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
                    Address
                  </label>
                  <div className="flex items-start">
                    <FiMapPin className="text-gray-400 mr-2 mt-2" />
                    <textarea
                      value={profileData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location Settings</h2>
              
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

                <p className="text-sm text-gray-600">
                  Setting your location helps us show you nearby messes and calculate distances accurately.
                </p>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">My Reviews</h2>
              
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.slice(0, 5).map(review => (
                    <div key={review._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={i < review.rating ? "fill-current" : "text-gray-300"}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">({review.rating}/5)</span>
                          </div>
                          <p className="text-gray-900 mb-2">{review.comment}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <FiClock className="mr-1" />
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {reviews.length > 5 && (
                    <div className="text-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View All Reviews ({reviews.length})
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiStar className="text-gray-300 text-4xl mx-auto mb-4" />
                  <p className="text-gray-500">You haven't written any reviews yet</p>
                  <p className="text-sm text-gray-400 mt-1">Start exploring messes and share your experience!</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
                  <span className="text-sm font-medium text-gray-700">Member Since</span>
                  <span className="text-sm text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Activity Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Activity Stats</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total Reviews</span>
                  <span className="text-lg font-bold text-gray-900">{reviews.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Average Rating</span>
                  <span className="text-lg font-bold text-gray-900">{getAverageRating()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Last Review</span>
                  <span className="text-sm text-gray-900">
                    {reviews.length > 0 
                      ? new Date(reviews[0].createdAt).toLocaleDateString()
                      : "Never"
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Find Nearby Messes
                </button>
                
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  View Today's Menus
                </button>
                
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  My Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;