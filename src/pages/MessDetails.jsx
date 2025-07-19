import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FiMapPin, FiPhone, FiClock, FiStar, FiShare2, FiMessageCircle } from "react-icons/fi";
import { getMessDetails, getMessReviews } from "../services/operations/messAPI";
import { getMessMenu } from "../services/operations/menuAPI";
import { createReview } from "../services/operations/messAPI";
import GoogleMap from "../components/GoogleMap";
import RatingStars from "../components/Common/RatingStars";

const MessDetails = () => {
  const { messId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [mess, setMess] = useState(null);
  const [menu, setMenu] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
    foodQuality: 5,
    cleanliness: 5,
    service: 5,
    valueForMoney: 5
  });

  useEffect(() => {
    fetchMessDetails();
    getCurrentLocation();
  }, [messId]); // eslint-disable-line react-hooks/exhaustive-deps

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const fetchMessDetails = async () => {
    setIsLoading(true);
    try {
      const [messResult, menuResult, reviewsResult] = await Promise.all([
        getMessDetails(messId),
        getMessMenu(messId),
        getMessReviews(messId)
      ]);

      if (messResult?.mess) {
        setMess(messResult.mess);
        calculateDistance(messResult.mess.location);
      }

      if (menuResult?.menu) {
        setMenu(menuResult.menu);
      }

      if (reviewsResult?.reviews) {
        setReviews(reviewsResult.reviews);
      }
    } catch (error) {
      console.error("Error fetching mess details:", error);
      toast.error("Error loading mess details");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDistance = (messLocation) => {
    if (!userLocation || !messLocation?.coordinates) return;

    const R = 6371; // Earth's radius in kilometers
    const lat1 = userLocation.lat;
    const lon1 = userLocation.lng;
    const lat2 = messLocation.coordinates[1];
    const lon2 = messLocation.coordinates[0];

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    setDistance(distance.toFixed(1));
  };

  const handleReviewSubmit = async () => {
    if (!user) {
      toast.error("Please login to write a review");
      return;
    }

    if (!reviewData.comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      const result = await createReview({
        messOwnerId: messId,
        rating: reviewData.rating,
        comment: reviewData.comment,
        foodQuality: reviewData.foodQuality,
        cleanliness: reviewData.cleanliness,
        service: reviewData.service,
        valueForMoney: reviewData.valueForMoney
      });

      if (result?.success) {
        toast.success("Review submitted successfully!");
        setShowReviewForm(false);
        setReviewData({
          rating: 5,
          comment: "",
          foodQuality: 5,
          cleanliness: 5,
          service: 5,
          valueForMoney: 5
        });
        fetchMessDetails(); // Refresh reviews
      }
    } catch (error) {
      toast.error("Error submitting review");
      console.error("Error submitting review:", error);
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getCategoryItems = (category) => {
    if (!menu?.items) return [];
    return menu.items.filter(item => item.category === category);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mess?.messName,
        text: `Check out ${mess?.messName} on DailyDine!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading mess details...</p>
        </div>
      </div>
    );
  }

  if (!mess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mess Not Found</h2>
          <p className="text-gray-600 mb-4">The mess you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{mess.messName}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <FiStar className="text-yellow-400 mr-1" />
                  <span className="font-semibold">{getAverageRating()}</span>
                  <span className="ml-1">({reviews.length} reviews)</span>
                </div>
                {distance && (
                  <div className="flex items-center">
                    <FiMapPin className="mr-1" />
                    <span>{distance} km away</span>
                  </div>
                )}
              </div>
              <p className="text-blue-100 max-w-2xl">{mess.description}</p>
            </div>
            <div className="flex space-x-3 mt-6 lg:mt-0">
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
              >
                <FiMessageCircle className="mr-2" />
                Write Review
              </button>
              <button
                onClick={handleShare}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
              >
                <FiShare2 className="mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FiPhone className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{mess.phoneNumber || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiMapPin className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{mess.address || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiClock className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Opening Hours</p>
                    <p className="font-medium">{mess.openingHours || "Not specified"}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiStar className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className={`font-medium ${mess.isActive ? "text-green-600" : "text-red-600"}`}>
                      {mess.isActive ? "Open" : "Closed"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Menu */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Today's Menu</h2>
              {menu ? (
                <div className="space-y-6">
                  {["breakfast", "lunch", "dinner", "snacks"].map(category => {
                    const items = getCategoryItems(category);
                    if (items.length === 0) return null;
                    
                    return (
                      <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-900 capitalize mb-3">
                          {category} ({items.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {items.map((item, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                  <div className="flex items-center space-x-2 mt-2">
                                    {item.isVegetarian && (
                                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Veg</span>
                                    )}
                                    {!item.isAvailable && (
                                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Unavailable</span>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-semibold text-green-600">₹{item.price}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No menu available for today</p>
              )}
            </div>

            {/* Special Offers */}
            {menu?.specialOffers && menu.specialOffers.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Special Offers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menu.specialOffers.map((offer, index) => (
                    <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900">{offer.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                      <p className="text-lg font-semibold text-green-600 mt-2">{offer.discount}% off</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Valid until: {new Date(offer.validUntil).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Reviews</h2>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Write Review
                </button>
              </div>
              
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {review.userId?.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{review.userId?.name || "Anonymous"}</p>
                            <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <RatingStars rating={review.rating} />
                      </div>
                      <p className="text-gray-900">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
              <div className="h-64 rounded-lg overflow-hidden">
                <GoogleMap
                  messes={[mess]}
                  userLocation={userLocation}
                  showUserLocation={true}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Call Now
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Get Directions
                </button>
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Write a Review</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating</label>
                <RatingStars 
                  rating={reviewData.rating} 
                  onRatingChange={(rating) => setReviewData({...reviewData, rating})}
                  editable={true}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Share your experience..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Food Quality</label>
                  <RatingStars 
                    rating={reviewData.foodQuality} 
                    onRatingChange={(rating) => setReviewData({...reviewData, foodQuality: rating})}
                    editable={true}
                    size="small"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cleanliness</label>
                  <RatingStars 
                    rating={reviewData.cleanliness} 
                    onRatingChange={(rating) => setReviewData({...reviewData, cleanliness: rating})}
                    editable={true}
                    size="small"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                  <RatingStars 
                    rating={reviewData.service} 
                    onRatingChange={(rating) => setReviewData({...reviewData, service: rating})}
                    editable={true}
                    size="small"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value for Money</label>
                  <RatingStars 
                    rating={reviewData.valueForMoney} 
                    onRatingChange={(rating) => setReviewData({...reviewData, valueForMoney: rating})}
                    editable={true}
                    size="small"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleReviewSubmit}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Review
              </button>
              <button
                onClick={() => setShowReviewForm(false)}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessDetails;