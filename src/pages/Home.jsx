import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaMapMarkerAlt, FaSearch, FaStar, FaPhone, FaClock } from "react-icons/fa"
import { getTodayMenus } from "../services/operations/menuAPI"
import { getNearbyMesses } from "../services/operations/messAPI"
import GoogleMap from "../components/GoogleMap"

const Home = () => {
  const dispatch = useDispatch()
  const { menus, loading } = useSelector((state) => state.menu)
  const { nearbyMesses } = useSelector((state) => state.mess)
  const [userLocation, setUserLocation] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ latitude, longitude })
          dispatch(getNearbyMesses(latitude, longitude))
        },
        (error) => {
          console.log("Error getting location:", error)
          // Default to a location if geolocation fails
          setUserLocation({ latitude: 28.6139, longitude: 77.2090 }) // Delhi coordinates
        }
      )
    }

    dispatch(getTodayMenus())
  }, [dispatch])

  const getCategoryItems = (category) => {
    const allItems = menus.flatMap(menu => menu.items || [])
    return allItems.filter(item => item.category === category)
  }

  const categories = ["breakfast", "lunch", "dinner", "snacks"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              DailyDine
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover the best mess menus near you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/nearby"
                className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Find Nearby Messes
              </Link>
              <Link
                to="/mess-signup"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition-colors"
              >
                Register Your Mess
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Menus Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Today's Menus</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading menus...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menus.map((menu) => (
              <div key={menu._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {menu.messOwnerId?.messName || "Mess Name"}
                    </h3>
                    <div className="flex items-center text-yellow-500">
                      <FaStar />
                      <span className="ml-1 text-sm text-gray-600">4.5</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="mr-2" />
                    <span className="text-sm">{menu.messOwnerId?.address || "Address not available"}</span>
                  </div>

                  <div className="space-y-3">
                    {categories.map((category) => {
                      const categoryItems = menu.items?.filter(item => item.category === category) || []
                      if (categoryItems.length === 0) return null
                      
                      return (
                        <div key={category}>
                          <h4 className="font-semibold text-gray-700 capitalize mb-2">{category}</h4>
                          <div className="space-y-2">
                            {categoryItems.slice(0, 3).map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span className="text-gray-600">{item.name}</span>
                                <span className="font-semibold">₹{item.price}</span>
                              </div>
                            ))}
                            {categoryItems.length > 3 && (
                              <p className="text-xs text-gray-500">+{categoryItems.length - 3} more items</p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <FaPhone className="mr-2" />
                        <span className="text-sm">{menu.messOwnerId?.phoneNumber || "N/A"}</span>
                      </div>
                      <Link
                        to={`/mess/${menu.messOwnerId?._id}`}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {menus.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No menus available for today</p>
            <p className="text-gray-500 mt-2">Check back later or explore nearby messes</p>
          </div>
        )}
      </div>

      {/* Nearby Messes Section */}
      {userLocation && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Nearby Messes</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {nearbyMesses.slice(0, 5).map((mess) => (
                <div key={mess._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{mess.messName}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaMapMarkerAlt className="mr-2" />
                        <span className="text-sm">{mess.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaClock className="mr-2" />
                        <span className="text-sm">{mess.openingHours || "Hours not specified"}</span>
                      </div>
                    </div>
                    <Link
                      to={`/mess/${mess._id}`}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                    >
                      View Menu
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-96 rounded-lg overflow-hidden shadow-md">
              <GoogleMap 
                center={userLocation}
                messes={nearbyMesses}
              />
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose DailyDine?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Discovery</h3>
              <p className="text-gray-600">Find the best mess menus near you with just a few clicks</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Location Based</h3>
              <p className="text-gray-600">Get personalized recommendations based on your location</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Verified Reviews</h3>
              <p className="text-gray-600">Read authentic reviews from real customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
