import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaMapMarkerAlt, FaPhone, FaClock, FaStar, FaSearch } from "react-icons/fa"
import { getNearbyMesses } from "../services/operations/messAPI"
import GoogleMap from "../components/GoogleMap"

const NearbyMesses = () => {
  const dispatch = useDispatch()
  const { nearbyMesses, loading } = useSelector((state) => state.mess)
  const [userLocation, setUserLocation] = useState(null)
  const [radius, setRadius] = useState(5000) // 5km default
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ latitude, longitude })
          dispatch(getNearbyMesses(latitude, longitude, radius))
        },
        (error) => {
          console.log("Error getting location:", error)
          // Default to Delhi coordinates if geolocation fails
          const defaultLocation = { latitude: 28.6139, longitude: 77.2090 }
          setUserLocation(defaultLocation)
          dispatch(getNearbyMesses(defaultLocation.latitude, defaultLocation.longitude, radius))
        }
      )
    }
  }, [dispatch, radius])

  const filteredMesses = nearbyMesses.filter(mess =>
    mess.messName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mess.address?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return distance.toFixed(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Nearby Messes</h1>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search messes by name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Radius:</label>
              <select
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value={1000}>1 km</option>
                <option value={3000}>3 km</option>
                <option value={5000}>5 km</option>
                <option value={10000}>10 km</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mess List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Finding nearby messes...</p>
              </div>
            ) : filteredMesses.length > 0 ? (
              filteredMesses.map((mess) => {
                const distance = userLocation && mess.location?.coordinates
                  ? calculateDistance(
                      userLocation.latitude,
                      userLocation.longitude,
                      mess.location.coordinates[1],
                      mess.location.coordinates[0]
                    )
                  : null

                return (
                  <div key={mess._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{mess.messName}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <FaMapMarkerAlt className="mr-2" />
                          <span className="text-sm">{mess.address}</span>
                        </div>
                        {distance && (
                          <div className="text-sm text-orange-600 font-medium">
                            {distance} km away
                          </div>
                        )}
                      </div>
                      <div className="flex items-center text-yellow-500">
                        <FaStar />
                        <span className="ml-1 text-sm text-gray-600">4.5</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <FaPhone className="mr-2" />
                        <span className="text-sm">{mess.phoneNumber || "Phone not available"}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaClock className="mr-2" />
                        <span className="text-sm">{mess.openingHours || "Hours not specified"}</span>
                      </div>
                    </div>

                    {mess.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{mess.description}</p>
                    )}

                    <div className="flex justify-between items-center">
                      <Link
                        to={`/mess/${mess._id}`}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                      >
                        View Menu
                      </Link>
                      <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                        Get Directions
                      </button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FaMapMarkerAlt className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No messes found</h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? "No messes match your search criteria."
                    : "No messes found within the selected radius."
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Map */}
          <div className="h-96 lg:h-auto rounded-lg overflow-hidden shadow-md">
            {userLocation ? (
              <GoogleMap 
                center={userLocation}
                messes={filteredMesses}
              />
            ) : (
              <div className="h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading map...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        {filteredMesses.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{filteredMesses.length}</div>
                <div className="text-sm text-gray-600">Messes Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {filteredMesses.filter(mess => mess.openingHours).length}
                </div>
                <div className="text-sm text-gray-600">Currently Open</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {radius / 1000} km
                </div>
                <div className="text-sm text-gray-600">Search Radius</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NearbyMesses